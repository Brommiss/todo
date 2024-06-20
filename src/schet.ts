// import { JSDOM } from 'jsdom'
// //
// // import { dot, inv, multiply, transpose } from 'mathjs'
// //
// // function linearRegression(featureMatrix: number[][], targetVector: number[]): (features: number[]) => number {
// //   const transposedFeatureMatrix = transpose(featureMatrix)
// //   const productOfTransposedAndFeatureMatrix = multiply(transposedFeatureMatrix, featureMatrix)
// //   const inverseOfProductMatrix = inv(productOfTransposedAndFeatureMatrix)
// //   const productOfTransposedAndTargetVector = multiply(transposedFeatureMatrix, targetVector)
// //   const weights = multiply(inverseOfProductMatrix, productOfTransposedAndTargetVector)
// //
// //   return (features: number[]) => dot(weights, features)
// // }
// //
// // // Example usage:
// // const featureMatrix = [
// //   [6, 2.60, 12],
// //   [6, 4.1, 12],
// //   [8, 1.7, 6],
// //   [12, 2.1, 25]
// // ]
// // const targetVector = [4830, 5640, 1840, 5260]
// //
// // const predict = linearRegression(featureMatrix, targetVector)
// // const prediction = predict([8, 2.9, 16]) // Example prediction
// //
// // console.log(prediction) // Output the prediction for the input [1, 4]
// //
// // const izvCp = {
// //   name: 'Intel Core i5-11400',
// //   cpu: 6,
// //   baseFrequency: 2.60, // GHz
// //   cache: 12 // MB
// // }
// //
// // const cpOnMine = {
// //   name: 'Intel Core i5-11400',
// //   namehash: 'Zephyr',
// //   hashrate: 4830 // h/s
// // }
// //
// // const hashrate = 4830
// // const cpu = 12
// // const quency = 2.60
// // const cache = 12
// //
// // const oneHash = Math.round(hashrate / cpu / quency / cache) // Хэши на 1 ядро, 1 ггц, 1 мб проца
// //
// // console.log(oneHash)
//
// fetch('https://browser.geekbench.com/processor-benchmarks', {
//   headers: {
//     accept:
//       'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
//     'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
//     'cache-control': 'max-age=0',
//     'if-none-match': 'W/"166b3af9b7b85d518f052875b3f69c18"',
//     'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
//     'sec-ch-ua-mobile': '?0',
//     'sec-ch-ua-platform': '"Windows"',
//     'sec-fetch-dest': 'document',
//     'sec-fetch-mode': 'navigate',
//     'sec-fetch-site': 'none',
//     'sec-fetch-user': '?1',
//     'upgrade-insecure-requests': '1',
//     cookie:
//       '_gid=GA1.2.1325520944.1717234561; _hjSession_390387=eyJpZCI6ImRmY2Q1MzVjLTMzZjQtNGZjZS1hYzJjLTA0OWRiNTlkZDg4MCIsImMiOjE3MTcyMzQ1NjE1MjUsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MX0=; _hjSessionUser_390387=eyJpZCI6IjgzYzFmNGRhLTVkMmQtNWI5Zi1iMzBhLTIzY2JmNDJjYmJjZCIsImNyZWF0ZWQiOjE3MTcyMzQ1NjE1MjQsImV4aXN0aW5nIjp0cnVlfQ==; _browse_session=D8s6HulhQ7z43HKRJ4wQ%2BAObR6jOgLlkQ%2BiXQYtGTpsPM0FsLxmzJbYOpkSzzvoNuR90ATaxdk0ozvyyf%2FseSZ9d56HDckc1AxOXKMmc6dWkHePKL3EuSt31MStTd1I9wMPRetQjbP2NbT8u1XQ%3D--W715%2BRbjT%2FuKcsxK--wthOjAT96bc1p8fUaH0NtA%3D%3D; _ga_NP04Y57Z6W=GS1.1.1717234561.1.1.1717235003.0.0.0; _ga=GA1.1.174890677.1717234561'
//   },
//   referrerPolicy: 'strict-origin-when-cross-origin',
//   body: null,
//   method: 'GET'
// }).then(res => res.text()).then(html => {
//   const dom = new JSDOM(html)
//   const { document } = dom.window
//   const cpuNameElements = document.querySelectorAll('table.benchmark-chart-table tr td:nth-child(1) a')
//   const benchmarkScoreElements = document.querySelectorAll('table.benchmark-chart-table tr td:nth-child(2)')
//   const cpuNames = Array.from(cpuNameElements).map(element => element.textContent?.trim())
//   const benchmarkScores = Array.from(benchmarkScoreElements).map(element => element.textContent?.trim())
//   const all = cpuNames.map((name, i) => ({
//     name,
//     score: parseFloat(benchmarkScores[i] ?? 0)
//   }))
//   console.log(all)
// })
//
// type CPUInfo = {
//   [key: string]: {
//     [key: string]: number
//   }
// }
//
// const cpuData: CPUInfo = {
//   'Intel Core i7-6700 CPU @ 3.40GHz': {
//     GhostRider: 541,
//     RandomX: 2800,
//     benchmark: 4151
//   },
//   'Intel Core i7-7700K CPU @ 4.20GHz': {
//     GhostRider: 291,
//     RandomX: 790,
//     VerusHash: 8550000,
//     benchmark: 4462
//   },
//   'Intel Core i7-8700K CPU @ 3.70GHz': {
//     GhostRider: 778,
//     RandomX: 5790,
//     benchmark: 1564
//   },
//   'Intel Core i9-10900K CPU @ 3.70GHz': {
//     GhostRider: 1340,
//     RandomX: 10000,
//     benchmark: 8460
//   },
//   'Intel Xeon CPU E5-2680 v3 @ 2.50GHz': {
//     RandomX: 6650,
//     benchmark: 3310
//   }
// }
//
// // Extract featureMatrix and targetVector
// const featureMatrix: number[] = []
// const targetVector: number[] = []
//
// for (const key in cpuData) {
//   if (cpuData[key].hasOwnProperty('RandomX') && cpuData[key].hasOwnProperty('benchmark')) {
//     featureMatrix.push(cpuData[key].RandomX)
//     targetVector.push(cpuData[key].benchmark)
//   }
// }
//
// // Perform linear regression
// const linearRegression = ss.linearRegression(featureMatrix.map((x, i) => [x, targetVector[i]]))
// const linearRegressionLine = ss.linearRegressionLine(linearRegression)
//
// console.log('Slope:', linearRegression.m)
// console.log('Intercept:', linearRegression.b)
//
// // Predict values
// const predictions = featureMatrix.map(x => linearRegressionLine(x))
// console.log('Predictions:', predictions)
