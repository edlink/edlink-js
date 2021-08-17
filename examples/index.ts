import Edlink, { Filter } from '../lib';

const graph = Edlink.v2.graph('');
const district = graph.fetchDistrict('fkdjlsjaflk');

const schools = graph.listSchools(Filter.where('name', 'contains', 'elementary'));
