import { BluiAuthUIService } from './auth-ui.service';

describe('BluiAuthUIService', () => {
    let service: BluiAuthUIService;
    beforeEach(() => {
        service = new BluiAuthUIService();
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
