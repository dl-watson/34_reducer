import React, { useState, useReducer } from "react";

const reducer = () => {};

const useRecord = (init) => {
  const [before, setBefore] = useState([]);
  const [current, setCurrent] = useState(init);
  const [after, setAfter] = useState([]);

  const [state, dispatch] = useReducer(reducer, {
    before: [],
    current: init,
    after: [],
  });

  const undo = () => {
    setAfter((after) => [current, ...after]);
    setCurrent(before[before.length - 1]);
    setBefore((before) => before.slice(0, -1));
  };

  const redo = () => {
    setBefore((before) => [...before, current]);
    setCurrent(after[0]);
    setAfter((after) => after.slice(1));
  };

  const record = (val) => {
    setBefore((before) => [...before, current]);
    setCurrent(val);
  };

  return {
    undo,
    record,
    redo,
    current,
  };
};

const App = () => {
  const { current, undo, redo, record } = useRecord("#FF0000");

  return (
    <>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
      <input
        type="color"
        data-testid="color-input"
        value={current}
        onChange={({ target }) => record(target.value)}
      />
      <div
        data-testid="color-display"
        style={{ backgroundColor: current, width: "10rem", height: "10rem" }}
      ></div>
    </>
  );
};

export default App;
