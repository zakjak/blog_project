import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Button } from'flowbite-react'
import app from '../firebase'
import { FaGoogle } from 'react-icons/fa'

function Oauth() {
    const auth = getAuth(app)
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider()
        provider.getCustomParameters({prompt: 'select_account'})
        try{
            const { user } =await signInWithPopup(auth, provider)
            
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