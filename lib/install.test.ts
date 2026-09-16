import { describe, expect, it } from "vitest";

import { canOfferInstall, isIos, shouldOfferIosInstructions } from "./install";

const IPHONE_SAFARI =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const IPHONE_CHROME =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0 Mobile/15E148 Safari/604.1";
const IPADOS_DESKTOP_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";
const ANDROID_CHROME =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36";
const MAC_SAFARI =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";

describe("recognising iOS", () => {
  it("recognises an iPhone", () => {
    expect(isIos({ userAgent: IPHONE_SAFARI, maxTouchPoints: 5 })).toBe(true);
  });

  it("recognises Chrome on an iPhone, which is WebKit underneath", () => {
    expect(isIos({ userAgent: IPHONE_CHROME, maxTouchPoints: 5 })).toBe(true);
  });

  it("recognises an iPad claiming to be a Mac", () => {
    expect(isIos({ userAgent: IPADOS_DESKTOP_UA, maxTouchPoints: 5 })).toBe(
      true,
    );
  });

  it("does not mistake a real Mac for an iPad", () => {
    expect(isIos({ userAgent: MAC_SAFARI, maxTouchPoints: 0 })).toBe(false);
  });

  it("leaves Android to the browser's own install prompt", () => {
    expect(isIos({ userAgent: ANDROID_CHROME, maxTouchPoints: 5 })).toBe(false);
  });
});

describe("offering the iOS instruction", () => {
  const onIphone = {
    userAgent: IPHONE_SAFARI,
    maxTouchPoints: 5,
    isStandalone: false,
    isDismissed: false,
  };

  it("offers it to a Volunteer browsing on an iPhone", () => {
    expect(shouldOfferIosInstructions(onIphone)).toBe(true);
  });

  it("says nothing once the app already opens from the home screen", () => {
    expect(
      shouldOfferIosInstructions({ ...onIphone, isStandalone: true }),
    ).toBe(false);
  });

  it("stays away after the Volunteer waves it off", () => {
    expect(shouldOfferIosInstructions({ ...onIphone, isDismissed: true })).toBe(
      false,
    );
  });

  it("says nothing on Android, where the browser prompts on its own", () => {
    expect(
      shouldOfferIosInstructions({ ...onIphone, userAgent: ANDROID_CHROME }),
    ).toBe(false);
  });
});

describe("whether there is anything to offer", () => {
  it("offers in a browser tab that has not been dismissed", () => {
    expect(canOfferInstall({ isStandalone: false, isDismissed: false })).toBe(true);
  });

  it("offers nothing once launched from the home screen", () => {
    expect(canOfferInstall({ isStandalone: true, isDismissed: false })).toBe(false);
  });

  it("offers nothing once waved away", () => {
    expect(canOfferInstall({ isStandalone: false, isDismissed: true })).toBe(false);
  });
});
