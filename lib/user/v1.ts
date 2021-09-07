import { Auth, UserAPI } from './index';

export class UserV1 extends UserAPI {
    constructor(auth: Auth) {
        super(auth, 'v1');
    }
}
