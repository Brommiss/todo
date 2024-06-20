// import { JSDOM } from 'jsdom'
//
// const url = 'https://www.intel.com/content/www/us/en/products/details/processors/core/i3/products.html'
//
// async function parseIntelProcessors(url: string): Promise<any[]> {
//   try {
//     const response = await fetch(url)
//     const html = await response.text()
//     const dom = new JSDOM(html)
//
//     const processorNames = dom.window.document.querySelectorAll('tr td a')
//     // const processorFrequencies = dom.window.document.querySelectorAll('.table tr td:nth-child(4)')
//     // const processorCores = dom.window.document.querySelectorAll('.processor-cores')
//     // const processorL1Caches = dom.window.document.querySelectorAll('.processor-l1-cache')
//     // const processorL2Caches = dom.window.document.querySelectorAll('.processor-l2-cache')
//     // const processorL3Caches = dom.window.document.querySelectorAll('.processor-l3-cache')
//     const processors = []
//     for (let i = 0; i < processorNames.length; i++) {
//       const processor = {
//         name: cleanAndExtractText(processorNames[i].textContent.trim()),
//         frequency: parseFloat(processorNames[i].textContent.substr(-9, 3).trim())
//         // frequency: parseFloat(processorFrequencies[i].textContent.replace(/[^0-9, .]/g, '').trim() ?? 0)
//         // cores: processorCores[i].textContent.trim(),
//         // l1Cache: processorL1Caches[i].textContent.trim(),
//         // l2Cache: processorL2Caches[i].textContent.trim(),
//         // l3Cache: processorL3Caches[i].textContent.trim()
//       }
//       processors.push(processor)
//     }
//
//     return processors
//   } catch (error) {
//     console.error('Error parsing Intel processors:', error)
//     return []
//   }
// }
//
// parseIntelProcessors(url)
//   .then(processors => {
//     console.log(processors)
//   })
//   .catch(error => {
//     console.error('Error parsing Intel processors:', error)
//   })
//
// function cleanAndExtractText(input: string): string {
//   const cleanedInput = input.replace(/®|™/g, '')
//   const index = cleanedInput.indexOf('Proc')
//   if (index !== -1)
//     return cleanedInput.substring(0, index).trim()
//   return cleanedInput.trim()
// }
