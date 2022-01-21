let walletData;

before('Load Fixtures', () => {
  cy.fixture('wallet').then((content) => (walletData = content));
  cy.visit('/en/trade/15322902');
  cy.waitForReact();
});


describe('checks for successful login', () => {
  it('checks if screen renders', () => {
  });
});
