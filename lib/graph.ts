import axios, { AxiosInstance } from 'axios';
import { Convert, District, School } from '../../types/gen/ts/edlink';
import { Filter } from './filter';

export abstract class GraphAPI {
    protected axios: AxiosInstance;

    protected constructor(private readonly integration_access_token: string) {
        this.axios = axios.create({
            baseURL: 'https://ed.link/api/v2/graph',
            headers: {
                authorization: `Bearer ${integration_access_token}`
            }
        });
    }

    private async *paginate(url: string, filter?: Filter, limit?: number) {
        let remaining = limit;
        let next = `${url}?$first=10000${filter ? `&$filter=${filter.toString()}` : ''}`;

        while (next && (remaining === undefined || remaining > 0)) {
            const response = await this.axios.get(url).then((n) => n.data);

            for (const item of response.$data) {
                yield item;

                if (remaining !== undefined) {
                    remaining--;
                }
            }

            next = response.$next;
        }
    }
}

export class GraphV1 extends GraphAPI {
    constructor(integration_access_token: string) {
        super(integration_access_token);
    }
}

export class GraphV2 extends GraphAPI {
    constructor(integration_access_token: string) {
        super(integration_access_token);
    }

    async *listDistricts(): AsyncGenerator<District> {
        // todo
    }

    async fetchDistrict(district_id: string): Promise<District> {
        return this.axios.get(`/districts/${district_id}`).then((res) => Convert.toDistrict(res.data));
    }

    async *listSchools(filter?: Filter): AsyncGenerator<School> {
        //todo
    }

    async fetchSchool(school_id: string): Promise<School> {
        return this.axios.get(`/schools/${school_id}`).then((res) => Convert.toSchool(res.data));
    }
}
