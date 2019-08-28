describe('activity create, view, and delete e2e test', function () {
  describe('create, view, and then delete activity', function() {
    it('access the homepage and login user', function() {
      cy.visit('/home')
      cy.get('#login').click()
      cy.get('#email').type(Cypress.env('test-email'))
      cy.get('#password').type(Cypress.env('test-password'), { log: false })
      cy.get('#login-button').click()
      cy.get('#welcome-title').should('contain', 'Welcome ' + Cypress.env('test-user-first-name'))
      cy.get('#content-menu').click();
      cy.get('.mat-menu-content > :nth-child(1) > span').click();
      cy.get('.mat-select-arrow-wrapper').click();
      cy.get('#mat-option-0 > .mat-option-text').click();
      cy.get('#mat-input-2').type(Cypress.env('activity-description'));
      cy.get('#mat-input-3').type(Cypress.env('activity-link'));
      cy.get('.mat-primary > .mat-button-wrapper').click();
      cy.get('#info-message').should('contain', 'activity was created successfully');
      cy.get('#closeButton').click();
      cy.wait(500);
      cy.get('#welcome-title').should('contain', 'Welcome Chessie!');
    })
  })
});
