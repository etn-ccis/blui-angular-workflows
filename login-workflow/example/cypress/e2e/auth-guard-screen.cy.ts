/// <reference types="cypress" />

describe('auth guard routes', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/pre-auth');
    });

    it('should display guarded route page not authenticated', () => {
        cy.contains('isAuthenticated?: false');
    });

    it('should display guarded route as authenticated', () => {
        cy.visit('http://localhost:4200/auth/login');
        cy.get('#blui-email').type('user@here.com');
        cy.get('#blui-password').type('Test321!');
        cy.contains('Log In').should('be.enabled').click();
        cy.wait(3000);
        cy.visit('http://localhost:4200/pre-auth');
        cy.wait(3000);
        cy.get('.blui-blue').should('contain', 'isAuthenticated?: true');
    });

    it('should guard navigation to home page', () => {
        cy.contains('Go Home').click();
        cy.url().should('be.equal', 'http://localhost:4200/auth/login');
    });

    it('should display home page if authenticated', () => {
        cy.visit('http://localhost:4200/auth/login');
        cy.get('#blui-email').type('user@here.com');
        cy.get('#blui-password').type('Test321!');
        cy.contains('Log In').should('be.enabled').click();
        cy.wait(3000);
        cy.visit('http://localhost:4200/pre-auth');
        cy.wait(3000);
        cy.contains('Go Home').should('be.enabled').click();
        cy.get('app-home').should('contain', 'isAuthenticated?: true');
    });

    it('should guard navigation to dashboard page', () => {
        cy.contains('Go Dashboard').click();
        cy.url().should('be.equal', 'http://localhost:4200/auth/login');
    });

    it('should display guarded route as authenticated', () => {
        cy.visit('http://localhost:4200/auth/login');
        cy.get('#blui-email').type('user@here.com');
        cy.get('#blui-password').type('Test321!');
        cy.contains('Log In').should('be.enabled').click();
        cy.wait(3000);
        cy.visit('http://localhost:4200/dashboard');
        cy.wait(3000);
        cy.get('.blui-blue').should('contain', 'This is the dashboard.');
    });
});
