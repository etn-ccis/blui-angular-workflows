import { BluiRegisterUIService } from './register-ui.service';

describe('BluiRegisterUIService', () => {
    let service: BluiRegisterUIService;
    beforeEach(() => {
        service = new BluiRegisterUIService();
    });

    it('it should be a placeholder service', () => {
        const serviceSpy = spyOn(service, 'warn').and.stub();
        void service.validateUserRegistrationRequest('code');
        void service.loadEULA();
        void service.requestRegistrationCode('email');
        service.warn();
        void service.completeRegistration('first', 'last', null, 'password');
        void expect(serviceSpy).toHaveBeenCalledTimes(5);
    });
});
