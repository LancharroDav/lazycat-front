import Head from 'next/head'
import LogIn from '../components/login'
import SignUp from '../components/signup'
import { SlowMessage } from '../components/betaphase_alerts'
import Footer from '../components/footer'
import Header from '../components/header'

// const mainUrl = 'http://localhost:4000'
const mainUrl = 'https://devreturns-api.herokuapp.com'

export default function SignInUp() {

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>DevReturns</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-back flex flex-col w-full h-screen place-items-center space-y-8">
        <Header />
        <div className="flex flex-row space-x-24 place-items-center">
          <div class="bg-back rounded-lg">
            <LogIn mainUrl={mainUrl} />
          </div>
          <div class="bg-back rounded-lg">
            <SignUp mainUrl={mainUrl} />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
