import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { STANDALONE, setMedia } from "@/test/media";

import { INSTALL_DISMISSED_KEY, InstallPrompt } from "./InstallPrompt";

const CHROME_ANDROID =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36";
const IPHONE_SAFARI =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";

/** jsdom has no `maxTouchPoints` at all, so the navigator is given the values a
 *  real device would report rather than spied on. */
function browseAs(userAgent: string, maxTouchPoints = 5) {
  Object.defineProperty(window.navigator, "userAgent", {
    value: userAgent,
    configurable: true,
  });
  Object.defineProperty(window.navigator, "maxTouchPoints", {
    value: maxTouchPoints,
    configurable: true,
  });
}

/** What Chromium fires when the app is installable. */
function fireInstallable() {
  const event = new Event("beforeinstallprompt", { cancelable: true });
  const prompt = vi.fn().mockResolvedValue(undefined);
  Object.assign(event, {
    prompt,
    userChoice: Promise.resolve({ outcome: "accepted" as const }),
  });
  act(() => {
    window.dispatchEvent(event);
  });
  return { event, prompt };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("InstallPrompt on a browser that can install", () => {
  it("stays out of the way until the browser says the app is installable", () => {
    browseAs(CHROME_ANDROID);
    render(<InstallPrompt />);

    expect(
      screen.queryByRole("complementary", { name: "Instalar o OnDeck" }),
    ).not.toBeInTheDocument();
  });

  it("offers to install once it is, keeping the browser from prompting on its own", () => {
    browseAs(CHROME_ANDROID);
    render(<InstallPrompt />);

    const { event } = fireInstallable();

    expect(event.defaultPrevented).toBe(true);
    expect(
      screen.getByRole("complementary", { name: "Instalar o OnDeck" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Instalar" })).toBeInTheDocument();
  });

  it("hands over to the browser's own install dialog on Instalar", async () => {
    browseAs(CHROME_ANDROID);
    render(<InstallPrompt />);
    const { prompt } = fireInstallable();

    await userEvent.click(screen.getByRole("button", { name: "Instalar" }));

    expect(prompt).toHaveBeenCalledOnce();
  });

  it("goes away on Agora não and does not come back", async () => {
    browseAs(CHROME_ANDROID);
    const { unmount } = render(<InstallPrompt />);
    fireInstallable();

    await userEvent.click(screen.getByRole("button", { name: "Agora não" }));

    expect(
      screen.queryByRole("complementary", { name: "Instalar o OnDeck" }),
    ).not.toBeInTheDocument();
    expect(window.localStorage.getItem(INSTALL_DISMISSED_KEY)).toBe("1");

    unmount();
    render(<InstallPrompt />);
    fireInstallable();

    expect(
      screen.queryByRole("complementary", { name: "Instalar o OnDeck" }),
    ).not.toBeInTheDocument();
  });

  it("offers nothing when already running from the home screen", () => {
    browseAs(CHROME_ANDROID);
    setMedia(STANDALONE, true);
    render(<InstallPrompt />);

    fireInstallable();

    expect(
      screen.queryByRole("complementary", { name: "Instalar o OnDeck" }),
    ).not.toBeInTheDocument();
  });
});

describe("InstallPrompt on an iPhone", () => {
  it("spells out the Share gesture, since there is no install button to offer", () => {
    browseAs(IPHONE_SAFARI);
    render(<InstallPrompt />);

    expect(
      screen.getByText(/Compartilhar e depois em “Adicionar à Tela de Início”/),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Instalar" }),
    ).not.toBeInTheDocument();
  });

  it("stays dismissed once waved away", () => {
    browseAs(IPHONE_SAFARI);
    window.localStorage.setItem(INSTALL_DISMISSED_KEY, "1");
    render(<InstallPrompt />);

    expect(
      screen.queryByRole("complementary", { name: "Instalar o OnDeck" }),
    ).not.toBeInTheDocument();
  });
});
