import { TimeController } from "../src/core/TimeController";

describe("TimeController", () => {
  it("freezes and advances time", () => {
    const ctrl = new TimeController();
    ctrl.freeze();
    const t1 = ctrl.now().getTime();
    ctrl.advance(1000);
    const t2 = ctrl.now().getTime();
    expect(t2 - t1).toBe(1000);
  });

  it("unfreezes time", () => {
    const ctrl = new TimeController();
    ctrl.freeze();
    ctrl.unfreeze();
    const t1 = ctrl.now().getTime();
    setTimeout(() => {
      const t2 = ctrl.now().getTime();
      expect(t2).toBeGreaterThan(t1);
    }, 50);
  });
});
