import classes from './Filter.module.css'
import { FC } from 'react';
import { Tabs, Tab, Button } from '@mui/material';

import { TMuiClickhandler } from '../../types';


interface FilterProps {
  value: number,
  onChange: TMuiClickhandler,
  onClick: () => void
}

const Filter: FC<FilterProps> = ({ value, onChange, onClick }) => {
  return (
    <div className={classes.filter}>
      <Tabs
        className={classes['task-select']}
        value={value}
        onChange={onChange}
        textColor="inherit"
      >
        <Tab label="Все задачи" id="simple-tabs-1"/>
        <Tab label="Активные" id="simple-tabs-2"/>
        <Tab label="Завершенные" id="simple-tabs-3"/>
      </Tabs>
      <Button onClick={onClick}>Удалить завершенные</Button>
    </div>
    
  )
}

export default Filter