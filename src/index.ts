import { TimeController } from "./core/TimeController";

const globalController = new TimeController();

export const Timewarp = {
  now: () => globalController.now(),
  freeze: () => globalController.freeze(),
  unfreeze: () => globalController.unfreeze(),
  travelTo: (date: Date) => globalController.travelTo(date),
  advance: (ms: number) => globalController.advance(ms),
  isFrozen: () => globalController.isFrozen(),
  onTimeChange: (cb: (newTime: number) => void) =>
    globalController.onTimeChange(cb),
  removeTimeChangeListener: (cb: (newTime: number) => void) =>
    globalController.removeTimeChangeListener(cb)
};

export { TimeController };
