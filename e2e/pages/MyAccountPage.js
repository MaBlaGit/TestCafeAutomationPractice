import { Selector } from 'testcafe'

export class MyAccountPage {
	constructor(){
		this.myAccountNavigation = Selector('.navigation_page')
		this.userName = Selector('[class=\'account\'] > span')
	}
	
	getMyAccountNavigationText = async () => this.myAccountNavigation.innerText

	getUserName = async () => this.userName.innerText
}