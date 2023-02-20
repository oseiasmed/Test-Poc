import { click, write } from '../../lib/helpers'
import { receiveEmailList } from '../../lib/random_methods'
import { selectRandom, scrollDownPage, generateDateBirth, uploadFile } from '../../utils/universalRandom'
let elements = require('../../elements_maps/web/web_elements')
let faker = require('faker-br')

export default class WebPage {

    async webPage() {

        let optionalEmail = receiveEmailList
        let fullName = faker.name.findName()
        let modifiedName = fullName.replace(/\s/g, '')
        await page.waitForTimeout(4000)
        await click(page, elements.menu)
        await page.waitForTimeout(1000)
        await click(page, elements.careers)
        await page.waitForTimeout(1000)
        await scrollDownPage(page, 100)
        await click(page, elements.openJobs)
        await page.waitForTimeout(1000)
        await scrollDownPage(page, 150)
        const chooseJob = await selectRandom(".open-jobs__title")
        console.log(chooseJob)
        await click(page, chooseJob)
        await page.waitForTimeout(1000)
        await write(page, elements.applyName, fullName)
        await write(page, elements.applyEmail, (`${modifiedName}@${optionalEmail}.com`).toLowerCase())
        await write(page, elements.applyCellphone, faker.phone.phoneNumber())
        await write(page, elements.applyBirth, await generateDateBirth())
        await write(page, elements.applyLinkedin, (`https://www.linkedin.com/in/${modifiedName}`).toLowerCase())
        await write(page, elements.applyGithub, (`https://github.com/${modifiedName}`).toLowerCase())
        await write(page, elements.applySite, (`https://www.${modifiedName}.com.br`).toLowerCase())
        await uploadFile(page, elements.apply_Resume, elements.filePath)
        await click(page, elements.agree)
        await click(page, elements.sendBtn)
        
    }
}


