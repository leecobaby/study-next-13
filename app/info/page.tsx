type Respository = {
  stargazers_count: number
}
export default async function Page() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json: Respository = await res.json()

  const res2 = await fetch(
    'https://worldtimeapi.org/api/timezone/Europe/London',
    // { cache: 'no-store' }
    { next: { revalidate: 5 } }
  )
  const json2 = await res2.json()

  await Timer(10)

  return (
    <>
      <h1>Next stars: {json?.stargazers_count}</h1>
      <h1>Time: {json2?.datetime}</h1>
    </>
  )
}

// 返回一个 promise
function Timer(m: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello')
    }, m * 1000)
  })
}
