import { useState } from 'react'

import { TMuiClickhandler } from '../types';

type TUseFilter = (initialValue: number) => {
  filter: number,
  toggleFilter: TMuiClickhandler
}

export const useFilter: TUseFilter = (initialValue) => {
  const [ filter, setFilter ] = useState(initialValue);
  const toggleFilter: TMuiClickhandler = ( event, newFilter) => { 
    setFilter(newFilter); 
  };
  return {
    filter,
    toggleFilter
  }
}
