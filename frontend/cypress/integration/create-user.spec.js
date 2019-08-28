describe('create user e2e test', function () {
  beforeEach(() => {
    cy.server();
    cy.route('POST', 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser**').as('create')
  });

  describe('Access Homepage Click Create User', function() {
    it('access the homepage and clicks the create user', function() {
      cy.visit('/home')
      cy.get('.mat-accent > .mat-button-wrapper').click()
      cy.get('h1').should('contain', 'Create User')
    })
  })

  describe('enter all fields for create user', function() {
    it('access the homepage and enter all fields for create user', function() {
      cy.visit('/home')
      cy.contains('Create User').click()
      cy.get('#inputEmail').type(Cypress.env('test-email'))
      cy.get('#password').type(Cypress.env('test-password'), { log: false })
      cy.get('#firstName').type(Cypress.env('test-user-first-name'))
      cy.get('#lastName').type(Cypress.env('test-user-last-name'))
    })
  })

  describe('enter all fields and click create user button with error message', function() {
    it('access the homepage and enter all fields for create user', function() {
      cy.visit('/home')
      cy.contains('Create User').click()
      cy.get('#inputEmail').type(Cypress.env('test-email'))
      cy.get('#password').type(Cypress.env('test-password'), { log: false })
      cy.get('#firstName').type(Cypress.env('test-user-first-name'))
      cy.get('#lastName').type(Cypress.env('test-user-last-name'))
      cy.get('#create-button').click()
      cy.get('#closeButton').click()
      cy.wait('@create').then((createResponse) => {
        assert.equal(createResponse.response.body.error.message, 'EMAIL_EXISTS');
      });
    })
  })
});


