import { MainPage } from '../../pages/MainPage'
import { AuthenticationPage } from '../../pages/AuthenticationPage'
import { MyAccountPage } from '../../pages/MyAccountPage'
import { getUrl } from '../../helpers/helper'
import { userPassword } from '../../data/data'
let faker = require('faker')

const mainPage = new MainPage()
const authenticationPage = new AuthenticationPage()
const myAccountPage = new MyAccountPage()

fixture`Create account test`
	.page(getUrl('/index.php'))
	.beforeEach(async t => {
		await t.maximizeWindow()
	})

test('Unregistered user can register to Your Logo shop', async t => {
	let fakeUserEmail = faker.internet.email()
	let firstName = faker.name.firstName()
	let lastName = faker.name.lastName()

	await t.expect(await mainPage.getMainLogo()).ok()
	await mainPage.clickOnSignInButton()
	await t.expect(await authenticationPage.getAuthenticationHeader()).eql('AUTHENTICATION')
	await authenticationPage.createAccount(fakeUserEmail)
	await t.expect(await authenticationPage.getAccountCreationForm()).ok()
	await authenticationPage.providePersonalInformation(
		'Mrs',
		'Personal', firstName,
		'Personal', lastName,
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
})