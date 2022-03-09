// Import the functions you need from the SDKs you need
import { arrayUnion, collection, doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Friend } from "./types";
import { auth, db } from './firebase-config';

export const getTodayTimestamp = () => {
  return new Date(new Date().toDateString()).getTime()
}

export const login = () => {
  const todayTimestamp = `${getTodayTimestamp()}`
  chrome.identity.getAuthToken({
    'interactive': true
  }, async (token) => {
    let credential = GoogleAuthProvider.credential(null, token)
    const { user } = await signInWithCredential(auth, credential)
    await setDoc(doc(db, "users", user.uid), { friends: [user.uid], name: user.displayName, image: user.photoURL });
    chrome.storage.sync.set({ visitCount: (await getDoc(doc(db, "users", user.uid))).data().visits?.[todayTimestamp] ?? 0 })
  })
}

chrome.runtime.onInstalled.addListener(() => { login() })

chrome.runtime.onStartup.addListener(() => { login() })

chrome.runtime.onMessage.addListener(
  ({ incrementVisitCount }, sender, sendResponse) => {
    if (incrementVisitCount)
      updateDoc(doc(db, "users", auth.currentUser.uid), {
        [`visits.${getTodayTimestamp()}`]: increment(1)
      })
  }
);


chrome.runtime.onMessage.addListener(
  async ({ addNewFriend }, sender, sendResponse) => {
    if (addNewFriend) {
      if (!auth.currentUser) return false
      updateDoc(doc(db, "users", auth.currentUser.uid), {
        "friends": arrayUnion(addNewFriend)
      })
    }
  }
);
