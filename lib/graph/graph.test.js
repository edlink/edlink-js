const { Edlink } = require('../../dist/edlink-js/lib');
const { GraphV1 } = require('./index');

let v1, v2;

beforeAll(() => {
    v1 = Edlink.v1.graph('');
    v2 = Edlink.v2.graph('');
})

test('retrieve districts', async () => {

})
