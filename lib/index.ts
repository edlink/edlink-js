import { GraphV1, GraphV2 } from './graph';

export { Filter } from './filter';

export default class Edlink {
    constructor() {}

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
        meta(jkjl: string): any {
            return {};
        }
    };
}
