import { BearerTokenAPI, APIVersion } from '../api';

export abstract class MetaAPI extends BearerTokenAPI {
    protected constructor(private readonly application_secret_key: string, private readonly version: APIVersion) {
        super(application_secret_key, `/${version}`);
    }
}
