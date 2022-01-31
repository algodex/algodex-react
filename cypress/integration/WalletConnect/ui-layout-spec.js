const sizes = [
  'iphone-6',
  'iphone-x',
  'samsung-s10',
  'ipad-2',
  'ipad-mini',
  'samsung-note9',
  'macbook-11',
  'macbook-13',
  'macbook-15',
  'macbook-16'
]

describe('Landing Page In Potrait Mode', () => {
  sizes.forEach((size) => {
    it(`Should render landing page on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
      } else {
        cy.viewport(size)
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
      }
    })
  })
})

describe('Landing Page In Landscape Mode', () => {
  sizes.forEach((size) => {
    it(`Should render landing page on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1], 'landscape')
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
      } else {
        cy.viewport(size, 'landscape')
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
      }
    })
  })
})
