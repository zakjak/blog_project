import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Button } from'flowbite-react'
import app from '../firebase'
import { FaGoogle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInStart, signInFailure, signInSuccessful } from '../redux/user/userSlice'

function Oauth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider()
        provider.getCustomParameters({prompt: 'select_account'})
        try{
            const { user } = await signInWithPopup(auth, provider)

            console.log(user.email)

            const userInfo = {
                username: user.displayName,
                    profilePicture: user.photoURL,
                    email: user.email
            }
            
            const res= await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo)
            })

            const data = await res.json()
            console.log(data)
            if(res.ok){
                dispatch(signInSuccessful(data))
                navigate('/')
            }
        }catch(err){
            console.log(err)
        }
    }

  return (
    <Button onClick={handleGoogleSignIn}>
        <FaGoogle className='text-lg' />
    </Button>
  )
}

export default Oauth