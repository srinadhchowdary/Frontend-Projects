import { useState } from "react";
import "./App.css";
const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);

  const handler = (e) => {
    const value = e.target.value;
    setInput(value);

    try {
      setResult(eval(value));
    } catch {
      setResult("");
    }
  };

  const removeLastChar = () => {
    setInput((prev) => (prev.length > 0 ? prev.slice(0, -1) : prev));
    }

  return (
    <div className="calculator dark">
      <input type="text" value={input} onChange={handler} />
      <br />
      <button onClick={() => setResult(eval(input))}>=</button>
      <h4 className="result">Result is : {result}</h4>

      <div className="numbers">
        <button onClick={() => setInput(input + "1")}>1</button>
        <button onClick={() => setInput(input + "2")}>2</button>
        <button onClick={() => setInput(input + "3")}>3</button>
        <button className="operator" onClick={() => setInput(input + "+")}>+</button>
        <br />
        <button onClick={() => setInput(input + "4")}>4</button>
        <button onClick={() => setInput(input + "5")}>5</button>
        <button onClick={() => setInput(input + "6")}>6</button>
        <button className="operator" onClick={() => setInput(input + "-")}>-</button>
        <br />
        <button onClick={() => setInput(input + "7")}>7</button>
        <button onClick={() => setInput(input + "8")}>8</button>
        <button onClick={() => setInput(input + "9")}>9</button>
        <button className="operator" onClick={() => setInput(input + "*")}>*</button>
        <br />
        <button onClick={() => setInput(input + "0")}>0</button>
        <button onClick={() => setInput(input + ".")}>.</button>
        <button className="operator" onClick={() => setInput(input + "/")}>/</button>
        <button className="clear" onClick={() => setInput("")}>C</button>

        <button className="backspace" onClick={removeLastChar}>X</button>

      </div>
    </div>
  );
};

export default App;
