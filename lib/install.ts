export type InstallEnvironment = {
  userAgent: string;
  maxTouchPoints: number;
  isStandalone: boolean;
  isDismissed: boolean;
};

export function isIos({
  userAgent,
  maxTouchPoints,
}: Pick<InstallEnvironment, "userAgent" | "maxTouchPoints">): boolean {
  if (/iphone|ipod|ipad/i.test(userAgent)) return true;
  return /macintosh/i.test(userAgent) && maxTouchPoints > 1;
}

export function canOfferInstall(
  env: Pick<InstallEnvironment, "isStandalone" | "isDismissed">,
): boolean {
  return !env.isDismissed && !env.isStandalone;
}

export function shouldOfferIosInstructions(env: InstallEnvironment): boolean {
  return canOfferInstall(env) && isIos(env);
}
