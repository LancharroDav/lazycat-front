import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const SignUp = (props) => {

  const router = useRouter()
  const [wrongCredentials, setWrongcredentials] = useState('')
  const [userEmail, setUseremail] = useState('')
  const [userPass, setUserpass] = useState('')
  const [passConfirm, setPassconfirm] = useState('')
  const [userUname, setUseruname] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post(`${props.mainUrl}/users`, {
      user: {
        email: userEmail,
        password: userPass,
        passwor_confirmation: passConfirm,
        username: userUname
      }},{
      withCredentials: true
      })
      .then(res => {
        if (res.status === 201) {
          router.push('/dashboard')
        }})
      .catch(error => {
        setWrongcredentials('Some fields are wrong!')
      })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-8 bg-aux bg-opacity-50 border-b-8 border-aux text-letters-dark rounded-lg">
      <div className="text-center pb-4">
        <h1 className="border-b border-letters-dark rounded-lg text-2xl">Registration</h1>
      </div>
      <div className="text-center text-remark">
        <span>{wrongCredentials}</span>
      </div>
      <div className="flex flex-col space-y-2 mb-2">
        <label>Email</label>
        <input type="email" onChange={event => setUseremail(event.target.value)} id="email" className="rounded-lg italic p-1 pl-2 focus:outline-none text-letters-dark bg-white" required />
      </div>
      <div className="flex flex-col space-y-2 mb-2">
        <label>Password</label>
        <input type="password" onChange={event => setUserpass(event.target.value)} className="rounded-lg italic p-1 pl-2 focus:outline-none text-letters-dark bg-white" required />            
      </div>
      <div className="flex flex-col space-y-2 mb-2">
        <label>Confirm Password</label>
        <input type="password" onChange={event => setPassconfirm(event.target.value)} className="rounded-lg italic p-1 pl-2 focus:outline-none text-letters-dark bg-white" required />            
      </div>
      <div className="flex flex-col space-y-2 mb-2">
        <label>Username</label>
        <input type="text" onChange={event => setUseruname(event.target.value)} className="rounded-lg italic p-1 pl-2 focus:outline-none text-letters-dark bg-white" required />            
      </div>
      <div>
        <input type="submit" value="Log in" className="p-2 px-6 mt-2 bg-aux rounded-lg cursor-pointer hover:bg-remark" />
      </div>
    </form>
  )
}

export default SignUp