import BasePage from '../Web/../../pages/Base/BasePage'
import WebPage from '../Web/../../pages/Web/WebPage'
let elements = require('../../elements_maps/web/web_elements')
import { getElementText } from '../../utils/universalRandom'
import { timeout } from '../Web/../../config'

describe('Must do a Web Test', () => {

  let basePage
  let webPage

  beforeAll(async () => {

    jest.setTimeout(timeout)
    await basePage.goToPage()

  })

  basePage = new BasePage()
  webPage = new WebPage()

  it('Must be a Web Test', async () => {

    await webPage.webPage()

    const welcome = await getElementText(page, elements.successMessage)
    expect(welcome).toBe("Seja bem-vindo à SOUTH SYSTEM.")

  })  
})





