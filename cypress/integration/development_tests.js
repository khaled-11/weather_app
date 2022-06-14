// Tests to run in development
/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('Check the display', () => {
      cy.get('body').should('exist')
    })
})