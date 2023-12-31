import styles from './index.module.scss'

type Respository = {
  stargazers_count: number
}
export default async function Page() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json: Respository = await res.json()

  const res2 = await fetch(
    'https://worldtimeapi.org/api/timezone/Europe/London',
    // { cache: 'no-store' }
    { next: { revalidate: 10 } }
  )
  const json2 = await res2.json()

  return (
    <>
      <h1 className={styles.hello}>Next stars: {json?.stargazers_count}</h1>
      <h1>Time: {json2?.datetime}</h1>
    </>
  )
}
