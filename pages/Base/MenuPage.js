import { click } from '../../lib/helpers'
let elements = require('../../elements_maps/base_page/base_page_elements')

export default class MenuPage {

	async menu(parameter, ...othersParameters) {

		await click(page, parameter)
		for (let i = 0; i < othersParameters.length; i = i + 1) {
			await click(page, othersParameters[i])
		}
	}

	async mainMenu() {
	  
		// await page.waitForTimeout(1000)
	    // await click(page, elements.test)
		
	}
}