import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Filter } from './filter';
import join from 'url-join';

export type APIVersion = 'v1' | 'v2';

export abstract class BearerTokenAPI {
    protected axios: AxiosInstance;

    protected constructor(private readonly bearer_token: string, private readonly url: string) {
        this.axios = axios.create({
            baseURL: join(`https://ed.link/api/`, url)
        });
    }

    protected async getRequestConfig(): Promise<AxiosRequestConfig> {
        return {
            headers: {
                authorization: `Bearer ${this.bearer_token}`
            }
        };
    }

    async *paginate<T>(url: string, formatter: (raw: any) => T, filter?: Filter, limit?: number, until?: (next: T) => boolean): AsyncGenerator<T> {
        let remaining = limit;
        let next = `${url}?$first=10000${filter ? `&$filter=${filter.toString()}` : ''}`;

        while (next && (remaining === undefined || remaining > 0)) {
            const response = await this.axios.get(url, await this.getRequestConfig()).then((n) => n.data);

            for (const item of response.$data) {
                const formatted = formatter(item);

                if (until !== undefined && until(formatted)) {
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

    async *paginateModified<T>(url: string, formatter: (raw: any) => T, limit?: number): AsyncGenerator<T> {
        let next = `${url}?$page=1`;

        while (next) {
            const response = await this.axios.get(url, await this.getRequestConfig()).then((n) => n.data);

            for (const item of response.$data) {
                const formatted = formatter(item);

                yield formatted;
            }

            next = response.$next;
        }
    }

    // GET
    async fetch<T>(url: string, formatter: (raw: any) => T): Promise<T> {
        return this.axios.get(url, await this.getRequestConfig()).then((res) => formatter(res.data.$data));
    }

    // POST
    async create<T>(url: string, body: any, response_formatter: (raw: any) => T): Promise<T> {
        const config = await this.getRequestConfig();
        config.data = body;

        return this.axios.post(url, config).then((res) => response_formatter(res.data.$data));
    }

    // PUT
    async update<T>(url: string, body: any, response_formatter?: (raw: any) => T): Promise<T | boolean> {
        const config = await this.getRequestConfig();
        config.data = body;

        return this.axios.put(url, config).then((res) => (response_formatter ? response_formatter(res.data.$data) : res.status === 200));
    }

    /**
     * DELETE
     * @returns 204 if the assignment was successfully deleted
     */
    async delete(url: string): Promise<boolean> {
        return this.axios.delete(url, await this.getRequestConfig()).then((res) => res.status === 204);
    }
}
