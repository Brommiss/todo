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

console.log(getCount('abrac aAdabra'))
function getCount(str: any): number {
  str = str.toLowerCase().split('')
  const gl = 'aeoui'
  return str.reduce((sum: number, val: string) => {
    if (gl.indexOf(val) !== -1)
      sum++
    return sum
  }, 0)
}

console.log(highAndLow('8 3 -5 42 -1 0 0 -9 4 7 4 -4'))
function highAndLow(numbers: string) {
  const num = numbers.split(' ').map(Number)
  const max = Math.max.apply(null, num)
  const min = Math.min.apply(null, num)
  return `${max} ${min}`
}

console.log(upper('How can mirrors be real if our eyes aren\'t real'))
function upper(text?: string) {
  return text
    ?.split(' ')
    .map(x => x[0].toUpperCase() + x.slice(1))
    .join(' ')
}
