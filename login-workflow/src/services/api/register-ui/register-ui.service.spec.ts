import { PxbRegisterUIService } from './register-ui.service';

describe('PxbRegisterUIService', () => {
    let service: PxbRegisterUIService;
    beforeEach(() => {
        service = new PxbRegisterUIService();
    });

    it('it should be a placeholder service', () => {
        const serviceSpy = spyOn(service, 'warn').and.stub();
        service.validateUserRegistrationRequest('code');
        service.loadEULA();
        service.requestRegistrationCode('email');
        service.warn();
        service.completeRegistration('first', 'last', null, 'password');
        expect(serviceSpy).toHaveBeenCalledTimes(5);
    });
});
