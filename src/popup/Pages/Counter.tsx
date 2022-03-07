import React from 'react';
import { Visits } from '../../types';

// import { Container } from './styles';
interface Props { visits: Visits }


const Counter: React.FC<Props> = ({ visits }) => {
  return <div>
    <h1>{visits.length}</h1>
    <h4>You used stack overflow {visits.length} times today</h4>
  </div>
}

export default Counter;