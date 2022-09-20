/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('invite register create password', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/auth/register/invite?code=DEADBEEF');
    });

    it('should display create password modal', () => {
        cy.wait(5000)
        cy.get('#blui-eula-container').scrollTo('bottom')
        cy.get('#blui-eula-checkbox').click();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
    });

    it('should allow user to submit create password', () => {
        cy.wait(5000)
        cy.get('#blui-eula-container').scrollTo('bottom')
        cy.get('#blui-eula-checkbox').click();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#blui-password').click().type('Test321!');
        cy.get('#blui-confirm-password').click().type('Test321!');
        cy.contains('Next').should('be.enabled').click();
    });

    it('should not allow user to submit invalid create password', () => {
        cy.wait(5000)
        cy.get('#blui-eula-container').scrollTo('bottom')
        cy.get('#blui-eula-checkbox').click();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#blui-password').click().type('test321!');
        cy.get('#blui-confirm-password').click().type('Test321!');
        cy.contains('Next').should('be.disabled');
    });
});