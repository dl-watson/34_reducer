import React, { useReducer } from "react";
import {
  initialState,
  ACTIONS,
  colorReducer,
} from "../../reducers/colorReducer";

const App = () => {
  const [state, dispatch] = useReducer(colorReducer, initialState);

  const { current } = state;

  return (
    <>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.UNDO,
          })
        }
      >
        undo
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.REDO,
          })
        }
      >
        redo
      </button>
      <input
        type="color"
        data-testid="color-input"
        value={current}
        onChange={({ target }) =>
          dispatch({ type: ACTIONS.RECORD, payload: target.value })
        }
      />
      <div
        data-testid="color-display"
        style={{
          backgroundColor: current,
          width: "10rem",
          height: "10rem",
        }}
      ></div>
    </>
  );
};

export default App;
