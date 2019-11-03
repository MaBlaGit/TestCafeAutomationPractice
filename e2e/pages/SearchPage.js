/* eslint-disable no-mixed-spaces-and-tabs */
import { Selector, t } from 'testcafe'

export class SearchPage {
	constructor(){
		this.productContainer = Selector('.product-container')
		this.addToCartButton = Selector('a[title=\'Add to cart\']')
		this.continueShopping = Selector('.icon-chevron-left')
	}

	hoverOnElement = async (webElement) => {
		await t.hover(webElement)
	}
   
  getProductContainer = async () => {
  	return this.productContainer
  }
	
	clickOnAddToCartButton = async () => {
		await t.click(this.addToCartButton)
	}

	clickOnContinueSchoppingButton = async () => {
		await t.click(this.continueShopping)
	}
}