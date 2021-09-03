import { API, APIVersion } from './api';
import {
    Convert,
    EdlinkV1Integration,
    EdlinkV1Provider,
    EdlinkV1Permission
} from '../../types/gen/ts/edlink';

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
        return this.paginate('/integrations', Convert.toEdlinkV1Integration);
    }

    async fetchIntegration(integration_id: string): Promise<EdlinkV1Integration> {
        return this.fetch(`/integrations/${integration_id}`, Convert.toEdlinkV1Integration);
    }

    async *listProviders(): AsyncGenerator<EdlinkV1Provider> {
        return this.paginate('/providers', Convert.toEdlinkV1Provider);
    }

    async fetchProvider(provider_id: string): Promise<EdlinkV1Provider> {
        return this.fetch(`/providers/${provider_id}`, Convert.toEdlinkV1Provider);
    }

    async *listPermissions(): AsyncGenerator<EdlinkV1Permission> {
        return this.paginate('/permissions', Convert.toEdlinkV1Permission);
    }

    async fetchPermission(permission_id: string): Promise<EdlinkV1Permission> {
        return this.fetch(`/permissions/${permission_id}`, Convert.toEdlinkV1Permission);
    }
}
