import { useState } from 'react';
import './App.css'

function Item({id, name, count, onVisit, onDelete}) {

  return (
 <div 
    style={{margin: '8px'}} 
    className='each'>
    <span className='name'>{name}</span> <span className="count-back">{count}回</span>
    <button className="come" onClick={() => onVisit(id)} 
    style={{marginLeft: '28px'}}>
      来店
    </button> 
    <button onClick={() => onDelete(id)} className='delete'>
      この会員を削除
    </button>
</div> 
  );
}

export default Item;
