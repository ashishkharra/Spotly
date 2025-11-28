import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import app from '../config/firebase'
// import { OAuthSignIn } from '../../APIs/postApis'
import { userAuth } from '../store/Store.jsx'

const OAuth = ({ para }) => {
  const setUser = userAuth((state) => state.setUser);
  const navigate = useNavigate();
  // const handleClick = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const auth = getAuth(app);
  //     const result = await signInWithPopup(auth, provider);
  //      const authData = {
  //       full_name: result.user.displayName,
  //       email: result.user.email,
  //      }

  //     const res = await OAuthSignIn(authData);

  //     if (res.data.user.id) {
  //       setUser(res.data?.user);
  //       navigate('/', {
  //         state: {
  //           showToast: true,
  //           message: `Successfully ${para ? 'signed up' : 'signed in'} with Google! Also, go to profile to update your phone number.`,
  //           type: 'success'
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     navigate('*', { 
  //       state: { 
  //         showToast: true, 
  //         message: error.response?.data?.message || 'Google authentication failed!', 
  //         type: 'error' 
  //       } 
  //     });
  //   }
  // };
  
  return (
    <button className='bg-orange-600 text-white w-full px-4 py-2 rounded-lg mt-2' >{para ? 'Sign Up' : 'Sign In'} with Google</button>
  )
}

export default OAuth