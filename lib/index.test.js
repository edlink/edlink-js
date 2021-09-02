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

test('retrieve providers', async () => {
   const permissions = await Edlink.v1.listPermissions();
   console.log(permissions.map(n => n.name));
   expect(permissions.length).toBeGreaterThan(0);
});
