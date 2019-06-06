describe('login user e2e test', function () {
  // beforeEach(() => {
  //   cy.server();
  //   // cy.route('POST', 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser**').as('create')
  // });

  describe('Access Homepage', function() {
    it('access the homepage when running locally', function() {
      cy.visit('/home')
      cy.get('h1').should('contain', 'Overwatch Challenge')
    })
  })

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
      cy.get('#password').type(Cypress.env('test-password'))
      cy.get('#login-button').click()
      cy.get('#welcome-title').should('contain', 'Welcome ' + Cypress.env('test-user-first-name'))
    })
  })
});


