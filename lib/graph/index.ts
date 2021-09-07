import { BearerTokenAPI, APIVersion } from '../api';

export { GraphV1 } from './v1';
export { GraphV2 } from './v2';

export abstract class GraphAPI extends BearerTokenAPI {
    protected constructor(private readonly integration_access_token: string, private readonly version: APIVersion) {
        super(integration_access_token, `/${version}/graph`);
    }
}
