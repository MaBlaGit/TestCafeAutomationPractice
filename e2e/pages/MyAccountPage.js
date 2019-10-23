import { Selector } from 'testcafe'

export class MyAccountPage {
	constructor(){
		this.myAccountNavigation = Selector('.navigation_page')
	}
	
	getMyAccountNavigationText = async () => this.myAccountNavigation.innerText
}