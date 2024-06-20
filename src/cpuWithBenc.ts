import { readFileSync } from 'fs'
import { JSDOM } from 'jsdom'
import * as ss from 'simple-statistics'

interface CPUData {
  [key: string]: number
}

interface hrTexts {
  [cpuName: string]: CPUData
}

async function main() {
  const res = await fetch('https://browser.geekbench.com/processor-benchmarks', {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      'cache-control': 'max-age=0',
      'if-none-match': 'W/"485237ed7207e1eb3a9edf90b913f2a5"',
      'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      cookie:
        '_hjSessionUser_390387=eyJpZCI6IjgzYzFmNGRhLTVkMmQtNWI5Zi1iMzBhLTIzY2JmNDJjYmJjZCIsImNyZWF0ZWQiOjE3MTcyMzQ1NjE1MjQsImV4aXN0aW5nIjp0cnVlfQ==; _gid=GA1.2.2020233876.1717871778; _hjSession_390387=eyJpZCI6IjhmMjI4ZTFiLTY0NDktNDNlNC1hMDM4LWUwMjA5ZmQ0OWZiMyIsImMiOjE3MTc4NzE3Nzg3MDgsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _browse_session=XXOVWlBOD%2BpnL1ZbD15gnFixrUKh%2B6tXCzfXWCM527hxhgzyaHCljVsBqW5DbVxd%2B1vpXuo%2FCZAHtsNTNQGJ53Gcc8jmrW1EjPw%2BpRRQehZHCmPw0bxNxZ4Bkroro9o9ch0sY6Sx3e0ZtrniRe4%3D--HfBZxssgemqJ6zaZ--DNNXjlo09cq7JthA0FnOyg%3D%3D; _gat=1; _ga_NP04Y57Z6W=GS1.1.1717871778.5.1.1717872413.0.0.0; _ga=GA1.1.174890677.1717234561'
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET'
  })
  const html = await res.text()
  const dom = new JSDOM(html)
  const { document } = dom.window
  const processors: any[] = []
  const rows = document.querySelectorAll('#multi-core tbody tr')
  rows.forEach(row => {
    const cells = row.querySelectorAll('td a, td .description, td:nth-child(2)')
    const a = cells[2].textContent?.trim()
    const b = a !== undefined ? parseFloat(a) : 0
    const processor = {
      name: cells[0].textContent?.trim(),
      benchmark: b
    }
    processors.push(processor)
  })
  const hrText = readFileSync('./src/hr.json', 'utf-8')
  const hrTexts = JSON.parse(hrText)

  const removeZeros = (obj: hrTexts): hrTexts => {
    const newObj: hrTexts = {}

    for (const cpu in obj) {
      if (obj.hasOwnProperty(cpu)) {
        const data = obj[cpu]
        const newData: CPUData = {}

        for (const key in data) {
          if (data.hasOwnProperty(key) && data[key] !== 0)
            newData[key] = data[key]
        }

        newObj[cpu] = newData
      }
    }
    return newObj
  }
  let cleanedCPUs = removeZeros(hrTexts)
  cleanedCPUs = cleanKeys(cleanedCPUs)
  processors.forEach(benchmark => {
    const cpuName = Object.keys(cleanedCPUs).find(key => key.includes(benchmark.name))
    if (cpuName)
      cleanedCPUs[cpuName].benchmark = benchmark.benchmark
  })
  const filterByBench = filterByBenchmark(cleanedCPUs)

  const featureMatrix: number[] = []
  const targetVector: number[] = []

  for (const key in filterByBench) {
    if (filterByBench[key].hasOwnProperty('RandomX') && filterByBench[key].hasOwnProperty('benchmark')) {
      featureMatrix.push(filterByBench[key].RandomX)
      targetVector.push(filterByBench[key].benchmark)
    }
  }
  const linearRegression = ss.linearRegression(featureMatrix.map((x, i) => [x, targetVector[i]]))
  const linearRegressionLine = ss.linearRegressionLine(linearRegression)

  for (const key in filterByBench) {
    if (!filterByBench[key].hasOwnProperty('RandomX') && filterByBench[key].hasOwnProperty('benchmark')) {
      const predictedRandomX = linearRegressionLine(filterByBench[key].benchmark)
      filterByBench[key].RandomX = Math.round(predictedRandomX)
    }
  }
  console.log(filterByBench)
}

main()

type PerformanceData = {
  [key: string]: {}
}

function cleanKeys(obj: PerformanceData): PerformanceData {
  const cleanedCPUs: PerformanceData = {}

  for (const key in obj) {
    const cleanedKey = key.replace(/\(R\)/g, '').replace(/\(TM\)/g, '').trim()
    cleanedCPUs[cleanedKey] = obj[key]
  }
  return cleanedCPUs
}

type cpuInfo = {
  [key: string]: {
    [key: string]: number
  }
}

function filterByBenchmark(data: cpuInfo) {
  const result: cpuInfo = {}
  for (const key in data) {
    if (data[key].hasOwnProperty('benchmark'))
      result[key] = data[key]
  }
  return result
}
