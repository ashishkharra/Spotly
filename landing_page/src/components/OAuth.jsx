import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../config/firebase";

const OAuth = ({ para, onOAuthData, role }) => {
  
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const authData = {
        fullName: result.user.displayName,
        email: result.user.email,
        role: role
      };
      onOAuthData(authData);

    } catch (err) {
      onOAuthData({ error : err.message });
      console.error(err);
    }
  };

  return (
    <button onClick={handleClick} className='bg-orange-600 text-white w-full px-4 py-2 rounded-lg mt-2' >{para ? 'Sign Up' : 'Sign In'} with Google</button>
  );
};

export default OAuth;