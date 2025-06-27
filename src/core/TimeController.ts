import { TimeState } from "./TimeState";
import { TimeHooks } from "./TimeHooks";

export class TimeController {
  private state: TimeState;
  private hooks: TimeHooks;

  constructor() {
    this.state = new TimeState();
    this.hooks = new TimeHooks();
  }

  now(): Date {
    return new Date(this.state.now);
  }

  freeze(): void {
    this.state.freeze();
    this.hooks.notifyAll(this.state.now);
  }

  unfreeze(): void {
    this.state.unfreeze();
    this.hooks.notifyAll(Date.now());
  }

  travelTo(date: Date): void {
    this.state.setTime(date.getTime());
    this.hooks.notifyAll(this.state.now);
  }

  advance(ms: number): void {
    this.state.advance(ms);
    this.hooks.notifyAll(this.state.now);
  }

  isFrozen(): boolean {
    return this.state.isFrozen();
  }

  onTimeChange(callback: (newTime: number) => void): void {
    this.hooks.onTimeChange(callback);
  }

  removeTimeChangeListener(callback: (newTime: number) => void): void {
    this.hooks.removeListener(callback);
  }
}
