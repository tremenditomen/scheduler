describe("interviews", () => {
    // before every test runs, its going to visit that URL
    beforeEach(() => {
     
      cy.visit('/');
      cy.contains("Monday")
    })
    it("User can create an appointment", () => {
      cy.get('[alt= Add]')
      .first()
      .click();
  
     cy.get('[data-testid=student-name-input]')
      .type("Lydia Miller-Jones");
  
    cy.get('.interviewers__item--selected').should('not.exist');
  
    cy.get(':nth-child(1) > .interviewers__item-image')
      .first()
      .click();
  
    cy.get('.interviewers__item--selected').should('exist')
      
    cy.get('[alt= Add]')
      .first()
      .click();
   
    });
  })