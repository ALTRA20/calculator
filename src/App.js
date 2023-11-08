import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [onScreen, setOnScreen] = useState(true);
  const [screens, setScreens] = useState(["0"]);
  const [keyboard, setKeyboard] = useState([
    "1", "2", "3", "+",
    "4", "5", "6", "-",
    "7", "8", "9", "x",
    "0", "clear", "delete", "/"
  ]);

  const removeValue = (clear) => {
    if (clear) {
      setScreens(["0"]);
    } else {
      const lastScreen = screens[screens.length - 1];
      if (lastScreen !== "=") {
        const updatedScreen = lastScreen.slice(0, -1);
        if (updatedScreen === "") {
          const updatedScreens = screens.slice(0, -1);
          if (updatedScreens.length === 0) {
            updatedScreens.push("0");
          }
          setScreens(updatedScreens);
        } else {
          setScreens([...screens.slice(0, -1), updatedScreen]);
        }
      }
    }
  };
  

  const addValue = (value) => {
    if (value !== "delete" && value !== "clear") {
      if (screens.length === 1 && screens[0] === "0") {
        if (!isNaN(value)) {
          setScreens([value]);
        }
      } else if (screens[screens.length - 1] === "=") {
        setScreens([value]);
      } else {
        // Tambahkan digit ke bilangan terakhir jika bilangan terakhir adalah angka
        if (!isNaN(value) && !isNaN(screens[screens.length - 1])) {
          setScreens([...screens.slice(0, -1), screens[screens.length - 1] + value]);
        } else {
          if (isNaN(screens[screens.length - 1]) !== isNaN(value)) {
            setScreens([...screens, value]);
          }
        }
      }
    } else if (value === "clear") {
      removeValue(true);
    } else if (value === "delete") {
      removeValue(false);
    } else if (value === "=") {
      calculateResult();
    }
  }

  const calculateResult = () => {
    const expression = screens.join('');
    try {
      const result = eval(expression);
      // return '='+result;
      setScreens([...screens, '=', result]);
    } catch (error) {
      setScreens(["Error"]);
    }
  }
  const hasil = () => {
    let result = 0; // Ubah ke 0 agar operasi perkalian berfungsi dengan benar
    let operation = null; // Inisialisasi operasi dengan null

    screens.forEach((screen) => {
      if (!isNaN(screen)) {
        if (operation === 'x') {
          operation = '*';
        }
        if (operation === '+') {
          result += parseFloat(screen);
        } else if (operation === '-') {
          result -= parseFloat(screen);
        } else if (operation === '*') {
          result *= parseFloat(screen);
        } else if (operation === '/') {
          result /= parseFloat(screen);
        } else {
          result = parseFloat(screen);
        }
      } else {
        operation = screen; // Simpan operasi yang ditemukan
      }
    });

    return '=' + result;
  }

  return (
    <div className="flex justify-center h-screen p-4 no-select relative">
      <div className="absolute top-10 bottom-0 left-0 right-0 flex justify-end pe-16 ">
        <div className="cursor-pointer" onClick={()=>setOnScreen(!onScreen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
              <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
          </svg>
        </div>
      </div>
      {onScreen ? (
        <div className="border bg-sky-600 rounded-xl main p-4">
          <div className="p-4 bg-white rounded-xl screen flex flex-col items-end relative">
            <div className="flex flex-wrap h-4/5">
              {screens.map((screen, index) => (
                <h4 className="text-5xl" key={index}>{screen}</h4>
              ))}
            </div>
            <h5 className="text-2xl">{hasil()}</h5>
            <div className="absolute w-full h-full flex top-0 right-0 justify-center items-center text-3xl opacity-40 font-black uppercase ">©ALTRA20</div>
          </div>
          <div className="flex flex-wrap keyboard pt-4">
            {keyboard.map((item, index) => (
              <div key={index} className="w-1/4 h-1/4 border border-4 flex justify-center items-center text-white hover-bg-sky-800 cursor-pointer" onClick={() => addValue(item)}>
                <h5 className="">{item}</h5>
              </div>
            ))}
          </div>
        </div>
      ) : null }
    </div>
  );
}

export default App;