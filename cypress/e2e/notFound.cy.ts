describe('Not Found page', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:6969/sad');
  });

  it('Text h1 contains the correct text', () => {
    cy.getByData('header').contains(404);
  });

  it('Text section contains the correct text', () => {
    cy.getByData('description').contains('Page Not Found');
  });

  it('Implementation back button', () => {
    cy.getByData('back').should('exist').contains('Back').click();
  });
});
