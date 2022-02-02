const sizes = ['iphone-x', 'samsung-note9']

describe.skip('Check Mobile Tabs on Different Screens', () => {
  sizes.forEach((size) => {
    it(`Should render landing page and all mobile tabs on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.contains('ORDERS').should('be.visible')
        cy.contains('BOOK').should('be.visible')
        cy.contains('WALLET').should('be.visible')
        cy.contains('TRADE').should('be.visible')
        cy.contains('CHART').should('be.visible')
      } else {
        cy.viewport(size)
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.contains('ORDERS').should('be.visible')
        cy.contains('BOOK').should('be.visible')
        cy.contains('WALLET').should('be.visible')
        cy.contains('TRADE').should('be.visible')
        cy.contains('CHART').should('be.visible')
      }
    })
  })
})

describe.skip('Checks if order book renders and is visible on Mobile view on Different Screens', () => {
  sizes.forEach((size) => {
    it(`Should render order book page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.contains('BOOK').should('be.visible').click()
        cy.get('.order-bookcss__Container-sc-8771t6-0').should('be.visible')
      } else {
        cy.viewport(size)
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.contains('BOOK').should('be.visible').click()
        cy.get('.order-bookcss__Container-sc-8771t6-0').should('be.visible')
      }
    })
  })
})

describe.skip('Checks if chart is visible on Mobile view on Different Screens', () => {
  sizes.forEach((size) => {
    it(`Should render chart page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.contains('CHART').should('be.visible').click()
        cy.get('.asset-search__AssetsContainer-sc-dxz42i-1 > [style="width: 100%;"]').should(
          'be.visible'
        )
      } else {
        cy.viewport(size)
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.contains('CHART').should('be.visible').click()
        cy.get('.asset-search__AssetsContainer-sc-dxz42i-1 > [style="width: 100%;"]').should(
          'be.visible'
        )
      }
    })
  })
})

describe.skip('Checks if trade section is visible on Mobile view on Different Screens', () => {
  sizes.forEach((size) => {
    it(`Should render trade section page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.contains('TRADE').should('be.visible').click()
        cy.get('.asset-search__AssetsContainer-sc-dxz42i-1 > [style="width: 100%;"]').should(
          'be.visible'
        )
      } else {
        cy.viewport(size)
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.contains('TRADE').should('be.visible').click()
        cy.get('.main-layoutcss__PlaceOrderSection-sc-d2kdjb-1').should('be.visible')
      }
    })
  })
})

describe.skip('Checks if wallet section is visible on Mobile view on Different Screens', () => {
  sizes.forEach((size) => {
    it(`Should render wallet section page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.contains('WALLET').should('be.visible').click({ force: true })
      } else {
        cy.viewport(size)
        cy.visit('/en/trade/15322902')
        cy.get('button').contains('ACCEPT').should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.contains('WALLET').should('be.visible').click({ force: true })
        cy.get('[data-testid=connect-wallet-btn]').should('be.visible')
        cy.get('.walletcss__Container-sc-1tb3vth-0').should('be.visible')
      }
    })
  })
})
