import { Alert, Button, Label, TextInput } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { useState } from 'react'



function SignUp() {
    
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify(userData)
            })
    
            const data = await res.json()
            if(!res.ok){
                setError(data.message)
                return
            }else{
                navigate('/sign-in')
                setUserData({})
                setError(null)
            }
        }catch(err){
            console.log(err)
        }
    }

    

  return (
        <form className='min-h-screen w-full flex flex-col items-center justify-center' onSubmit={handleSubmit}>
            <div className="w-[35%] p-4 shadow-md bg-gray-800 rounded-lg flex flex-col gap-4">
                <h1 className='text-center text-3xl'>Sign Up</h1>
                <div className="flex flex-col gap-4">
                    <Label htmlFor='username' value='Your username:' />
                    <TextInput onChange={handleChange} type='text' id='username' placeholder='Enter name' required />
                    <Label  htmlFor='email' value='Your email:' />
                    <TextInput onChange={handleChange} type='email' id='email' placeholder='name@example.com' required />
                    <Label htmlFor='password' value='Your password:' />
                    <TextInput onChange={handleChange} type='password' id='password'  required />
                    {error && <Alert color='failure'>{error}</Alert>}
                    <Button type='submit'>Sign up</Button>
                    <span className='text-gray-400 text-sm'>Do you have an account? <Link to='/sign-in' className='text-lg hover:underline text-white'>Sign in</Link></span>
                    <span className='text-center'>or sign up with</span>
                </div>
            </div>
        </form>
  )
}

export default SignUp