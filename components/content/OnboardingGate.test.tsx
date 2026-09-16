import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ONBOARDING_SEEN_KEY, OnboardingGate } from "./OnboardingGate";

function renderHome() {
  return render(
    <OnboardingGate>
      <button type="button">Transmissão</button>
    </OnboardingGate>,
  );
}

describe("OnboardingGate on a first visit", () => {
  it("covers Home with a welcome dialog", () => {
    renderHome();

    expect(
      screen.getByRole("dialog", {
        name: "Seu guia rápido pra qualquer função da mídia",
      }),
    ).toBeInTheDocument();
  });

  it("puts focus on the way in", () => {
    renderHome();

    expect(screen.getByRole("button", { name: "Começar" })).toHaveFocus();
  });

  it("makes Home unreachable behind it", () => {
    renderHome();
    const behind = screen.getByText("Transmissão").closest("[inert]");
    expect(behind).not.toBeNull();
  });

  it("says no login is needed", () => {
    renderHome();

    expect(screen.getByText(/Não precisa de login/)).toBeInTheDocument();
  });

  it("never greets the Volunteer by name", () => {
    renderHome();
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).queryByText(/^(olá|oi),/i)).not.toBeInTheDocument();
  });

  it("stops the page behind from scrolling while it is open", () => {
    renderHome();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes on Começar, remembers it, and releases Home", async () => {
    renderHome();

    await userEvent.click(screen.getByRole("button", { name: "Começar" }));

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(window.localStorage.getItem(ONBOARDING_SEEN_KEY)).toBe("1");
    expect(screen.getByText("Transmissão").closest("[inert]")).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes on Escape and remembers it", async () => {
    renderHome();

    await userEvent.keyboard("{Escape}");

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(window.localStorage.getItem(ONBOARDING_SEEN_KEY)).toBe("1");
  });
});

describe("OnboardingGate on a return visit", () => {
  it("shows Home directly", () => {
    window.localStorage.setItem(ONBOARDING_SEEN_KEY, "1");
    renderHome();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Transmissão" }),
    ).toBeInTheDocument();
  });
});
