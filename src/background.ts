// Import the functions you need from the SDKs you need
import { arrayUnion, collection, doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Friend } from "./types";
import { auth, db } from './firebase-config';

const getTodayTimestamp = () => {
  return new Date(new Date().toDateString()).getTime()
}

const login = () => {
  const todayTimestamp = `${getTodayTimestamp()}`
  chrome.identity.getAuthToken({}, async (token) => {
    let credential = GoogleAuthProvider.credential(null, token)
    const { user, operationType } = await signInWithCredential(auth, credential)
    if (operationType === "link")
      await setDoc(doc(db, "users", user.uid), { friends: [user.uid], name: user.displayName, image: user.photoURL });
    else
      chrome.storage.sync.set({ visitCount: (await getDoc(doc(db, "users", user.uid))).data().visits[todayTimestamp] })
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
  async (request, sender, sendResponse) => {
    if (request === "getFriendStats") {
      if (!auth.currentUser) return
      const friendList: string[] = await (await getDoc(doc(db, "users", auth.currentUser.uid))).data().friends
      const newFriends: Friend[] = []
      for (let friendId of friendList)
        newFriends.push((await getDoc(doc(db, "users", friendId))).data() as Friend)
      sendResponse(newFriends)
    }
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
