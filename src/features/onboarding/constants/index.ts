import { Config } from "driver.js";

export const DRIVER_CONFIG: Config = {
  showProgress: true,
  animate: true,
  smoothScroll: true,
  allowClose: true,
  stagePadding: 4,
  popoverClass: "netflix-tour-popover",
  progressText: "{{current}} of {{total}}",
  nextBtnText: "Next",
  prevBtnText: "Previous",
  doneBtnText: "Got it",
};

export const ONBOARDING_STORAGE_KEY = "netflix_onboarding_state";
