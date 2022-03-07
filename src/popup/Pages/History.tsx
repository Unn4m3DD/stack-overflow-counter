import React from 'react';
import { Visits } from '../../types';
interface Props { visits: Visits }

const History: React.FC<Props> = ({ visits }) => {
  return <div>
    <ul>
      {visits.map((e) => <li key={e.timestamp.toString()}>
        <a href={e.url} target="_blank">{e.url.split(/questions\/[0-9]+\//)[1]}</a>
      </li>)}
    </ul>
  </div>
}

export default History;