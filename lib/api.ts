import axios, { AxiosInstance } from 'axios';
import { Filter } from './filter';
import join from 'url-join';

export type APIVersion = 'v1' | 'v2';

export abstract class API {
    protected axios: AxiosInstance;

    protected constructor(private readonly bearer_token: string, private readonly url: string) {
        this.axios = axios.create({
            baseURL: join(`https://ed.link/api/`, url),

            // We include this to disable automatic JSON parsing by axios.
            // We want to use our generated Convert class instead.
            transformResponse: res => res,

            headers: {
                authorization: `Bearer ${bearer_token}`
            }
        })
    }

    protected async *paginate<T>(url: string, formatter: (raw: any) => T, filter?: Filter, limit?: number, until?: (next: T) => boolean): AsyncGenerator<T> {
        let remaining = limit;
        let next = `${url}?$first=10000${filter ? `&$filter=${filter.toString()}` : ''}`;

        while (next && (remaining === undefined || remaining > 0)) {
            const response = await this.axios.get(url).then((n) => n.data);

            for (const item of response.$data) {
                const formatted = formatter(item);

                if(until !== undefined && until(formatted)) {
                    return;
                }

                yield formatted;

                if (remaining !== undefined) {
                    remaining--;
                }
            }

            next = response.$next;
        }
    }

    protected async fetch<T>(url: string, formatter: (raw: any) => T): Promise<T> {
        return this.axios.get(url).then((res) => formatter(res.data.$data));
    }
}
