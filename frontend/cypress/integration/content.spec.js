describe('content page e2e test', function () {
  before(() => {
    cy.login();
  });

  describe('content page is shown', function() {
    it('login to the application and show content page', function() {
      // using the custom command the content page should already be shown here
      cy.get('#welcome-title').should('contain', 'Welcome ' + Cypress.env('test-user-first-name'))
    })
  })
});


