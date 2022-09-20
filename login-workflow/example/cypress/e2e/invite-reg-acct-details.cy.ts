/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('invite register account details', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/auth/register/invite?code=DEADBEEF');
    });

    it('should display account details modal', () => {
        cy.wait(5000)
        cy.get('#blui-eula-container').scrollTo('bottom')
        cy.get('#blui-eula-checkbox').click();
        // .find('input').click({force:true}); does not work
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
        cy.get('#blui-password').click().type('Test321!');
        cy.get('#blui-confirm-password').click().type('Test321!');
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Account Details');
    });

    it('should allow user to submit account details', () => {
        cy.wait(5000)
        cy.get('#blui-eula-container').scrollTo('bottom')
        cy.get('#blui-eula-checkbox').click();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
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
        cy.contains('Account Created')
    });

    it('should not allow user to submit invalid account details', () => {
        cy.wait(5000)
        cy.get('#blui-eula-container').scrollTo('bottom')
        cy.get('#blui-eula-checkbox').click();
        cy.contains('Next').should('be.enabled').click();
        cy.contains('Create Password');
        cy.get('#blui-password').click().type('Test321!');
        cy.get('#blui-confirm-password').click().type('Test321!');
        cy.contains('Next').should('be.enabled').click();
        cy.get('#blui-first').click().type('fName');
        cy.contains('Next').should('be.disabled');
    });
});