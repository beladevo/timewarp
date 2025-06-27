export class TimeState {
  private _frozen: boolean = false;
  private _currentTime: number = Date.now();

  get now(): number {
    return this._frozen ? this._currentTime : Date.now();
  }

  freeze(): void {
    this._frozen = true;
    this._currentTime = Date.now();
  }

  unfreeze(): void {
    this._frozen = false;
  }

  setTime(timestamp: number): void {
    this._frozen = true;
    this._currentTime = timestamp;
  }

  advance(ms: number): void {
    if (!this._frozen) {
      throw new Error("Cannot advance time when not frozen.");
    }
    this._currentTime += ms;
  }

  isFrozen(): boolean {
    return this._frozen;
  }
}
