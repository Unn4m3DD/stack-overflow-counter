import React, { useEffect, useState } from 'react';
import SpeedTest from '../Components/SpeedTest';

// import { Container } from './styles';


const Counter: React.FC = () => {
  const [visitCount, setVisitCount] = useState(0)
  useEffect(() => {
    chrome.storage.sync.get("visitCount", ({ visitCount }) => {
      setVisitCount(visitCount)
    })
  }, [])
  useEffect(() => {
    chrome.runtime.onMessage.addListener(({ incrementVisitCount }) => {
      if (incrementVisitCount)
        setVisitCount(e => e + 1)
    });
  }, [])

  return <div style={{ alignItems: "center", display: "flex", justifyContent: "center", flexDirection: "column", width: "100%", height: "100%" }}>
    <SpeedTest times={visitCount}></SpeedTest>
    <h1>{visitCount}</h1>
    <h4>You used stack overflow {visitCount} times today</h4>
  </div>
}

export default Counter;