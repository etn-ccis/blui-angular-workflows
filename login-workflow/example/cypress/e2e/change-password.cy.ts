/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('change password actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/auth/login');
    });

    it('should display change password success', () => {
        cy.get('#blui-email').click().type('user@here.com');
        cy.get('#blui-password').click().type('Test321!');
        cy.contains('Log In').click();
        cy.contains('Change Password').should('be.enabled').click();
        cy.get('[ng-reflect-label="Current Password"]').click().type('Test321!');
        cy.get('[ng-reflect-label="New Password"]').type('Test321!');
        cy.get('[ng-reflect-label="Confirm Password"]').type('Test321!');
        cy.contains('Okay').should('be.enabled').click();
        cy.get('.blui-empty-state-content').should('contain', 'Your password was successfully updated!');
        cy.contains('Log In').should('be.enabled').click();
    });

    it('should toggle password visibility on', () => {
        cy.get('#blui-email').click().type('user@here.com');
        cy.get('#blui-password').click().type('Test321!');
        cy.contains('Log In').click();
        cy.contains('Change Password').should('be.enabled').click();
        cy.get('[ng-reflect-label="Current Password"]').click().type('Test321!');
        cy.get('#visibilityIcon').first().click();
        cy.get('#blui-password').invoke('prop', 'type').should('contain', 'text');
        cy.get('#visibilityIcon').first().click();
        cy.get('#blui-password').invoke('prop', 'type').should('contain', 'password');
    });

    it('should clear password modal on navigation', () => {
        cy.get('#blui-email').click().type('user@here.com');
        cy.get('#blui-password').click().type('Test321!');
        cy.contains('Log In').click();
        cy.contains('Change Password').should('be.enabled').click();
        cy.get('[ng-reflect-label="Current Password"]').click().type('Test321!');
        cy.contains('Back').should('be.enabled').click();
        cy.contains('Change Password').should('be.enabled').click();
        cy.get('[ng-reflect-label="Current Password"]').click().should('not.contain', 'Test321!');
    });

    it('should not submit when password checker invalid', () => {
        cy.get('#blui-email').click().type('user@here.com');
        cy.get('#blui-password').click().type('Test321!');
        cy.contains('Log In').click();
        cy.contains('Change Password').click();
        cy.get('#blui-password').click().type('test321!');
        cy.get('[ng-reflect-label="New Password"]').type('Test321!');
        cy.get('[ng-reflect-label="Confirm Password"]').type('test321!');
        cy.contains('Okay').should('be.disabled');
    });
});