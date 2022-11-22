/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('forgot password actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/auth/login');
    });

    it('should display success screen', () => {
        cy.contains('Forgot your password?').click();
        cy.get('#blui-email').click().type('user@here.com');
        cy.contains('Okay').should('be.enabled').click();
        cy.get('.blui-empty-state-content').should('contain', 'Email Sent');
        cy.contains('Done').should('be.enabled').click();
    });

    it('should disable submit on invalid input', () => {
        cy.contains('Forgot your password?').click();
        cy.get('#blui-email').click().type('user@here');
        cy.contains('Okay').should('be.disabled');
    });

    it('should clear forgot password modal on navigation', () => {
        cy.contains('Forgot your password?').click();
        cy.get('#blui-email').click().type('user@here.com');
        cy.contains('Okay').should('be.enabled');
        cy.contains('Back').should('be.enabled').click();
        cy.contains('Forgot your password?').click();
        cy.get('#blui-email').click().should('not.contain', 'user@here.com');
    });
});