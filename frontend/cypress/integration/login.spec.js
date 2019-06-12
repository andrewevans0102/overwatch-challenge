describe('login user e2e test', function () {
  describe('Access Homepage Click Login User', function() {
    it('access the homepage and clicks the login user', function() {
      cy.visit('/home')
      cy.get('#login').click()
      cy.get('h1').should('contain', 'Login User')
    })
  })

  describe('login to the application', function() {
    it('actually login to the application', function() {
      cy.visit('/home')
      cy.get('#login').click()
      cy.get('#email').type(Cypress.env('test-email'))
      cy.get('#password').type(Cypress.env('test-password'), { log: false })
      cy.get('#login-button').click()
      cy.get('#welcome-title').should('contain', 'Welcome ' + Cypress.env('test-user-first-name'))
    })
  })
});


