import React, { useRef } from 'react';
import { auth } from '../../firebase-connection';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

const Friends: React.FC = () => {
  const loginContainer = useRef<HTMLDivElement>(null)
  return <div ref={loginContainer}>
    {!auth.currentUser && <div>
      <h2>Sign in to share and see your friends numbers</h2>
      <button
        onClick={() => {
          chrome.identity.getAuthToken({}, (token) => {
            let credential = GoogleAuthProvider.credential(null, token)
            signInWithCredential(auth, credential)
              .then((userCredential) => {
                const user = auth.currentUser
              })
              .catch((error: any) => {
                console.error(error)
              })
          })
        }}
      >Sign Up</button>
      <button>Sign In</button>
    </div>}
  </div>
}

export default Friends;