import { Role, t } from 'testcafe'
import { AuthenticationPage } from '../pages/AuthenticationPage'
import { url, loginUrl } from '../data/data'

const authenticationPage = new AuthenticationPage()

export const getUrl = (path) => {
	return `${url}/${path}`
}

export const userRole = (emailAddress, password) => {
	return Role(loginUrl, async t => {
		await t
		await authenticationPage.enterEmailAddress(emailAddress)
		await authenticationPage.enterPassword(password)
		await authenticationPage.clickOnSignInButton()
	})
}

export const clearInput = async (inputLocator) => {
	let isEmpty = await inputLocator.getAttribute('value')
	if (isEmpty.length !== 0) {
		await t.click(inputLocator)
		await t.pressKey('ctrl+a')
		await t.pressKey('backspace')
	} 
}