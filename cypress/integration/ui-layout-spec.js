/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
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
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        cy.get('[data-testid=spinner-flex-container]').should('be.visible')
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
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
        cy.get('[data-testid=spinner-flex-container]').should('be.visible')
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
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
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        cy.get('[data-testid=spinner-flex-container]').should('be.visible')
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
      } else {
        cy.viewport(size, 'landscape')
        cy.visit('/en/about')
        clear()
        cy.visit('/en/trade/15322902')
        cy.get('[data-testid=modal-accept]', { timeout: 50000 })
          .contains('ACCEPT')
          .scrollIntoView()
          .should('be.visible')
        cy.get('[data-testid=modal-accept]').contains('ACCEPT').click()
        cy.get('[data-testid=spinner-flex-container]').should('be.visible')
        cy.get('[data-testid=candleStickChart]', { timeout: 50000 }).should('be.visible')
      }
    })
  })
})
