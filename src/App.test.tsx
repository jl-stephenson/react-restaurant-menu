import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App renders", () => {
  it("renders app", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading.textContent).toEqual("Menu");
  });
});
