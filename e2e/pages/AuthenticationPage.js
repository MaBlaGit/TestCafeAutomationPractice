import { Selector, t } from 'testcafe'

export class AuthenticationPage {
	constructor(){
		this.authenticationHeader = Selector('.page-heading')
		this.createAccountEmailAddress = Selector('#email_create')

		this.emailInputField = Selector('#email')
		this.passwordInputField = Selector('#passwd')
		this.signInButton = Selector('#SubmitLogin')

		this.createAccountButton = Selector('#SubmitCreate')
		this.accountCreationForm = Selector('#account-creation_form')
		this.genderRadioButton = Selector('.radio-inline')
		this.customerFirstNameInput = Selector('#customer_firstname')
		this.customerAddressName = Selector('#firstname')
		this.customerLastNameInput = Selector('#customer_lastname')
		this.customerAddressLastName = Selector('#lastname')
		this.customerPasswordInput = Selector('#passwd')
		this.dayDateSelect = Selector('#days')
		this.monthsDateSelect = Selector('#months')
		this.yearsDateSelect = Selector('#years')
		this.newsletterCheckbox = Selector('#newsletter')
		this.specialOfferCheckbox = Selector('#uniform-optin')
		this.company = Selector('#company')
		this.address1 = Selector('#address1')
		this.address2 = Selector('#address2')
		this.city = Selector('#city')
		this.activateSelectState = Selector('#id_state')
		this.state = Selector('#id_state > option')
		this.postcode = Selector('#postcode')
		this.country = Selector('#id_country')
		this.mobilePhone = Selector('#phone_mobile')
		this.registerButton = Selector('#submitAccount')
	}
	
	getAuthenticationHeader = async () => this.authenticationHeader.innerText

	getAccountCreationForm = async () => {
		return this.accountCreationForm
	}

	enterNewEmailAddress = async (emailAddress) => {
		await t
			.click(this.createAccountEmailAddress)
			.typeText(this.createAccountEmailAddress, emailAddress)
	}

	clickOnCreateAccountButton = async () => {
		await t
			.click(this.createAccountButton)
	}

	enterEmailAddress = async (emailAddress) => {
		await t.typeText(this.emailInputField, emailAddress)
	}

	enterPassword = async (password) => {
		await t.typeText(this.passwordInputField, password)
	}

	clickOnSignInButton = async () => {
		await t.click(this.signInButton)
	}

	createAccount = async (emailAddress) => {
		await this.enterNewEmailAddress(emailAddress)
		await this.clickOnCreateAccountButton()
	}

	providePersonalInformation = async (
		gender, 
		formSectionFirstName, 
		firstName, 
		formSectionLastName, 
		lastName, 
		password, 
		day, 
		month, 
		year) => {
		await this.selectGender(gender)
		await this.enterCustomerFirstName(formSectionFirstName, firstName)
		await this.enterCustomerLastName(formSectionLastName, lastName)
		await this.enterCustomerPassword(password)
		await this.selectDay(day)
		await this.selectMonth(month)
		await this.selectYear(year)
		await this.checkNewsletterCheckbox()
		await this.checkSpecialOfferCheckbox()
	}

	provideAddressInformation = async (
		companyName, 
		mainAddress,
		secondAddress, 
		city, 
		state,
		postcode,
		mobilePhone) => {
		await this.enterCompanyName(companyName)
		await this.enterMainAddress(mainAddress)
		await this.enterSecondAddress(secondAddress)
		await this.enterCityName(city)
		await this.selectStateByName(state)
		await this.enterPostcode(postcode)
		await this.enterMobilePhone(mobilePhone)
	}

	selectGender = async (gender) => {
		switch (gender) {
		case 'Ms':
			await t.click(this.genderRadioButton.nth(0))
			break
		case 'Mrs':
			await t.click(this.genderRadioButton.nth(1))
			break
		}
	}

	enterCustomerFirstName = async (formSectionFirstName, firstName) => {
		switch(formSectionFirstName) {
		case 'Personal':
			await t.typeText(this.customerFirstNameInput.nth(0), firstName)
			break
		case 'Address':
			await t.typeText(this.customerAddressName, firstName)
			break
		}
	}

	enterCustomerLastName = async (formSectionLastName, lastName) => {
		switch(formSectionLastName) {
		case 'Personal':
			await t.typeText(this.customerLastNameInput.nth(0), lastName)
			break
		case 'Address':
			await t.typeText(this.customerAddressLastName, lastName)
			break
		}
	}

	enterCustomerPassword = async (password) => {
		await t.typeText(this.customerPasswordInput, password)
	}

	selectDay = async (day) => {
		await t
			.click(this.dayDateSelect)
			.click(this.dayDateSelect.find('option').withAttribute('value', `${day}`))
	}

	selectMonth = async (month) => {
		await t
			.click(this.monthsDateSelect)
			.click(this.monthsDateSelect.find('option').withAttribute('value', `${month}`))
	}

	selectYear = async (year) => {
		await t
			.click(this.yearsDateSelect)
			.click(this.yearsDateSelect.find('option').withAttribute('value', `${year}`))
	}

	checkNewsletterCheckbox = async () => {
		await t	
			.click(this.newsletterCheckbox)
	}

	checkSpecialOfferCheckbox = async () => {
		await t
			.click(this.specialOfferCheckbox)
	}

	enterCompanyName = async (companyName) => {
		await t
			.typeText(this.company, companyName)
	}

	enterMainAddress = async (mainAddress) => {
		await t
			.typeText(this.address1, mainAddress)
	}

	enterSecondAddress = async (secondAddress) => {
		await t
			.typeText(this.address2, secondAddress)
	}

	enterCityName = async (city) => {
		await t
			.typeText(this.city, city)
	}

	selectStateByName = async (stateName) => {
		await t
			.click(this.activateSelectState)
			.click(this.state.withText(stateName))
	}

	enterPostcode = async (postcode) => {
		await t
			.typeText(this.postcode, postcode)
	}

	enterMobilePhone = async (mobilePhone) => {
		await t
			.typeText(this.mobilePhone, mobilePhone)
	}

	clickOnRegisterButton = async () => {
		await t
			.click(this.registerButton)
	}

}