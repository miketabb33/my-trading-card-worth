/// <reference types="cypress" />

const USERNAME = 'miketabb33+mytradingcardworthtest@gmail.com'
const PASSWORD = 'r3dGre3NRef@cTor'

describe('e2e', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/catalog')
  })

  it('e2e', () => {
    // Search Expansion
    cy.get('#NoExpansionSelected').contains('No Expansion Selected')
    cy.get('#CatalogAutocomplete:not([disabled])').type('Twilight')

    cy.get('#CatalogAutocomplete-0').click()

    cy.get('#ExpansionTitle').should('have.text', 'Scarlet & Violet - Twilight Masquerade Expansion')

    // Logged out collection
    cy.get('#NavCollection').click()
    cy.get('h1').first().should('have.text', 'Welcome To Your Collection!')
    cy.get('#NavCatalog').click()

    loginInWith(USERNAME, PASSWORD)

    // Go to Collection and back
    cy.get('#NavCollection').click()
    cy.get('h1').first().should('have.text', 'There Are No Items In Your Collection!')
    cy.get('#CollectionCatalogLink').click()
    cy.get('#ExpansionTitle').should('have.text', 'Scarlet & Violet - Twilight Masquerade Expansion')

    // Add/Remove card
    cy.get('#CardListSearch').type('abra')
    cy.get('#CardListItem-0').contains('Abra')
    cy.get('#CardListItem-0').contains('Owned: 0')
    cy.get('#CardListItem-0').contains('Add').click()
    cy.get('#CardListItem-0').contains('Owned: 1')
    cy.get('#CardListItem-0').contains('Remove').click()

    cy.get('#CardListItem-0').contains('Owned: 0')
    cy.get('#CardListItem-0').contains('Add').click()

    cy.get('#CardListItem-0').contains('Owned: 1')

    // Add card in collection and check median price
    cy.get('#NavCollection').click()

    cy.get('#CollectionTotalMedianValue').should('have.text', '$0.27')

    cy.get('#CardListItem-0').contains('Owned: 1')
    cy.get('#CardListItem-0').contains('Add').click()

    cy.get('#CardListItem-0').contains('Owned: 2')

    cy.get('#CollectionTotalMedianValue').should('have.text', '$0.54')

    // Search another expansion
    cy.get('#NavCatalog').click()

    cy.get('#CatalogAutocomplete input').clear().type('Temp')

    cy.get('#CatalogAutocomplete-0').click()

    cy.get('#ExpansionTitle').should('have.text', 'Scarlet & Violet - Temporal Forces Expansion')

    // Add another Card
    cy.get('#CardListItem-1').contains('Torterra ex')
    cy.get('#CardListItem-1').contains('Owned: 0')
    cy.get('#CardListItem-1').contains('Add').click()

    cy.get('#CardListItem-1').contains('Owned: 1')

    // Verify amounts in collection
    cy.get('#NavCollection').click()
    cy.get('#CollectionTotalMedianValue').should('have.text', '$2.27')

    // Remove cards
    cy.get('#CardListItem-1').contains('Remove').click()

    cy.get('#CardListItem-0').contains('Remove').click()

    cy.wait(2000)

    cy.get('#CardListItem-0').contains('Remove').click()
    cy.get('h1').first().should('have.text', 'There Are No Items In Your Collection!')
  })
})

const loginInWith = (username: string, password: string) => {
  cy.get('#LoginButton').click()

  const args = { username, password }
  cy.origin('https://tcgvalor.us.auth0.com/', { args }, ({ username, password }) => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('form').first().submit()
  })
  cy.get('#NavNameTag').contains('Hi, ')
}
