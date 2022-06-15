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
function clear() {
  cy.clearLocalStorage()
}
describe('Landing Page In Potrait Mode', () => {
  beforeEach(clear)
  afterEach(clear)
  sizes.forEach((size) => {
    it(`Should render landing page on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        // cy.scrollTo(0, 500)
        cy.get('[data-testid=modal-accept]')
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
      } else {
        cy.viewport(size)
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]')
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
      }
    })
  })
})

describe('Landing Page In Landscape Mode', () => {
  beforeEach(clear)
  afterEach(clear)
  sizes.forEach((size) => {
    it(`Should render landing page on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1], 'landscape')
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]')
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
      } else {
        cy.viewport(size, 'landscape')
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]')
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
      }
    })
  })
})
