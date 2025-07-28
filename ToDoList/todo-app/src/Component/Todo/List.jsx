import React, { useState } from 'react'
import Card from './Card'

const List = () => {
    // state
    const [todoList, setTodoList] = useState( [
        {"id" : "id-1", "name" : "할일 1", "status" : false},
        {"id" : "id-2", "name" : "할일 2", "status" : true},
        {"id" : "id-3", "name" : "할일 3", "status" : false},
        {"id" : "id-4", "name" : "할일 4", "status" : true},
        {"id" : "id-5", "name" : "할일 5", "status" : false},
    ]
);

    const onToggle = (todo) => { 
        const updateTodoList = todoList.map(item => 
            item.id == todo.id ? { ...item, status : !item.status } : item
        )
        setTodoList(updateTodoList)
    }
    

  return (
    <div className='todoList'>
        <ul>
            { 
                todoList.map( (todo) => (
                    <Card todo={todo} onToggle={onToggle}/>
                ))
            }
        </ul>
    </div>
  )
}

export default List