/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('invite register account details', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/auth/login');
    });

    it('should display workflow in french', () => {
        cy.contains('DEBUG').click();
        cy.get('#blui-language-select').click();
        cy.contains('French').click();
        cy.contains('Tester le registre').click();
        cy.get('.blui-auth-create-account-invite').should('contain', 'Accord de licence');
        cy.get('#blui-eula-container').scrollTo('bottom')
        cy.get('#blui-eula-checkbox').click();
        cy.contains('Prochain').click();
        cy.get('.blui-auth-create-account-invite').should('contain', 'Créer un Mot de Passe');
        cy.get('#blui-password').click().type('Test321!');
        cy.get('#blui-confirm-password').click().type('Test321!');
        cy.contains('Prochain').click();
        cy.get('.blui-auth-create-account-invite').should('contain', 'Détails du compte');
        cy.get('#blui-first').click().type('fName');
        cy.get('#blui-last').click().type('lName');
        cy.get('#countryCode').click()
        cy.contains('USA').click();
        cy.get('#phoneNumber').type('1234567894');
        cy.contains('Prochain').click();
        cy.get('#company-name').type('company name');
        cy.get('#job-title').type('job title');
        cy.contains('Prochain').click();
        cy.get('.blui-auth-create-account-invite').should('contain', 'Compte créé');
    });
});