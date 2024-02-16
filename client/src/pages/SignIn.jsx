import { Label, TextInput, Button } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signInStart, signInSuccessful, signInFailure } from '../redux/user/userSlice'
import Oauth from '../components/Oauth'
import axios from 'axios'

function SignIn() {
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            dispatch(signInStart())
            const res = await axios.post('https://blog96.onrender.com/api/auth/signin', {
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(userData)
            })
    
            const data = await res.json()
            if(!res.ok){
                dispatch(signInFailure(data.message))
                return
            }else{
                navigate('/')
                setUserData({})
                setError(null)
                dispatch(signInSuccessful(data))
            }
        }catch(err){
            console.log(err)
        }
    }

  return (
        <form onSubmit={handleSubmit} className='min-h-screen w-full flex flex-col items-center justify-center'>
            <div className="w-[35%] p-4 shadow-md bg-gray-800 rounded-lg flex flex-col mb-[10rem] gap-4">
                <h1 className='text-center text-3xl'>Sign In</h1>
                <div className="flex flex-col gap-4">
                    <Label htmlFor='email' value='Your email:' />
                    <TextInput onChange={handleChange} type='email' id='email' placeholder='name@example.com' required />
                    <Label htmlFor='password' value='Your password:' />
                    <TextInput onChange={handleChange} type='password' id='password'  required />
                    <Button  type='submit'>Login</Button>
                    <span className='text-gray-400 text-sm'>Don't have an account? <Link to='/sign-up' className='text-lg hover:underline text-white'>Sign up</Link></span>
                    <span className='text-center'>or sign in with</span>
                    <Oauth />
                </div>
            </div>
        </form>
  )
}

export default SignIn