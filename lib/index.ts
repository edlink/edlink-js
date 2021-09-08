// noinspection JSUnusedGlobalSymbols

import axios from 'axios';
import { GraphV2 } from './graph/v2';
import { GraphV1 } from './graph/v1';
import { UserV1 } from './user/v1';
import { MetaV1 } from './meta/v1';
import { Auth } from './user';

export { Filter } from './filter';
export { Auth } from './user';

export class Edlink {
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
        user(auth: Auth): UserV1 {
            return new UserV1(auth);
        },
        meta(application_secret_key: string): MetaV1 {
            return new MetaV1(application_secret_key);
        }
    };
}
