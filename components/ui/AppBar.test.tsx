import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppBar } from "./AppBar";

describe("AppBar", () => {
  it("names where the Volunteer is and offers the way back", () => {
    render(<AppBar title="Transmissão" subtitle="OBS Studio" backHref="/" />);

    expect(screen.getByText("Transmissão")).toBeInTheDocument();
    expect(screen.getByText("OBS Studio")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voltar para a lista de departamentos" }),
    ).toHaveAttribute("href", "/");
  });

  it("leaves out the subtitle line when there is no Tool to name", () => {
    render(<AppBar title="Transmissão" backHref="/" />);

    expect(screen.getByText("Transmissão")).toBeInTheDocument();
    expect(screen.queryByText("OBS Studio")).not.toBeInTheDocument();
  });
});
