import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../../firebase-config';
import { Friend } from '../../types';
import { Button, Snackbar, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faPlus } from '@fortawesome/free-solid-svg-icons';


const Friends: React.FC = () => {
  const [copied, setCopied] = useState(false)
  const [newId, setNewId] = useState("")
  return <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", height: "100%" }}>
    <h3>Add a friend</h3>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <TextField value={newId} onChange={(e) => setNewId(e.target.value)} style={{ marginRight: 5 }} label="Friend ID" variant="outlined" />
      <Button variant="contained"
        onClick={() => {
          chrome.runtime.sendMessage({ addNewFriend: newId })
        }}
      ><FontAwesomeIcon icon={faPlus} fontSize={19} /></Button>
    </div>
    <h3>Share with a friend</h3>
    {auth.currentUser?.uid && <Button variant="contained"
      onClick={() => {
        navigator.clipboard.writeText(auth.currentUser.uid)
        setCopied(true)
      }}
    >{auth.currentUser.uid}&nbsp;<FontAwesomeIcon style={{ marginBottom: 5 }} icon={faClipboard} /></Button>
    }
    <Snackbar
      open={copied}
      autoHideDuration={3000}
      onClose={() => setCopied(false)}
      message="ID copied to clipboard"
    />
  </div >
}

export default Friends;