import { PxbAuthUIService } from './auth-ui.service';

describe('PxbAuthUIService', () => {
    let service: PxbAuthUIService;
    beforeEach(() => {
        service = new PxbAuthUIService();
    });

    it('it should be a placeholder service', () => {
        const serviceSpy = spyOn(service, 'warn').and.stub();
        void service.login('email', 'password', false);
        void service.forgotPassword('email');
        void service.changePassword('old', 'new');
        void service.verifyResetCode();
        void service.setPassword('new');
        service.warn();
        void service.initiateSecurity();
        void expect(serviceSpy).toHaveBeenCalledTimes(7);
    });
});
