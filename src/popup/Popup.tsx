import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faChartBar, faChartColumn, faUser } from '@fortawesome/free-solid-svg-icons'

import Friends from './Pages/Friends';
import Counter from './Pages/Counter';
import { BottomNavigation, BottomNavigationAction, Button } from '@mui/material';
import Ranking from './Pages/Ranking';
import { auth } from '../firebase-config';
import { login } from '../background';
const Popup: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [_, forceUpdate] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 300)
    auth.onAuthStateChanged(({ }) => {
      setLoading(false)
    })
  })
  return <div style={{ height: "20rem", width: "20rem", display: "flex", flexDirection: "column" }}>
    <div style={{ height: "16rem", width: "20rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {!loading && <>
        {
          auth.currentUser && <>
            {currentPage === 0 && <Counter />}
            {currentPage === 1 && <Ranking />}
            {currentPage === 2 && <Friends />}
          </>
        }
        {!auth.currentUser && <Button
          onClick={() => { login(true) }}
          variant="outlined"
        >
          Log in
        </Button>}
      </>}
    </div>
    <BottomNavigation
      showLabels
      value={currentPage}
      onChange={(currentPage, newValue) => {
        setCurrentPage(newValue);
      }}
    >
      <BottomNavigationAction style={{ padding: 30 }} label="Counter" icon={<FontAwesomeIcon style={{ marginBottom: 9 }} fontSize={25} icon={faArrowsRotate} />} />
      <BottomNavigationAction style={{ padding: 30 }} label="Ranking" icon={<FontAwesomeIcon style={{ marginBottom: 9 }} fontSize={25} icon={faChartColumn} />} />
      <BottomNavigationAction style={{ padding: 30 }} label="Friends" icon={<FontAwesomeIcon style={{ marginBottom: 9 }} fontSize={25} icon={faUser} />} />
    </BottomNavigation>
  </div>
}

export default Popup;