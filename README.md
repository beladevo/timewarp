# timewarp-sim

> 🕰️ **Deterministic Time Simulation and Manipulation Library for TypeScript**

**timewarp-sim** lets you **freeze, advance, and manipulate time** in Node.js or TypeScript applications for **deterministic testing, simulation, and debugging**.

Built with a clean, predictable API and 100% TypeScript typings.

---

## ✨ Features

* **Freeze Time Globally:** Lock the clock to a specific instant.
* **Advance Time:** Simulate the passage of time step by step.
* **Travel to Any Timestamp:** Jump forward or backward in time.
* **Return to Real Time:** Resume normal clock behavior.
* **Mock Global Date:** Make `Date.now()` and `new Date()` return simulated time.
* **Register Hooks:** Get notified when the simulated time changes.
* **Zero Dependencies:** Lightweight and minimal footprint.
* **Fully Typed:** Rich TypeScript support out of the box.

---

## 📦 Installation

Install via npm:

```bash
npm install timewarp-sim
```

or yarn:

```bash
yarn add timewarp-sim
```

---

## 🚀 Quick Start Example

```typescript
import { Timewarp } from "timewarp-sim";

// Show the current real time
console.log("Real time:", Timewarp.now());

// Freeze the clock
Timewarp.freeze();
console.log("Frozen:", Timewarp.now());

// Enable global Date mocking
Timewarp.enableGlobalMocking();

console.log("Mocked Date.now():", Date.now());
console.log("Mocked new Date():", new Date());
console.log("Mocked Date():", Date());

// Advance 1 hour
Timewarp.advance(1000 * 60 * 60);
console.log("After advancing 1 hour:", new Date());

// Travel to a specific date
Timewarp.travelTo(new Date("2040-01-01T00:00:00Z"));
console.log("Time traveled:", new Date());

// Resume real time
Timewarp.unfreeze();
Timewarp.disableGlobalMocking();

console.log("Back to real time:", new Date());
```

---

## 🧩 API Reference

### Time Control

#### `Timewarp.now(): Date`

Returns the current simulated time.

#### `Timewarp.freeze(): void`

Freezes time to the current instant.

#### `Timewarp.unfreeze(): void`

Resumes real-time progression.

#### `Timewarp.advance(ms: number): void`

Advances frozen time by `ms` milliseconds.

#### `Timewarp.travelTo(date: Date): void`

Sets frozen time to a specific date.

#### `Timewarp.isFrozen(): boolean`

Returns `true` if time is currently frozen.

---

### Hooks

#### `Timewarp.onTimeChange(callback: (newTime: number) => void): void`

Registers a hook triggered when time changes.

#### `Timewarp.removeTimeChangeListener(callback): void`

Removes a previously registered hook.

---

### Global Mocking

#### `Timewarp.enableGlobalMocking(): void`

Overrides `Date.now()`, `new Date()`, and `Date()` globally to return simulated time.

✅ Example:

```typescript
Timewarp.freeze();
Timewarp.enableGlobalMocking();

console.log(Date.now()); // frozen timestamp
console.log(new Date()); // frozen date object
console.log(Date());     // frozen date string
```

---

#### `Timewarp.disableGlobalMocking(): void`

Restores the original global `Date` object.

✅ Example:

```typescript
Timewarp.disableGlobalMocking();
console.log(Date.now()); // real timestamp again
```

---

#### `Timewarp.isGlobalMockingEnabled(): boolean`

Returns `true` if global mocking is active.

---

## 🛠️ Use Cases

✅ Simulating token expiration scenarios.
✅ Testing time-sensitive workflows and scheduled jobs.
✅ Reproducing tricky date-related bugs.
✅ Advancing time deterministically during unit tests.
✅ Creating simulation environments for caching and TTL.
✅ Running integration tests with `Date` globally mocked.

---

## 🙏 Credits & Inspiration

This library was inspired by:

* [Sinon.js Fake Timers](https://sinonjs.org/releases/latest/fake-timers/)
* [jest.advanceTimersByTime()](https://jestjs.io/docs/timer-mocks)

Developed with ❤️ by [Omri Beladev](https://github.com/beladevo).

---

## 📝 License

MIT License.

---

## 💡 Tips

* Always **disable global mocking** after tests to avoid side effects.
* Combine `travelTo()` and `advance()` for precise time manipulation.
* Use hooks to log or trigger actions whenever simulated time changes.
* If you only need deterministic time in specific parts of your app, prefer `Timewarp.now()` instead of enabling global mocking.

---

## ✨ Stay Connected

If you build something cool with `timewarp-sim`, share it or open a pull request!

Happy time traveling. ⏳
