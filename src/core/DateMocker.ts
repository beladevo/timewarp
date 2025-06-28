import { TimeController } from "./TimeController";

let isMocked: boolean = false;
let OriginalDate: DateConstructor;

export class DateMocker {
  /**
   * Enable global Date mocking.
   */
  static enable(controller: TimeController): void {
    if (isMocked) return;

    OriginalDate = Date;

    function MockedDate(
      this: any,
      value?: string | number | Date
    ): string | Date {
      if (!(this instanceof MockedDate)) {
        if (value === undefined) {
          return new OriginalDate(controller.nowTimestamp()).toString();
        }
        return new OriginalDate(value).toString();
      }

      // If called with new
      if (value === undefined) {
        return new OriginalDate(controller.nowTimestamp());
      }
      return new OriginalDate(value);
    }

    // Attach static methods
    (MockedDate as any).now = (): number => controller.nowTimestamp();
    (MockedDate as any).parse = OriginalDate.parse;
    (MockedDate as any).UTC = OriginalDate.UTC;

    // Keep prototype for instanceof checks
    (MockedDate as any).prototype = OriginalDate.prototype;

    // Replace the global Date
    (globalThis as any).Date = MockedDate as unknown as DateConstructor;
    isMocked = true;
  }

  /**
   * Disable global Date mocking.
   */
  static disable(): void {
    if (!isMocked) return;
    (globalThis as any).Date = OriginalDate;
    isMocked = false;
  }

  /**
   * Check if global mocking is enabled.
   */
  static isEnabled(): boolean {
    return isMocked;
  }
}
