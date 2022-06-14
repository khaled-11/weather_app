// Tests to run in development
/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('Check the display', () => {
        cy.wait(500)
        cy.get('#accordion_0').click()
        cy.wait(500)
        cy.get('#accordion_1').click()
        cy.wait(500)
        cy.get('#accordion_2').click()
        cy.wait(500)
        cy.get('#accordion_2').click()
        cy.wait(500)
        cy.get('#accordion_1').click()
        cy.wait(500)
        cy.get('#accordion_0').click()
        cy.wait(1000)
        cy.get('#accordion_0').click()
        cy.wait(500)
        cy.get('#search_city_name').click()
        cy.wait(1000)
        cy.get('#search_zipcode').click()
        cy.wait(1000)
        cy.get('#search_gps').click()
        cy.wait(1000)
        cy.get('#search_btn').click()
        cy.wait(1000)
        cy.get('#accordion_0').click()
        cy.wait(1000)
        cy.get('#new_york').click()
        cy.wait(1000)
        cy.get('#search_city_name').click()
        cy.wait(1000)
        cy.get("#city_name").type("California");
        cy.get('#search_btn').click()
        cy.wait(1000)
        cy.get('#accordion_0').click()
        cy.wait(500)
        cy.get('#accordion_2').click()
        cy.wait(800)
        cy.get('#accordion_0').click()
        cy.wait(500)
        cy.get('#accordion_2').click()
        cy.wait(1000)
        cy.get('#search_gps').click()
        cy.wait(1000)
        cy.get("#longitude").type("0");
        cy.get("#latitude").type("0");
        cy.wait(1000)
        cy.get('#accordion_0').click()
        cy.wait(500)
        cy.get('#search_zipcode').click()
        cy.wait(1000)
        cy.get("#zipcode").type("4454555");
        cy.get('#search_btn').click()
        cy.wait(1000)
        cy.get("#zipcode").clear();
        cy.get("#zipcode").type("11214");
        cy.get('#search_btn').click()
        cy.get('.card-header').should(
          "contain.text",
          "Bensonhurst"
        );

    })
})