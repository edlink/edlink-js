import { API, APIVersion } from './api';
import {
    Convert,
    EdlinkV1Integration,
} from '../../types/gen/ts/edlink';
import { Edlink } from './index';

export abstract class MetaAPI extends API {
    protected constructor(private readonly application_secret_key: string, private readonly version: APIVersion) {
        super(application_secret_key, `/${version}`);
    }
}

export class MetaV1 extends MetaAPI {
    constructor(application_secret_key: string) {
        super(application_secret_key, 'v1');
    }

    async *listIntegrations(): AsyncGenerator<EdlinkV1Integration> {
        return this.paginate<EdlinkV1Integration>('/integrations', Convert.toEdlinkV1Organization);
    }

    async fetchIntegration(integration_id: string): Promise<EdlinkV1Integration> {
        return this.fetch(`/integrations/${integration_id}`, Convert.toEdlinkV1Integration);
    }
}
