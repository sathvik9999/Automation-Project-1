beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3

/*
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */

it('Check that radio button list is correct', () => {
    // Array of found elements with given selector has 4 elements in total
    cy.get('input[type="radio"]').should('have.length', 4)
    cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
    cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
    cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
    cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

    // Selecting one will remove selection from other radio button
    cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
})

it('Country dropdown is correct', () => {
    cy.get('#country').children().should('have.length', 4)
    cy.get('#country').find('option').should('have.length', 4)
     // Advanced level how to check the content of the country dropdown
     // First row is empty
        cy.get('#country').find('option').eq(0).should('have.text', '')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
    

    // Verify that if no country is selected then city is also not selected
    cy.get('#country').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(0).should('have.text', '')
       
    //verify that city dropdown is correct when the country Spain is selected.
    cy.get('#country').select('Spain')
    cy.get('#city').children().should('have.length', 5)
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
    cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
    cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
    cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')


   //verify that city dropdown is correct when the country Estonia is selected.
    cy.get('#country').select('Estonia')
    cy.get('#city').children().should('have.length', 4)
    cy.get('#city').find('option').eq(0).should('have.text', '')
    cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
    cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
    cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')
   
    
   //verify that city dropdown is correct when the country Austria is selected.
   cy.get('#country').select('Austria')
   cy.get('#city').children().should('have.length', 4)
   cy.get('#city').find('option').eq(0).should('have.text', '')
   cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
   cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
   cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')
  


})


it('To check the checkboxes and its link is correct', () => {
cy.get('[type="checkbox"]').should('have.class','ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required', 'Accept our privacy policy' ).check()
cy.get('button').should('have.text', 'Accept our cookie policy')



})

it('To verify the error message if email is not correct', () => {
cy.get('input[name="email"]').type('ghhj')
cy.get('#emailAlert').should('contain','Invalid email address') 

})


describe('Section 1: visual tests', ()=> {
    it('This is my first test', () => {
        // This is empty template
    });
})

//BONUS TASK: add functional tests for registration form 3

/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */

it('To verify that all fields are filled in + validation', () => {
    cy.get ('#name').clear().type('Sathvik')
    cy.get('[name="email"]').type('Sathvikmakireddy@gmail.com')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    cy.contains('Date of birth').next().type ('1994-11-14')
    cy.get('[value="Weekly"]').check();
    cy.get('#birthday').type ('1994-11-14')
    cy.get('[type="checkbox"]').first().check();
    cy.get('[type="checkbox"]').last().check();
    cy.get('[type="submit"]').should('be.enabled')
    cy.get('[type="submit"]').last().click();
    cy.contains('Submission received').should('be.visible')


})

it('To verify that only mandatory fields are filled in + validation', () => {
    cy.get('[name="email"]').type('Sathvikmakireddy@gmail.com')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    cy.contains('Date of birth').next().type ('1994-11-14')
    cy.get('[type="checkbox"]').first().check();
    cy.get('[type="checkbox"]').last().check();
    cy.get('[type="submit"]').should('be.enabled')
    cy.get('[type="submit"]').last().click();
    cy.contains('Submission received').should('be.visible')


}) 


it('To verify that the city is removed after new country is chosen', () => {

    cy.get('#country').select('Estonia')
    cy.get('#city').select('Tallinn')
    //select a new country
    cy.get('#country').select('Spain')
    // Make sure "Tallinn" does not exist
    
    cy.get('[label="Tallinn"]').should('not.exist')

}) 