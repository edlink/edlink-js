import { GraphV1, GraphV2 } from './graph';
import {
    EdlinkV1Provider,
    EdlinkV1Permission
} from '../../types/gen/ts/edlink';
import axios from 'axios';
import { MetaV1 } from './meta';

export { Filter } from './filter';

export class Edlink {
    private constructor() {}

    static async up(): Promise<boolean> {
        return axios.get('https://ed.link/api/up').then(n => n.status === 200).catch(err => false);
    }

    public static v2 = {
        graph(integration_access_token: string): GraphV2 {
            return new GraphV2(integration_access_token);
        }
    };

    public static v1 = {
        graph(integration_access_token: string): GraphV1 {
            return new GraphV1(integration_access_token);
        },
        user(user_access_token: string): any {
            return {};
        },
        meta(application_secret_key: string = ''): any {
            return new MetaV1(application_secret_key);
        },
        async listProviders(): Promise<EdlinkV1Provider[]> {
            const providers = [];
            for await (const provider of this.meta().listProviders()) {
                providers.push(provider);
            }
            return providers;
        },
        async listPermissions(): Promise<EdlinkV1Permission[]> {
            const permissions = [];
            for await (const permission of this.meta().listPermissions()) {
                permissions.push(permission);
            }
            return permissions;
        }
    };
}
