import * as fs from 'fs'
import { JSDOM } from 'jsdom'

function readLocalHTMLFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err)
        reject(err)
      else
        resolve(data)
    })
  })
}

async function parseHTML(filePath: string): Promise<any[]> {
  try {
    const html = await readLocalHTMLFile(filePath)
    const dom = new JSDOM(html)
    const { document } = dom.window

    const rows = document.querySelectorAll('.big-table tr')

    const processors: any[] = []

    rows.forEach(row => {
      const cells = row.querySelectorAll('td:nth-child(3), td:nth-child(11), td:nth-child(9), td:nth-child(5)')
      const processor = {
        name: cells[0].textContent?.trim().replace('\n', '').replace(/ +/g, ' '),
        cores: parseFloat(cells[3].textContent.trim().replace(/\/.*/, '')),
        minFreq: parseFloat(removeTextAfterHyphen(cells[2].textContent)) / 1000,
        maxFreq: parseFloat(removeTextBeforeHyphen(cells[2].textContent)) / 1000,
        l2cash: parseFloat(removeTextAfterCash(cells[1].textContent.trim())),
        l3cash: parseFloat(removeTextBeforeCash(cells[1].textContent.trim()))
      }
      processors.push(processor)
    })

    return processors
  } catch (error) {
    console.error('Error parsing HTML:', error)
    return []
  }
}

const filePath = 'spisok.html'
parseHTML(filePath)
  .then(processors => {
    console.log(processors)
  })
  .catch(error => {
    console.error('Error:', error)
  })

function removeTextAfterHyphen(input: string): string {
  const index = input.indexOf('‑')
  if (index !== -1)
    return input.substring(0, index).trim()
  return '0'
}

function removeTextBeforeHyphen(input: string): string {
  const index = input.indexOf('‑')
  if (index !== -1)
    return input.substring(index + 1).trim()
  return '0'
}

function removeTextAfterCash(input: string): string {
  const index = input.indexOf('M')
  if (index !== -1)
    return input.substring(0, index).trim()
  return '0'
}

function removeTextBeforeCash(input: string): string {
  const index = input.indexOf('+')
  const indexMB = input.indexOf('M')
  if (index !== -1 && indexMB !== -1)
    return input.substring(index + 1).trim()
  return '0'
}
