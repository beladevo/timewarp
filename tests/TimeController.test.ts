import { TimeController } from "../src/core/TimeController";
import { DateMocker } from "../src/core/DateMocker";

describe("TimeController", () => {
  it("freezes and advances time", () => {
    const ctrl = new TimeController();
    ctrl.freeze();
    const t1 = ctrl.now().getTime();
    ctrl.advance(1000);
    const t2 = ctrl.now().getTime();
    expect(t2 - t1).toBe(1000);
  });

  it("unfreezes time", (done) => {
    const ctrl = new TimeController();
    ctrl.freeze();
    ctrl.unfreeze();
    const t1 = ctrl.now().getTime();
    setTimeout(() => {
      const t2 = ctrl.now().getTime();
      expect(t2).toBeGreaterThan(t1);
      done();
    }, 50);
  });

  it("enables global Date mocking", () => {
    const ctrl = new TimeController();
    ctrl.freeze();
    const frozenTimestamp = ctrl.now().getTime();

    DateMocker.enable(ctrl);

    expect(Date.now()).toBe(frozenTimestamp);

    expect(new Date().getTime()).toBe(frozenTimestamp);

    ctrl.advance(5000);
    const advancedTimestamp = frozenTimestamp + 5000;

    expect(Date.now()).toBe(advancedTimestamp);
    expect(new Date().getTime()).toBe(advancedTimestamp);

    DateMocker.disable();
  });

  it("disables global Date mocking and restores real Date", (done) => {
    const ctrl = new TimeController();
    ctrl.freeze();
    DateMocker.enable(ctrl);

    const frozen = Date.now();

    DateMocker.disable();

    setTimeout(() => {
      const afterRestore = Date.now();
      expect(afterRestore).toBeGreaterThan(frozen);

      const now = new Date().getTime();
      expect(now).toBeGreaterThan(frozen);

      setTimeout(() => {
        const later = Date.now();
        expect(later).toBeGreaterThan(now);
        done();
      }, 10);
    }, 10);
  });
});
