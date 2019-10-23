import { Selector, t } from 'testcafe'

export class MainPage {
	constructor(){
		this.mainLogo = Selector('img').withAttribute('class', 'logo img-responsive')
		this.signInButton = Selector('.login')
	}

  getMainLogo = async () => this.mainLogo

  clickOnSignInButton = async () => await t.click(this.signInButton)
}