/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('e2e', () => {
    searchTwilightMasqueradeExpansion()
    // cy.get('#LoginButton').click()

    // after log in
    // go to collection
    // Assert no items

    // go to catalog
    // search twilight masquerade
    // search a specific card
    // add it

    // check collection
    // validate median price

    // go to catalog
    // search twilight masquerade
    // add another card

    // check collection
    // validate median price

    // Remove card
    // Validate
  })
})

const searchTwilightMasqueradeExpansion = () => {
  cy.get('#CatalogAutocomplete').type('Twilight')

  cy.get('#CatalogAutocomplete-0').click()

  cy.get('#ExpansionTitle').should(
    'have.text',
    'Scarlet & Violet - Twilight Masquerade Expansion'
  )
}
