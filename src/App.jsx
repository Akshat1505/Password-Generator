import { use } from "react";
import { useState } from "react";
import { useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumallowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");
  const passwordRef = useRef(null);

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#%^&*(){}[]";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPass(pass);
  }, [length, numAllowed, charAllowed, setPass]);

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  useEffect(() => {
    passwordGen();
  }, [length, numAllowed, charAllowed, passwordGen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-300 bg-gray-700 pt-2 pb-2">
        <h1 className="text-white text-center my-2">Password Generator</h1>
        <div className="flex-shadow rounded-lg overflow-hidden mb-4 py-2 pt-3">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPass}
            className="outline-none bg-blue-700 text-white px-4 py-1 my-0 shrink-0 "
          >
            copy
          </button>
          <div className="text-sm flex gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length : {length}</label>
            </div>
            <div className="flex items-center gap-x-1 ">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id="numinput"
                onChange={() => {
                  setNumallowed((prev) => !prev);
                }}
              />
              <label htmlFor="numinput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charinput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="charinput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
