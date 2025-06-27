type HookCallback = (newTime: number) => void;

export class TimeHooks {
  private listeners: Set<HookCallback> = new Set();

  onTimeChange(callback: HookCallback): void {
    this.listeners.add(callback);
  }

  removeListener(callback: HookCallback): void {
    this.listeners.delete(callback);
  }

  notifyAll(newTime: number): void {
    for (const cb of this.listeners) {
      cb(newTime);
    }
  }
}
