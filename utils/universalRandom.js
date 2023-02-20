const fs = require('fs')
const path = require('path')

export async function selectRandom(selector) {
  return await page.evaluate((selector) => {
    const elements = document.querySelectorAll(`${selector}:not([hidden]):not([aria-hidden='true'])`)
    const visibleElements = Array.from(elements).filter((element) => element.offsetWidth > 0 || element.offsetHeight > 0)

    let webResources = []
    visibleElements.forEach((element) => {
      webResources = webResources.concat(element.innerText.split('\n'))
    })

    let result = webResources[Math.floor(Math.random() * webResources.length)]
    while (result === "" || result === null) {
      result = webResources[Math.floor(Math.random() * webResources.length)]
    }

    const xpath = `//*[contains(text(), "${result}")]`
    return xpath
  }, selector)
}

export async function isInputVisible(id) {
  const elementHandle = await page.$(id)
  return elementHandle !== null
}

export async function uploadFile(page, selector, filePath) {

  const inputUploadHandle = await page.$(selector)

  const fileExist = await fs.promises.access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
  if (!fileExist) {
    throw new Error(`File not found: ${filePath}`)
  }

  await inputUploadHandle.uploadFile(filePath)

}

export async function scrollDownPage(page, percent) {

  const windowHeight = await page.evaluate(() => window.innerHeight)
  const scrollDistance = windowHeight * (percent / 100)
  let totalScrolled = 0
  while (totalScrolled < scrollDistance) {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight)
    })
    totalScrolled += windowHeight
    await page.waitForTimeout(100)
  }
}

export async function generateDateBirth() {

  const randomMillis = Math.floor(Math.random() * 365 * 70 * 24 * 60 * 60 * 1000);

  const data = new Date(Date.now() - randomMillis)
  const dia = data.getDate().toString().padStart(2, '0')
  const mes = (data.getMonth() + 1).toString().padStart(2, '0')
  const ano = data.getFullYear().toString()
  const dataNascimento = `${dia}/${mes}/${ano}`

  const regexData = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/((19|20)\d{2})$/
  if (!regexData.test(dataNascimento)) {
    return gerarDataNascimento()
  }

  return dataNascimento
}

export async function getElementText(page, elementXPath) {
  const element = await page.$x(elementXPath)

  if (element.length > 0) {
    return await page.evaluate(element => element.textContent, element[0])
  } else {
    console.log("Element not found:", elementXPath)
    return null
  }
}

// export async function uploadFile(page, selector, filePath) {

//   const inputUploadHandle = await page.$(selector)
//   const absolutePath = path.join(process.cwd(), filePath)

//   const fileExist = await fs.access(absolutePath, fs.constants.F_OK)
//     .then(() => true)
//     .catch(() => false)
//   if (!fileExist) {
//     throw new Error(`File not found: ${filePath}`)
//   }

//   await inputUploadHandle.uploadFile(absolutePath)
// }






