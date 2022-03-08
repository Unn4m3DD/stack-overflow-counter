import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faChartBar, faChartColumn, faUser } from '@fortawesome/free-solid-svg-icons'

import Friends from './Pages/Friends';
import Counter from './Pages/Counter';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
const Popup: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)

  return <div style={{ height: "20rem", width: "20rem", display: "flex", flexDirection: "column" }}>
    <div style={{ height: "17rem", width: "20rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {currentPage === 0 && <Counter />}
      {currentPage === 2 && <Friends />}
    </div>
    <BottomNavigation
      showLabels
      style={{ height: "3rem" }}
      value={currentPage}
      onChange={(currentPage, newValue) => {
        setCurrentPage(newValue);
      }}
    >
      <BottomNavigationAction label="Counter" icon={<FontAwesomeIcon style={{ marginBottom: 9 }} fontSize={25} icon={faArrowsRotate} />} />
      <BottomNavigationAction label="Ranking" icon={<FontAwesomeIcon style={{ marginBottom: 9 }} fontSize={25} icon={faChartColumn} />} />
      <BottomNavigationAction label="Friends" icon={<FontAwesomeIcon style={{ marginBottom: 9 }} fontSize={25} icon={faUser} />} />
    </BottomNavigation>
  </div>
}

export default Popup;