import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App component", () => {
  it("renders App, tests that the undo, redo, and color picker input work as expected", () => {
    render(<App />);

    const undoButton = screen.getByText("undo");
    const redoButton = screen.getByText("redo");
    const colorInput = screen.getByTestId("color-input");

    fireEvent.change(colorInput, {
      target: {
        value: "#000000",
      },
    });

    fireEvent.click(undoButton);
    fireEvent.click(redoButton);

    fireEvent.change(colorInput, {
      target: {
        value: "#FFFFFF",
      },
    });

    fireEvent.click(undoButton);
    fireEvent.click(redoButton);

    return waitFor(() => {
      expect(screen.getByTestId("color-display")).toHaveStyle({
        backgroundColor: "#FFFFFF",
      });
    });
  });
});
