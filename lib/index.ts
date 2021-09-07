// noinspection JSUnusedGlobalSymbols

import axios from 'axios';
import { GraphV1, GraphV2 } from './graph';
import { MetaV1 } from './meta';
import { Auth, UserV1 } from './user';

export { Filter } from './filter';
export { Auth } from './user';
export * from './edlink';

export default class Edlink {
    private constructor() {}

    static async up(): Promise<boolean> {
        return axios
            .get('https://ed.link/api/up')
            .then((n) => n.status === 200)
            .catch((err) => false);
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
        user(auth: Auth): any {
            return new UserV1(auth);
        },
        meta(application_secret_key: string): MetaV1 {
            return new MetaV1(application_secret_key);
        }
    };
}
