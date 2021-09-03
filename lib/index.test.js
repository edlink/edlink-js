const { Edlink } = require('../dist/edlink-js/lib/index');

test('make a connection', async () => {
   const up = await Edlink.up();
   expect(up).toBeTruthy();
})

test('retrieve providers', async () => {
   const providers = await Edlink.v1.listProviders();
   console.log(providers.map(n => n.application));
   expect(providers.length).toBeGreaterThan(0);
});

const graph = Edlink.v2.graph('dfsafsd');
graph.listDistricts();
graph.districts.list();
graph.districts.fetch('x');

test('retrieve providers', async () => {
   const permissions = await Edlink.v1.listPermissions();
   console.log(permissions.map(n => n.name));
   expect(permissions.length).toBeGreaterThan(0);
});
