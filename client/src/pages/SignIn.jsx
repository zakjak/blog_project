import { Button, Label, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'

function SignIn() {
  return (
        <form className='min-h-screen w-full flex flex-col items-center justify-center'>
            <div className="w-[35%] p-4 shadow-md bg-gray-800 rounded-lg flex flex-col mb-[10rem] gap-4">
                <h1 className='text-center text-3xl'>Sign In</h1>
                <div className="flex flex-col gap-4">
                    <Label htmlFor='email' value='Your email:' />
                    <TextInput type='email' id='email' placeholder='name@example.com' required />
                    <Label htmlFor='password' value='Your password:' />
                    <TextInput type='password' id='password'  required />
                    <Button type='submit'>Login</Button>
                    <span className='text-gray-400 text-sm'>Don't have an account? <Link to='/sign-up' className='text-lg hover:underline text-white'>Sign up</Link></span>
                    <span className='text-center'>or sign up with</span>
                    <Button>
                        <FaGoogle className='text-lg' />
                    </Button>
                </div>
            </div>
        </form>
  )
}

export default SignIn