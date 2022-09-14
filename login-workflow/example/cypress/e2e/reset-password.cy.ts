/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('reset password actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/auth/reset-password?code=DEADBEEF&email=resetPassword@email.com');
    });

    it('should display modal and reset password', () => {
        cy.get('.blui-auth-reset-password').should('contain', 'Reset Password');
        cy.get('#blui-password').invoke('prop', 'type').should('contain', 'password');
        cy.get('#blui-password').click().type('Test321!');
        cy.get('#visibilityIcon').first().click();
        cy.get('#blui-password').invoke('prop', 'type').should('contain', 'text');
        cy.get('#blui-confirm-password').click().type('Test321!');
        cy.contains('Okay').should('be.enabled').click();
        cy.get('.blui-auth-reset-password').should('contain', 'Your password was successfully reset');
        cy.contains('Done').should('be.enabled').click();
    });

    it('should disable submit on invalid input', () => {
        cy.get('#blui-password').click().type('Test321!');
        cy.get('#blui-confirm-password').click().type('test321');
        cy.contains('Okay').should('be.disabled');
    });

    it('should clear forgot password modal on navigation', () => {
        cy.get('#blui-password').click().type('Test321!');
        cy.get('#blui-confirm-password').click().type('Test321!');
        cy.contains('Okay').should('be.enabled');
        cy.contains('Cancel').should('be.enabled').click();
        cy.visit('http://localhost:4200/auth/reset-password?code=DEADBEEF&email=resetPassword@email.com');
        cy.get('#blui-password').click().should('not.contain', 'Test321!');
    });
});