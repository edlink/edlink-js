import { API, APIVersion } from '../api';

export { MetaV1 } from './v1';

export abstract class MetaAPI extends API {
    protected constructor(private readonly application_secret_key: string, private readonly version: APIVersion) {
        super(application_secret_key, `/${version}`);
    }
}
