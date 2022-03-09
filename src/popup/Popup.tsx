import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faChartBar, faChartColumn, faUser } from '@fortawesome/free-solid-svg-icons'

import Friends from './Pages/Friends';
import Counter from './Pages/Counter';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import Ranking from './Pages/Ranking';
import { auth } from '../firebase-config';
import { login } from '../background';
const Popup: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)

  if (!auth.currentUser) login()

  return <div style={{ height: "20rem", width: "20rem", display: "flex", flexDirection: "column" }}>
    <div style={{ height: "16rem", width: "20rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {currentPage === 0 && <Counter />}
      {currentPage === 1 && <Ranking />}
      {currentPage === 2 && <Friends />}
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