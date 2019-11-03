import { MainPage } from '../../pages/MainPage'
import { AuthenticationPage } from '../../pages/AuthenticationPage'
import { MyAccountPage } from '../../pages/MyAccountPage'
import { SearchPage } from '../../pages/SearchPage'
import { getUrl, userRole, clearInput } from '../../helpers/helper'
import { userPassword, products } from '../../data/data'
let faker = require('faker')

const mainPage = new MainPage()
const authenticationPage = new AuthenticationPage()
const myAccountPage = new MyAccountPage()
const searchPage = new SearchPage()

fixture`Create account, log in and make order`
	.page(getUrl('/index.php'))
	.beforeEach(async t => {
		await t.maximizeWindow()
	})

test('Unregistered user can register to Your Logo shop', async t => {
	t.fixtureCtx.fakeUserEmail = faker.internet.email()
	t.fixtureCtx.firstName = faker.name.firstName()
	t.fixtureCtx.lastName = faker.name.lastName()

	await t.expect(await mainPage.getMainLogo()).ok()
	await mainPage.clickOnSignInButton()
	await t.expect(await authenticationPage.getAuthenticationHeader()).eql('AUTHENTICATION')
	await authenticationPage.createAccount(t.fixtureCtx.fakeUserEmail)
	await t.expect(await authenticationPage.getAccountCreationForm()).ok()
	await authenticationPage.providePersonalInformation(
		'Mrs',
		'Personal', t.fixtureCtx.firstName,
		'Personal', t.fixtureCtx.lastName,
		userPassword,
		'12',
		'10',
		'1990'
	)
	await authenticationPage.provideAddressInformation(
		faker.company.companyName(),
		faker.address.streetName(),
		faker.address.cityPrefix(),
		faker.address.city(),
		'Utah',
		'99501',
		'687968557'
	)
	await authenticationPage.clickOnRegisterButton()
	await t.expect(await myAccountPage.getMyAccountNavigationText()).eql('My account')
	await t.expect(await myAccountPage.getUserName()).eql(`${t.fixtureCtx.firstName} ${t.fixtureCtx.lastName}`)
})

test('Registered user can login into account', async t => {
	await t.expect(await mainPage.getMainLogo()).ok()
	await mainPage.clickOnSignInButton()
	await t.expect(await authenticationPage.getAuthenticationHeader()).eql('AUTHENTICATION')
	await authenticationPage.enterEmailAddress(t.fixtureCtx.fakeUserEmail)
	await authenticationPage.enterPassword(userPassword)
	await authenticationPage.clickOnSignInButton()
	await t.expect(await myAccountPage.getUserName()).eql(`${t.fixtureCtx.firstName} ${t.fixtureCtx.lastName}`)
})

test('Logged user can add product to his cart', async t => {
	await t.useRole(userRole(t.fixtureCtx.fakeUserEmail, userPassword))

	for(let i=0; i < products.length; i++) {
		await mainPage.searchProduct(products[i])
		await mainPage.clickOnTheSearchProduct()
		await searchPage.hoverOnElement(await searchPage.getProductContainer())
		await searchPage.clickOnAddToCartButton ()
		await searchPage.clickOnContinueSchoppingButton()
		await clearInput(mainPage.searchInputField)
	}

	await t.expect(await mainPage.getCartQuantity()).eql('3')
})