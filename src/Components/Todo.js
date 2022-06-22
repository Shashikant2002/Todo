import React, { useEffect, useState } from 'react'


const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [togelBtn, settogelBth] = useState(false);


  const addItem = () => {
    if (!inputData) {
      alert("Please Fill The Data");
    }
    else if(inputData && togelBtn){
      setItems(items.map((curEle) => {
        if(curEle.id === isEditItem){
          return{...curEle, name: inputData}
        }
        return curEle; 
      }))
      setInputData("");
    setIsEditItem(null);
    settogelBth(false);
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items, myNewInputData]); 
      setInputData("");
    }
  }

  const deleteItem = (index) => {
    const updatedItem = items.filter((curEle) => {
      return curEle.id !== index;
    });
    setItems(updatedItem);
  }

  const editItem = (index) => {
    const item_edited = items.find((curEle) => {
      return curEle.id === index;
    });
    setInputData(item_edited.name);
    setIsEditItem(index);
    settogelBth(true);
  }

  const clearAll = () => {
    setItems([]);
  }

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items))
  }, [items]);

  return (
    <>
      <div className="main_div">
        <div className="box_Todo">
          <h1>👍👍Add Your List👌👌</h1>
          <div className="add_Item">
            <input className='write_note' value={inputData} onChange={(event) => setInputData(event.target.value)} type="text" placeholder='Write a Note✍️✍️' />
          </div>
          <div className="buttons">
            {togelBtn ? 
            <p className='add_note' onClick={addItem}>✍️Edit Note✍️</p> : 
            <p className='add_note' onClick={addItem}>👍Add Note👍</p>}
            {console.log(togelBtn)}
          </div>
          <div className="Notes_here">
            {
              items.map((curEle) => {
                return (
                  <div className="items" key={curEle.id}> 
                    <p>{curEle.name}</p>
                    <div className="button">
                      <p className='delete_note' onClick={() => deleteItem(curEle.id)}>😋Delete Note😋</p>
                      <p className='edit_note' onClick={() => editItem(curEle.id)}>👍Edit Note👍</p>
                    </div>
                  </div>
                )
              })
            }

          </div>
          <div  className="clear_all">
            <p className='Clear_btn' onClick={clearAll}>Clear All</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
