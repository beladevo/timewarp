export class TimeUtils {
  static format(date: Date): string {
    return date.toISOString();
  }

  static addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }
}
