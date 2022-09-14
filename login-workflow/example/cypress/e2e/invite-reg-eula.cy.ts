/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('invite register EULA', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/auth/register/invite?code=DEADBEEF');
    });

    it('should display EULA modal', () => {
        cy.wait(5000)
        cy.contains('License Agreement');
        cy.contains('THIS EULA IS ONLY BETWEEN');
    });

    it('should allow user to accept EULA agreement', () => {
        cy.wait(5000)
        cy.get('#eula-container').scrollTo('bottom')
        cy.get('#eula-checkbox').click();
        cy.contains('Next').should('be.enabled').click();
    });

    it('should not allow user to create account without accept EULA', () => {
        cy.contains('Next').should('be.disabled');
    });
});