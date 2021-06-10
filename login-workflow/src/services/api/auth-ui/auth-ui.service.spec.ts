import { PxbAuthUIService } from './auth-ui.service';

describe('PxbAuthUIService', () => {
    let service: PxbAuthUIService;
    beforeEach(() => {
        service = new PxbAuthUIService();
    });

    it('it should be a placeholder service', () => {
        const serviceSpy = spyOn(service, 'warn').and.stub();
        service.login('email', 'password', false);
        service.forgotPassword('email');
        service.changePassword('old', 'new');
        service.verifyResetCode();
        service.setPassword('new');
        service.warn();
        service.initiateSecurity();
        expect(serviceSpy).toHaveBeenCalledTimes(7);
    });
});
