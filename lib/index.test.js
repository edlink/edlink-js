const { Edlink } = require('../dist/edlink-js/lib/index');

test('retrieve providers', async () => {
   const providers = await Edlink.v1.providers();
   console.log(providers.map(n => n.application));
   expect(providers.length).toBeGreaterThan(0);
});

test('retrieve providers', async () => {
   const permissions = await Edlink.v1.permissions();
   console.log(permissions.map(n => n.name));
   expect(permissions.length).toBeGreaterThan(0);
});
