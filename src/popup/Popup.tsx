import React, { useState } from 'react';
import { Visits } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faHistory, faUser } from '@fortawesome/free-solid-svg-icons'

import './styles.scss';
import Friends from './Pages/Friends';
import Counter from './Pages/Counter';
import History from './Pages/History';

const Popup: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"counter" | "history" | "friends">("history")

  const [visits, setVisits] = useState<Visits>([]);
  chrome.storage.sync.get("visits", ({ visits }) => {
    if (!visits) visits = [];
    setVisits(visits)
  });
  console.log(visits)
  return <div className="container">
    {currentPage === "counter" && <Counter visits={visits}/>}
    {currentPage === "history" && <History visits={visits}/>}
    {currentPage === "friends" && <Friends/>}
    <div className="nav-bar">
      <div className={`nav-item ${currentPage === "counter" ? "selected" : ""}`} onClick={() => setCurrentPage("counter")}>
        <FontAwesomeIcon fontSize={25} icon={faArrowsRotate} />
      </div>
      <div className={`nav-item ${currentPage === "history" ? "selected" : ""}`} onClick={() => setCurrentPage("history")}>
        <FontAwesomeIcon fontSize={25} icon={faHistory} />
      </div>
      <div className={`nav-item ${currentPage === "friends" ? "selected" : ""}`} onClick={() => setCurrentPage("friends")}>
        <FontAwesomeIcon fontSize={25} icon={faUser} />
      </div>
    </div>
  </div>
}

export default Popup;