module.exports = {

    click: async function (page, selector) {
        try {
            await page.waitForXPath(selector)
            const clickInput = await page.$x(selector)
            await clickInput[0].click(selector)
        } catch (error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },

    clicS: async function (page, selector) {
        try {
            await page.waitForXPath(selector)
            const clickInput = await page.$x(selector)
            await clickInput[0].click(selector)
            await page.waitForTimeout(1000)
        } catch (error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },

    grabPrimeMinisters: async function (page) {
        await page.evaluate(() => {

            var primeministers = []
            var containers = document.querySelector(".rc-virtual-list-holder-inner")
            var pms = containers.querySelectorAll("div.ant-select-item-option-content")
            pms.forEach((element) => {

                primeministers.push(element.innerText)

            })

            return primeministers
        })
    },

    scrolling: async function (page, selector) {
        try {

            const elem = await page.$(selector);
            const boundingBox = await elem.boundingBox();
            await page.mouse.move(
                boundingBox.x + boundingBox.width / 2,
                boundingBox.y + boundingBox.height / 2
            );
            await page.mouse.wheel({ deltaX: 310 })

        } catch (error) {
            throw new Error(`Could not scroll`)
        }
    },
    scrollingBack: async function (page, selector) {
        try {

            const elem = await page.$(selector);
            const boundingBox = await elem.boundingBox();
            await page.mouse.move(
                boundingBox.x + boundingBox.width / 2,
                boundingBox.y + boundingBox.height / 2
            );
            await page.mouse.wheel({ deltaX: -100 })

        } catch (error) {
            throw new Error(`Could not scroll`)
        }
    },

    waitAndDoubleClick: async function (page, selector) {
        try {
            await page.waitForXPath(selector)
            const clickInput = await page.$x(selector)
            await clickInput[0].click(selector)
            await clickInput[0].click(selector)
        } catch (error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },

    wait: async function (page) {
        try {
            await page.wait()
        } catch (error) {
            throw new Error(`Could not wait`)
        }
    },

    waitAndWrite: async function (page, selector, text) {
        try {
            await page.waitForXPath(selector)
            var writeInput = await page.$x(selector)
            await writeInput[0].type(text)
        } catch (error) {
            throw new Error(`Could not write: ${selector}`)
        }
    },

    write: async function (page, selector, text) {
        try {
            await page.waitForXPath(selector)
            var writeInput = await page.$x(selector)
            await writeInput[0].click({ clickCount: 3 })
            await writeInput[0].press('Backspace')
            await writeInput[0].type(text)
        } catch (error) {
            throw new Error(`Could not write: ${selector}`)
        }
    },

    select: async function (page, parameterOne, parameterTwo) {
        try {
            await page.waitForXPath(parameterOne)
            var selectInput = await page.$x(parameterOne)
            await selectInput[0].click(parameterOne)

            await page.waitForXPath(parameterTwo)
            var selectInputItem = await page.$x(parameterTwo)
            await selectInputItem[0].click(parameterTwo)

        } catch (error) {
            throw new Error(`Could not select: ${parameterOne}`)
        }
    },

    waitAndSelectThree: async function (page, selector, optionOne, optionTwo) {
        try {
            await page.waitForXPath(selector)
            var selectInput = await page.$x(selector)
            await selectInput[0].click(selector)

            await page.waitForXPath(optionOne)
            var selectInputItemOne = await page.$x(optionOne)
            await selectInputItemOne[0].click(optionOne)

            await page.waitForXPath(optionTwo)
            var selectInputItemTwo = await page.$x(optionTwo)
            await selectInputItemTwo[0].click(optionTwo)

        } catch (error) {
            throw new Error(`Could not select: ${selector}`)
        }
    },

    waitAndSelectFour: async function (page, selectorOne, selectorTwo, selectorThree, selectorFour) {
        try {
            await page.waitForXPath(selectorOne)
            var selectInputItemOne = await page.$x(selectorOne)
            await selectInputItemOne[0].click(selectorOne)

            await page.waitForXPath(selectorTwo)
            var selectInputItemTwo = await page.$x(selectorTwo)
            await selectInputItemTwo[0].click(selectorTwo)

            await page.waitForXPath(selectorThree)
            var selectInputItemThree = await page.$x(selectorThree)
            await selectInputItemThree[0].click(selectorThree)

            await page.waitForXPath(selectorFour)
            var selectInputItemFour = await page.$x(selectorFour)
            await selectInputItemFour[0].click(selectorFour)

        } catch (error) {
            throw new Error(`Could not select: ${selectorOne}`, `Could not select: ${selectorTwo}`
                , `Could not select: ${selectorThree}`, `Could not select: ${selectorFour}`)
        }
    },

    waitForText: async function (page, selector, text) {
        try {
            await page.waitForSelector(selector)
            await page.waitForFunction((selector, text) => {
                document.querySelector(selector).innerText.includes(text),
                    {},
                    selector,
                    text
            })
        }

        catch (error) {

            throw new Error(`Text: ${text} not found for selector: ${selector}`)
        }
    },

    getText: async (selector) => {

        try {

            var [getContent] = await page.$x(selector)
            var contentMSG = await page.evaluate(el => el.textContent, getContent)
            return await contentMSG

        } catch (error) {
            throw new Error(`Cannot get text for selector:${selector}`)
        }
    },

    getValue: async (selector) => {

        try {

            var [getContentValue] = await page.$x(selector)
            var contentMSG = await page.evaluate(el => el.value, getContentValue)
            return await contentMSG

        } catch (error) {
            throw new Error(`Cannot get text for selector:${selector}`)
        }
    },

    randomlySelect: async function (page, selector, ...ops) {
        try {

            var selectInput = await page.$x(selector)
            await selectInput[0].click(selector)
            let newItems = ops
            let newItem = newItems[Math.floor(Math.random() * newItems.length)]
            var selectInput2 = await page.$x(newItem)
            await selectInput2[0].click(newItem)

        } catch (error) {
            throw new Error(`Could not select a option: ${selector}`)
        }
    },

    validateMessage: async (selector) => {

        try {

            var [getContent] = await page.$x(selector)
            var contentMSG = await page.evaluate(el => el.textContent, getContent)
            return await contentMSG

        } catch (error) {
            throw new Error(`Cannot get text for selector:${selector}`)
        }
    },

    shouldExist: async function (page, selector) {
        try {
            await page.waitFor(() => !document.querySelector(selector))

        } catch (error) {

            throw new Error(`Selector :${selector} is visible, but should not be.`)
        }
    },
}









