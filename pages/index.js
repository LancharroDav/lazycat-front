import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SlowMessage } from '../components/betaphase_alerts'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../components/footer'
import Header from '../components/header'

const mainUrl = 'http://localhost:4000/api/v1'

export default function LandingPage() {

  const router = useRouter()
  const [bounceButton, setBouncebutton] = useState('')
  const [showSlowmessage, setShowslowmessage] = useState(false)

  const CheckAuth = (e) => {
    e.preventDefault()
    setShowslowmessage(true)
    setBouncebutton('animate-pulse')

    axios.get(`${mainUrl}/checks.json`, {
      withCredentials: true
    })
    .then(res => {
      if (res.status === 200) {
        router.push('/dashboard')}
      else {
        router.push('/sign_in_up')
      }
    })
    .catch(error => {
      router.push('/sign_in_up')
    })
  }

  return (
    <div className="">
      <Head>
        <title>DevReturns</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-back flex flex-col space-y-6 w-full h-screen">
        <Header />
        <div className="flex flex-row justify-around w-full">
          <div className="flex-col flex space-y-4 text-4xl text-aux bg-main w-96 p-12 rounded-lg border-b-8 border-aux shadow-lg">
            <div className="flex-row flex space-x-4">
              <p>Make it </p>
              <p class="text-remark">easy!</p>
            </div>
            <div className="flex-row flex space-x-4">
              <p>Make it </p>
              <p class="text-remark">simple!</p>
            </div>
            <div className="text-lg">
              <p>
                Easy-to-use Bookmark manager where you can setup your own presets 
                to open many links in one click, saving time to start your journey.
              </p>
            </div>
            <div className="">
              <button onClick={CheckAuth} className="bg-aux text-main text-xl w-1/2 rounded-lg py-1 hover:bg-remark focus:bg-remark">
                Start
              </button>
            </div>
          </div>
          <div className="border-8 border-aux rounded-lg flex w-1/2">
            <img src="/screenshot-dashboard.png" alt="dashboard" className=""/>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
