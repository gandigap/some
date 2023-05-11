describe('About page', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:6969/about');
  });

  it('Text h1 contains the correct text', () => {
    cy.getByData('header').contains('About Us');
  });

  it('Text section contains the correct text', () => {
    cy.getByData('description').contains('Module 01 React Components');
  });
});
