const authData = require('./keys/testAuthData.js');
const { Auth, Edlink } = require('../dist/index.js');

test('user token exchange test', async () => {
    const identity = await Auth.from(authData.data, authData.client_id, authData.client_secret);

    console.log(identity);

    const user = Edlink.v1.user(identity);
    console.log(await user.profile());

    console.log(identity);
})
