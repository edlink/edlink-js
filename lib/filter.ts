export type FilterOperator = 'equals' | 'starts with' | 'contains' | 'in' | 'not in' | 'gt' | 'gte' | 'lt' | 'lte' | 'is known' | 'is unknown';
export type FilterValue = string | string[];

export class Filter {
    private $filter: {
        [field: string]: {
            operator: FilterOperator;
            value?: FilterValue;
        }[];
    } = {};

    private constructor() {}

    public static where(field: string, operator: FilterOperator, value?: FilterValue): Filter {
        return new Filter().and(field, operator, value);
    }

    public and(field: string, operator: FilterOperator, value?: FilterValue): Filter {
        if (!this.$filter.hasOwnProperty(field)) {
            this.$filter[field] = [];
        }

        this.$filter[field].push({
            operator,
            value
        });

        return this;
    }

    public toString(): string {
        return JSON.stringify(this.$filter);
    }
}
