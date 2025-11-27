import { useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import app from '../../../public/assets/JS/firebase'
import { authApi } from '../../APIs/postApi'
import { userAuth } from '../store/Store'
import { useToast } from '../Toast/ToastProvider'

const OAuth = ({ para }) => {
  const navigate = useNavigate();
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log('Google Sign In Result:', result);
       const authData = {
        full_name: result.user.displayName,
        email: result.user.email,
       }

      const res = await authApi.OAuthSignIn(authData);

      if (res.owner) {
        userAuth.getState().setUser(res.owner);
        showToast('Signed in successfully', "success");
        navigate('/dashboard')
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <button onClick={handleClick} className='bg-indigo-600 text-white w-full px-4 py-2 rounded-lg mt-2' >{loading ? 'Loading...' : (para ? 'Sign Up' : 'Sign In')} with Google</button>
  )
}

export default OAuth