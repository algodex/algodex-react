/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const sizes = ['iphone-x', 'samsung-note9']
// const sizes = ['iphone-x']

function clear() {
  cy.clearLocalStorage()
}

describe.skip('Check Mobile Tabs on Different Screens', () => {
  beforeEach(clear)
  afterEach(clear)
  sizes.forEach((size) => {
    it(`Should render landing page and all mobile tabs on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]')
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]', { timeout: 10000 }).should('be.visible')
        cy.contains('ORDERS').should('be.visible')
        cy.contains('BOOK').should('be.visible')
        cy.contains('WALLET').should('be.visible')
        cy.contains('TRADE').should('be.visible')
        cy.contains('CHART').should('be.visible')
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
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
        cy.contains('ORDERS').should('be.visible')
        cy.contains('BOOK').should('be.visible')
        cy.contains('WALLET').should('be.visible')
        cy.contains('TRADE').should('be.visible')
        cy.contains('CHART').should('be.visible')
      }
    })
  })
})

describe('Checks if order book renders and is visible on Mobile view on Different Screens', () => {
  beforeEach(clear)
  afterEach(clear)
  sizes.forEach((size) => {
    it(`Should render order book page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
        cy.contains('BOOK').should('be.visible').click()
        cy.get('[data-testid=asset-orderbook]').should('be.visible')
      } else {
        cy.viewport(size)
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
        cy.contains('BOOK').should('be.visible').click()
        cy.get('[data-testid=asset-orderbook]').should('be.visible')
      }
    })
  })
})

describe('Checks if chart is visible on Mobile view on Different Screens', () => {
  beforeEach(clear)
  afterEach(clear)
  sizes.forEach((size) => {
    it(`Should render chart page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        // cy.get('[data-testid=spinner-flex-container]').should('be.visible')
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')

        // cy.contains('CHART').should('be.visible').click()
        // cy.get('.asset-search__AssetsContainer-sc-dxz42i-1 > [style="width: 100%;"]').should(
        //   'be.visible'
        // )
      } else {
        cy.viewport(size)
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        // cy.get('[data-testid=spinner-flex-container]').should('be.visible')
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')

        // cy.get('[data-testid=not-signed-in]').should('be.visible')
        // cy.get('.asset-search__AssetsContainer-sc-dxz42i-1 > [style="width: 100%;"]').should(
        //   'be.visible'
        // )
      }
    })
  })
})

describe('Checks if trade section is visible on Mobile view on Different Screens', () => {
  beforeEach(clear)
  afterEach(clear)
  sizes.forEach((size) => {
    it(`Should render trade section page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        // cy.get('[data-testid=spinner-flex-container]').should('be.visible')
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
        cy.contains('TRADE').should('be.visible').click()
        // cy.get('.asset-search__AssetsContainer-sc-dxz42i-1 > [style="width: 100%;"]').should(
        //   'be.visible'
        // )
      } else {
        cy.viewport(size)
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 }).contains('ACCEPT').click()
        // cy.get('[data-testid=spinner-flex-container]').should('be.visible')
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
        cy.contains('TRADE').should('be.visible').click()
        // cy.get('[data-testid=not-signed-in]').should('be.visible')
      }
    })
  })
})

describe.skip('Checks if wallet section is visible on Mobile view on Different Screens', () => {
  beforeEach(clear)
  afterEach(clear)
  sizes.forEach((size) => {
    it(`Should render wallet section page on a ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
        cy.contains('WALLET').should('be.visible').click({ force: true })
      } else {
        cy.viewport(size)
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
        cy.contains('WALLET').should('be.visible').click({ force: true })
        cy.get('[data-testid=connect-wallet-btn]').should('be.visible')
      }
    })
  })
})

describe('Render search table when Input is clicked on Mobile View on Different Screens', () => {
  beforeEach(clear)
  afterEach(clear)
  sizes.forEach((size) => {
    it(`Should render ASA table on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        // cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        // cy.get('[data-testid=spinner-flex-container]').should('be.visible')
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
        cy.get('[data-testid=asa-table-search-input]').should('be.visible').click()
        cy.get('[data-testid=data-table]').should('be.visible')
        cy.get('[data-testid=data-table]').children().first().click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
      } else {
        cy.viewport(size)
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        // cy.get('button').contains('ACCEPT').click()
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        // cy.get('[data-testid=spinner-flex-container]').should('be.visible')
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
        cy.get('[data-testid=asa-table-search-input]').should('be.visible').click()
        cy.get('[data-testid=data-table]').should('be.visible')
        cy.get('[data-testid=data-table]').children().first().click()
        cy.get('[data-testid=candleStickChart]').should('be.visible')
      }
    })
  })
})
