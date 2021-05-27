import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Head>
        <title>Whatsapp clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-cyan-300 bg-gradient-to-r from-emerald-500 to-purple-300">whatsapp clone</h3>
    </div>
  )
}
