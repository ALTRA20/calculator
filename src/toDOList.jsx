import React, { useState } from 'react';
import './App.css';

function ToDoList() {
  const [itemsOri, setItemsOri] = useState([
    { text: 'Item 1', done: false },
    { text: 'Item 2', done: true },
    { text: 'Item 3', done: false },
  ]);
  const [items, setItems] = useState(itemsOri);

  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, { text: inputValue, done: false }]);
      setInputValue('');
    }
  };

  const toggleDone = (index) => {
    const updatedItems = [...items];
    updatedItems[index].done = !updatedItems[index].done;
    setItems(updatedItems);
  };

  const removeDoneItems = (index) => {
    const itemRemove = items[index];
    const itemsFiltered = items.filter((item, i) => i !== index);
    setItems(itemsFiltered);
  };

  const reStore = () => {
    if(items !== itemsOri){
      setItems(itemsOri);
    }
  }

  return (
    <div className="bg-sky-600 text-white p-6">
      <div className="flex justify-center">
        <div className="add flex gap-3">
          <input
            type="text"
            className="p-2 text-black rounded-md"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="p-2 bg-slate-950 rounded-md" onClick={addItem}>
            Tambah
          </button>
        </div>
      </div>
      <div className="">
        <ul>
          {items.map((item, index) => (
            <li className="bg-slate-950 p-3 my-2 flex justify-between items-center" key={index}>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  style={{ width: '20px', height: '20px' }}
                  checked={item.done}
                  onChange={() => toggleDone(index)}
                />
                <div className={'relative flex items-center'}>
                  <p className={item.done ? 'line-through' : ''}>{item.text}</p>
                  {item.done && <div className="w-full h-1 bg-white absolute"></div>}
                </div>
              </div>
                <div className="bg-red-600 py-2 px-3 cursor-pointer" onClick={() => removeDoneItems(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                    />
                  </svg>
                </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center w-full cursor-pointer" onClick={()=>reStore()}>regenerate</div>
      </div>
    </div>
  );
}

export default ToDoList;
