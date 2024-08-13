/// <reference types="cypress" />

const USERNAME = 'miketabb33+mytradingcardworthtest@gmail.com'
const PASSWORD = 'r3dGre3NRef@cTor'

describe('e2e', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('e2e', async () => {
    // Search Expansion
    cy.get('#CatalogAutocomplete').type('Twilight')

    cy.get('#CatalogAutocomplete-0').click()

    cy.get('#ExpansionTitle').should(
      'have.text',
      'Scarlet & Violet - Twilight Masquerade Expansion'
    )

    // Logged out collection
    cy.get('#NavCollection').click()
    cy.get('h1').first().should('have.text', 'Welcome To Your Collection!')
    cy.get('#NavCatalog').click()

    loginInWith(USERNAME, PASSWORD)

    // Go to Collection and back
    cy.get('#NavCollection').click()
    cy.get('h1')
      .first()
      .should('have.text', 'There Are No Items In Your Collection!')
    cy.get('#CollectionCatalogLink').click()
    cy.get('#ExpansionTitle').should(
      'have.text',
      'Scarlet & Violet - Twilight Masquerade Expansion'
    )

    // Add/Remove card
    cy.get('#CardListSearch').type('abra')
    cy.get('#CardListItem-0').contains('Abra')
    cy.get('#CardListItem-0').contains('Owned: 0')
    cy.get('#CardListItem-0').contains('Add').click()
    cy.wait(2000)
    cy.get('#CardListItem-0').contains('Owned: 1')
    cy.get('#CardListItem-0').contains('Remove').click()
    cy.wait(2000)
    cy.get('#CardListItem-0').contains('Owned: 0')
    cy.get('#CardListItem-0').contains('Add').click()
    cy.wait(2000)
    cy.get('#CardListItem-0').contains('Owned: 1')

    // Add card in collection and check median price
    cy.get('#NavCollection').click()

    const amount1 = await getMedianValue(0)
    const total1 = await getTotalMedianValue()
    expect(amount1).equal(total1)

    cy.get('#CardListItem-0').contains('Owned: 1')
    cy.get('#CardListItem-0').contains('Add').click()
    cy.wait(2000)
    cy.get('#CardListItem-0').contains('Owned: 2')

    const amount2 = await getMedianValue(0)
    const total2 = await getTotalMedianValue()
    expect(amount2).equal(total2)

    // Search another expansion
    cy.get('#NavCatalog').click()

    cy.get('#CatalogAutocomplete').type('Temp')

    cy.get('#CatalogAutocomplete-0').click()

    cy.get('#ExpansionTitle').should(
      'have.text',
      'Scarlet & Violet - Temporal Forces Expansion'
    )

    // Add another Card
    cy.get('#CardListItem-1').contains('Torterra ex')
    cy.get('#CardListItem-1').contains('Owned: 0')
    cy.get('#CardListItem-1').contains('Add').click()
    cy.wait(2000)
    cy.get('#CardListItem-1').contains('Owned: 1')

    // Verify amounts in collection
    cy.get('#NavCollection').click()
    const amount3_1 = await getMedianValue(0)
    const amount3_2 = await getMedianValue(1)
    const total3 = await getTotalMedianValue()
    expect(amount3_1 + amount3_2).equal(total3)

    // Remove cards
    cy.get('#CardListItem-1').contains('Remove').click()
    cy.wait(2000)
    cy.get('#CardListItem-0').contains('Remove').click()
    cy.wait(2000)
    cy.get('#CardListItem-0').contains('Remove').click()
    cy.get('h1')
      .first()
      .should('have.text', 'There Are No Items In Your Collection!')
  })
})

const loginInWith = (username: string, password: string) => {
  cy.get('#LoginButton').click()

  const args = { username, password }
  cy.origin(
    'https://my-trading-card-worth.us.auth0.com',
    { args },
    ({ username, password }) => {
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('form').first().submit()
    }
  )
  cy.get('#NavNameTag').contains('Hi, ')
}

const getMedianValue = (position: number): Promise<number> => {
  return new Promise((res) => {
    cy.get(`#CardListItem-${position}`)
      .contains('Median Value:')
      .then(($median) => {
        const text = $median.text()
        const amountString = text.replace('Median Value: $', '')
        const amount = parseFloat(amountString)

        cy.get(`#CardListItem-${position}`)
          .contains('Owned:')
          .then(($owned) => {
            const text = $owned.text()
            const ownedString = text.replace('Owned: ', '')
            const owned = parseInt(ownedString)

            res(amount * owned)
          })
      })
  })
}

const getTotalMedianValue = (): Promise<number> => {
  return new Promise((res) => {
    cy.get('#CollectionTotalMedianValue').then(($total) => {
      const text = $total.text()
      const amountString = text.replace('Median: $', '')
      const amount = parseFloat(amountString)

      res(amount)
    })
  })
}
