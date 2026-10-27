/** Keys for the 3 go-live steps. Resolved under `home.goLive.steps.<key>`. */
export const GO_LIVE_STEP_KEYS = ['account', 'setup', 'sell'] as const;
export type GoLiveStepKey = (typeof GO_LIVE_STEP_KEYS)[number];
