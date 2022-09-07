/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('login authentication actions', () => {
  beforeEach(() => {
      cy.visit('http://localhost:4200/auth/login');
  });

  it('should authenticate with valid id', () => {
      cy.get('#blui-email').click().type('user@here.com');
      cy.get('#blui-password').click().type('Test321!');
      cy.contains('Log In').should('be.enabled').click();
      cy.contains('isAuthenticated?: true');
  });

  it('should display enter a valid email', () => {
      cy.get('#blui-email').click().type('test.com');
      cy.get('#blui-password').click();
      cy.get('#email-helper-text').should('contain', 'Please enter a valid email');
      cy.contains('Log In').should('be.disabled');
  });

  it('should toggle password visibility on-off', () => {
      cy.get('#blui-password').click().type('Test321!');
      cy.get('#visibilityIcon').click();
      cy.get('#blui-password').invoke('prop', 'type').should('contain', 'text');
      cy.get('#visibilityIcon').click();
      cy.get('#blui-password').invoke('prop', 'type').should('contain', 'password');
  });

  it('should remember me', () => {
      cy.get('#blui-email').click().type('user@here.com');
      cy.get('#blui-password').click().type('Test321!');
      cy.contains('Remember Me').click();
      cy.contains('Log In').should('be.enabled').click();
      cy.contains('Log Out').click();
      cy.getLocalStorage('BLUI_AUTH_DEMO_APP_REMEMBER_ME_EMAIL').should('equal', 'user@here.com');
  });

  it('should remember me on refresh', () => {
      cy.get('#blui-email').click().type('user@here.com');
      cy.get('#blui-password').click().type('Test321!');
      cy.contains('Remember Me').click();
      cy.contains('Log In').should('be.enabled').click();
      cy.contains('Log Out').click();
      cy.reload();
      cy.getLocalStorage('BLUI_AUTH_DEMO_APP_REMEMBER_ME_EMAIL').should('equal', 'user@here.com');
  });

  it('should not remember me', () => {
      cy.get('#blui-email').click().type('user@here.com');
      cy.get('#blui-password').click().type('Test321!');
      cy.contains('Log In').should('be.enabled').click();
      cy.contains('Log Out').click();
      cy.getLocalStorage('BLUI_AUTH_DEMO_APP_REMEMBER_ME_EMAIL').should('not.equal', 'user@here.com');
  });
});