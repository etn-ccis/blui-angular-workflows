import { PxbRegisterUIService } from './register-ui.service';

describe('PxbRegisterUIService', () => {
    let service: PxbRegisterUIService;
    beforeEach(() => {
        service = new PxbRegisterUIService();
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
