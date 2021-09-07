import { BearerTokenAPI, APIVersion } from '../api';
import axios, { AxiosRequestConfig } from 'axios';

export { UserV1 } from './v1';

export abstract class UserAPI extends BearerTokenAPI {
    protected constructor(public auth: Auth, private readonly version: APIVersion) {
        super(auth.access_token, `/${version}/my`);
    }

    protected override async getRequestConfig(): Promise<AxiosRequestConfig> {
        if (this.auth.isExpired()) {
            if (this.auth.canRefresh()) {
                await this.auth.refresh();
            } else {
                throw new Error(
                    'The `access_token` for this user is expired. To automatically refresh, provide a `client_id` and `client_secret` when creating the Auth object.'
                );
            }
        }

        return {
            headers: {
                authorization: `Bearer ${this.auth.access_token}`
            }
        };
    }
}

export class Auth {
    private constructor(
        public access_token: string,
        public refresh_token: string,
        public expires: Date,
        private client_id?: string,
        private client_secret?: string
    ) {}

    /**
     * If necessary, refresh the access token.
     */
    public async refresh() {
        if (!this.isExpired()) {
            return;
        }

        const response = await axios.post('https://ed.link/api/authentication/token', {
            client_id: this.client_id,
            client_secret: this.client_secret,
            grant_type: 'refresh_token',
            refresh_token: this.refresh_token
        });

        const expiration = Date.now() + response.data.expires_in * 1000;

        this.access_token = response.data.access_token;
        this.refresh_token = response.data.refresh_token;
        this.expires = new Date(expiration);
    }

    public canRefresh() {
        return this.client_id && this.client_secret;
    }

    public isExpired(): boolean {
        // Check if the token is expired, or less than a minute away from expiring.
        return Date.now() >= this.expires.getTime() - 60 * 1000;
    }

    /**
     * Use the `code` that Edlink sends as a parameter to your SSO `redirect_uri`. The
     * `access_token` will be automatically refreshed when appropriate.
     * @see https://ed.link/docs/guides/v1.0/user-authentication
     */
    static async fromCode(redirect_uri: string, authorization_code: string, client_id: string, client_secret: string): Promise<Auth> {
        const response = await axios.post('https://ed.link/api/authentication/token', {
            code: authorization_code,
            grant_type: 'authorization_code',
            client_id,
            client_secret,
            redirect_uri
        });

        return this.from(response.data, client_id, client_secret);
    }

    /**
     * Use your stored info to create an Auth object. If you provide the `client_id`
     * and `client_secret`, the `access_token` will be automatically refreshed when appropriate.
     * @see https://ed.link/docs/guides/v1.0/user-authentication
     */
    static async from(
        data: { access_token: string; refresh_token: string; expires_in?: number; expires?: Date },
        client_id?: string,
        client_secret?: string
    ): Promise<Auth> {
        if (data.expires_in !== undefined) {
            const expiration = Date.now() + data.expires_in * 1000;
            return new Auth(data.access_token, data.refresh_token, new Date(expiration), client_id, client_secret);
        } else if (data.expires !== undefined) {
            return new Auth(data.access_token, data.refresh_token, data.expires, client_id, client_secret);
        } else {
            throw new Error('You must supply either an `expires` Date or `expires_in` milliseconds.');
        }
    }
}
