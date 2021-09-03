import { MetaAPI } from './index';
import {
    Convert,
    EdlinkV1Integration,
    EdlinkV1Provider,
    EdlinkV1Permission
} from '../../../types/gen/ts/edlink';

export class MetaV1 extends MetaAPI {
    public integrations: MetaV1Integrations;
    public providers: MetaV1Providers;
    public permissions: MetaV1Permissions;

    constructor(application_secret_key: string) {
        super(application_secret_key, 'v1');

        this.integrations = new MetaV1Integrations(this);
        this.providers = new MetaV1Providers(this);
        this.permissions = new MetaV1Permissions(this);
    }
}

class MetaV1Integrations {
    constructor(private meta: MetaV1) {
    }

    async *list(): AsyncGenerator<EdlinkV1Integration> {
        return this.meta.paginate('/integrations', Convert.toEdlinkV1Integration);
    }

    async fetch(integration_id: string): Promise<EdlinkV1Integration> {
        return this.meta.fetch(`/integrations/${integration_id}`, Convert.toEdlinkV1Integration);
    }
}

class MetaV1Providers {
    constructor(private meta: MetaV1) {
    }

    async *list(): AsyncGenerator<EdlinkV1Provider> {
        return this.meta.paginate('/providers', Convert.toEdlinkV1Provider);
    }

    async fetch(provider_id: string): Promise<EdlinkV1Provider> {
        return this.meta.fetch(`/providers/${provider_id}`, Convert.toEdlinkV1Provider);
    }
}

class MetaV1Permissions {
    constructor(private meta: MetaV1) {
    }

    async *list(): AsyncGenerator<EdlinkV1Permission> {
        return this.meta.paginate('/permissions', Convert.toEdlinkV1Permission);
    }

    async fetch(permission_id: string): Promise<EdlinkV1Permission> {
        return this.meta.fetch(`/permissions/${permission_id}`, Convert.toEdlinkV1Permission);
    }
}
