// 随机数整数 0-9
export function rand() {
  return Math.floor(Math.random() * 9)
}

// 随机整数字符串
export function randStr(num: number) {
  let str = ''
  for (let i = 0; i < num; i++) {
    str += rand()
  }
  return str
}
