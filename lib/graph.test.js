const { Edlink } = require('../dist/edlink-js/lib/index');
const { GraphV1 } = require('./graph');

let v1, v2;

beforeAll(() => {
    v1 = Edlink.v1.graph('');
    v2 = Edlink.v2.graph('');
})

test('retrieve districts', async () => {

})
