export default class BasePage {

	async goToPage() {
		await page.goto('https://southsystem.com.br')
	}

	async wait(time) {
		await page.waitFor(time)
	}	
}

