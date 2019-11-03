import { Selector, t } from 'testcafe'

export class MainPage {
	constructor(){
		this.mainLogo = Selector('img').withAttribute('class', 'logo img-responsive')
		this.signInButton = Selector('.login')
		this.searchInputField = Selector('#search_query_top')
		this.searchButton = Selector('button').withAttribute('class', 'btn btn-default button-search')
	}

  getMainLogo = async () => this.mainLogo

	clickOnSignInButton = async () => {
		await t.click(this.signInButton)
	}
	
	searchProduct = async (productName) => {
		await t.typeText(this.searchInputField, productName)
	}

	clickOnTheSearchProduct = async () => {
		await t.click(this.searchButton)
	}
}