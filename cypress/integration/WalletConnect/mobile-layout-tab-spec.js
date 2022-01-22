const sizes = ['iphone-6', 'iphone-x', 'samsung-s10', 'samsung-note9']

describe('Check Mobile Tabs on Different Screens', () => {
  sizes.forEach((size) => {
    it(`Should render landing page and all mobile tabs on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/trade/15322902')
        cy.get('.NotificationModal__Button-sc-1yiqhp3-0').click({ force: true })
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.get('[data-cy=orders-button]').should('be.visible')
        cy.get('[data-cy=book-button]').should('be.visible')
        cy.get('[data-cy=wallet-button]').should('be.visible')
        cy.get('[data-cy=trade-button]').should('be.visible')
        cy.get('[data-cy=chart-button]').should('be.visible')
      } else {
        cy.viewport(size)
        cy.visit('/en/trade/15322902')
        cy.get('.NotificationModal__Button-sc-1yiqhp3-0').click({ force: true })
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.get('[data-cy=orders-button]').should('be.visible')
        cy.get('[data-cy=book-button]').should('be.visible')
        cy.get('[data-cy=wallet-button]').should('be.visible')
        cy.get('[data-cy=trade-button]').should('be.visible')
        cy.get('[data-cy=chart-button]').should('be.visible')
      }
    })
  })
})

describe('Checks if order book renders and is visible on Mobile view on Different Screens', () => {
  sizes.forEach((size) => {
    it(`Should render order book page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/trade/15322902')
        cy.get('.NotificationModal__Button-sc-1yiqhp3-0').click({ force: true })
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.get('[data-cy=book-button]').should('be.visible').click()
        cy.get('.order-bookcss__Container-sc-8771t6-0').should('be.visible')
      } else {
        cy.viewport(size)
        cy.visit('/en/trade/15322902')
        cy.get('.NotificationModal__Button-sc-1yiqhp3-0').click({ force: true })
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.get('[data-cy=book-button]').should('be.visible').click()
        cy.get('.order-bookcss__Container-sc-8771t6-0').should('be.visible')
      }
    })
  })
})

describe('Checks if chart is visible on Mobile view on Different Screens', () => {
  sizes.forEach((size) => {
    it(`Should render chart page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/trade/15322902')
        cy.get('.NotificationModal__Button-sc-1yiqhp3-0').click({ force: true })
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.get('[data-cy=chart-button]').should('be.visible').click()
        cy.get('.asset-search__AssetsContainer-sc-dxz42i-1 > [style="width: 100%;"]').should(
          'be.visible'
        )
      } else {
        cy.viewport(size)
        cy.visit('/en/trade/15322902')
        cy.get('.NotificationModal__Button-sc-1yiqhp3-0').click({ force: true })
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.get('[data-cy=chart-button]').should('be.visible').click({ force: true })
        cy.get('.asset-search__AssetsContainer-sc-dxz42i-1 > [style="width: 100%;"]').should(
          'be.visible'
        )
      }
    })
  })
})

describe('Checks if trade section is visible on Mobile view on Different Screens', () => {
  sizes.forEach((size) => {
    it(`Should render trade section page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/trade/15322902')
        cy.get('.NotificationModal__Button-sc-1yiqhp3-0').click({ force: true })
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.get('[data-cy=chart-button]').should('be.visible').click()
        cy.get('.asset-search__AssetsContainer-sc-dxz42i-1 > [style="width: 100%;"]').should(
          'be.visible'
        )
      } else {
        cy.viewport(size)
        cy.visit('/en/trade/15322902')
        cy.get('.NotificationModal__Button-sc-1yiqhp3-0').click({ force: true })
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.get('[data-cy=trade-button]').should('be.visible').click({ force: true })
        cy.get('.main-layoutcss__PlaceOrderSection-sc-d2kdjb-1').should('be.visible')
        cy.get('#price').should('be.visible').type(1)
        cy.get('#amount').should('be.visible').type(5)
        cy.get('.place-ordercss__SubmitButton-sc-1hehax9-14').should('be.visible')
      }
    })
  })
})

describe('Checks if wallet section is visible on Mobile view on Different Screens', () => {
  sizes.forEach((size) => {
    it(`Should render wallet section page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/trade/15322902')
        cy.get('.NotificationModal__Button-sc-1yiqhp3-0').click({ force: true })
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.get('[data-cy=wallet-button]').should('be.visible').click()
      } else {
        cy.viewport(size)
        cy.visit('/en/trade/15322902')
        cy.get('.NotificationModal__Button-sc-1yiqhp3-0').click({ force: true })
        cy.get('[data-testid=candleStickChart]').should('be.visible')
        cy.get('[data-cy=wallet-button]').should('be.visible').click({ force: true })
        cy.get('[data-testid=connect-wallet-btn]').should('be.visible')
        cy.get('.walletcss__Container-sc-1tb3vth-0').should('be.visible')
      }
    })
  })
})
