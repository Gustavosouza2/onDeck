import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { GROUND } from "@/lib/brand";
import { THEME_KEY } from "@/lib/theme";
import { SYSTEM_LIGHT, setMedia } from "@/test/media";

import { ThemeToggle } from "./ThemeToggle";

function withThemeColorTag() {
  const meta = document.createElement("meta");
  meta.name = "theme-color";
  document.head.appendChild(meta);
  return meta;
}

describe("ThemeToggle", () => {
  it("offers automatic, light and dark, with automatic selected by default", () => {
    render(<ThemeToggle />);

    const group = screen.getByRole("group", { name: "Tema" });
    expect(group).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Automático/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /Claro/ })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByRole("button", { name: /Escuro/ })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("applies and remembers light when chosen on a dark system", async () => {
    setMedia(SYSTEM_LIGHT, false);
    const meta = withThemeColorTag();
    render(<ThemeToggle />);

    await userEvent.click(screen.getByRole("button", { name: /Claro/ }));

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(window.localStorage.getItem(THEME_KEY)).toBe("light");
    expect(meta).toHaveAttribute("content", GROUND.light);
    expect(screen.getByRole("button", { name: /Claro/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("applies and remembers dark when chosen on a light system", async () => {
    setMedia(SYSTEM_LIGHT, true);
    const meta = withThemeColorTag();
    render(<ThemeToggle />);

    await userEvent.click(screen.getByRole("button", { name: /Escuro/ }));

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem(THEME_KEY)).toBe("dark");
    expect(meta).toHaveAttribute("content", GROUND.dark);
  });

  it("forgets the choice and follows the system again on automatic", async () => {
    setMedia(SYSTEM_LIGHT, true);
    window.localStorage.setItem(THEME_KEY, "dark");
    render(<ThemeToggle />);

    await userEvent.click(screen.getByRole("button", { name: /Automático/ }));

    expect(window.localStorage.getItem(THEME_KEY)).toBeNull();
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("shows the stored choice as selected", () => {
    window.localStorage.setItem(THEME_KEY, "light");
    render(<ThemeToggle />);

    expect(screen.getByRole("button", { name: /Claro/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("names each icon-only button in full in the compact variant", () => {
    render(<ThemeToggle variant="compact" />);

    expect(
      screen.getByRole("button", { name: "Tema automático" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tema claro" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tema escuro" })).toBeInTheDocument();
    expect(screen.queryByText("Claro")).not.toBeInTheDocument();
  });

  it("keeps every toggle on the page in step with the choice", async () => {
    render(
      <>
        <ThemeToggle />
        <ThemeToggle variant="compact" />
      </>,
    );

    await userEvent.click(screen.getByRole("button", { name: /^Claro$/ }));

    expect(screen.getByRole("button", { name: "Tema claro" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
