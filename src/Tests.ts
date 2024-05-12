console.log(reverseWord('sex in a big city'))
function reverseWord(a: any) {
  return a.split(' ').map((x: any) => x.split('').reverse().join('')).join(' ')
}

console.log(makeNegative(20))
function makeNegative(num: number): number {
  return (num <= 0) ? num : -num
}

console.log(past(1, 4, 2))
function past(h: number, m: number, s: number): number {
  return h * 36e5 + m * 6e4 + s * 1e3
}

console.log(busStops([[10, 0], [3, 5], [5, 8]]))
function busStops(key: any) {
  return key.reduce((sum: any, m: any) => sum + m[0] - m[1], 0)
}
