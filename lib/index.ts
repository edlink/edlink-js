import { GraphV1, GraphV2 } from './graph';
import {
    EdlinkV1Provider,
    EdlinkV1Permission
} from '../../types/gen/ts/edlink';
import axios from 'axios';

export { Filter } from './filter';

export class Edlink {
    private constructor() {}

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
        meta(application_access_token: string): any {
            return {};
        },
        async providers(): Promise<EdlinkV1Provider[]> {
            return axios.get('https://ed.link/api/v1/providers').then(res => res.data.$data);
        },
        async permissions(): Promise<EdlinkV1Permission[]> {
            return axios.get('https://ed.link/api/v1/permissions').then(res => res.data.$data);
        }
    };
}
