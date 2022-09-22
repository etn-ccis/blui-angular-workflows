/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('self register create account', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/auth/login');
    });

    it('should display create account modal', () => {
        cy.contains('Create Account').click();
        cy.get('#blui-eula-container').scrollTo('bottom')
        cy.get('#blui-eula-checkbox').click();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create an Account');
    });

    it('should allow user to submit create account', () => {
        cy.contains('Create Account').click();
        cy.get('#blui-eula-container').scrollTo('bottom')
        cy.get('#blui-eula-checkbox').click();
        cy.contains('Next').should('be.enabled').click();
        cy.get('#blui-email').click().type('user@here.com');
        cy.contains('Next').should('be.enabled').click();
        cy.get('.blui-auth-create-account').should('contain', 'Verify Email');
        cy.get('#verification').click().type('1234');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#blui-password').click().type('Test321!');
        cy.get('#blui-confirm-password').click().type('Test321!');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#blui-first').click().type('fName');
        cy.get('#blui-last').click().type('lName');
        cy.get('#countryCode').click()
        cy.contains('USA').click();
        cy.get('#phoneNumber').type('1234567894')
        cy.contains('Next').should('be.enabled').click();
        cy.get('#company-name').type('company name');
        cy.get('#job-title').type('job title');
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Your account has been successfully created');
    });
});