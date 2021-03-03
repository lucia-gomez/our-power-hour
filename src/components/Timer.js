class Timer {
  constructor(callback, delay) {
    this.callback = callback;
    this.delay = delay;

    this.reset();
  }

  pause() {
    window.clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  }

  resume() {
    this.start = Date.now();
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.callback, this.remaining);
  }

  reset() {
    this.timerId = this.delay;
    this.start = this.delay;
    this.remaining = this.delay;
  }

  repeat() {
    this.reset();
    this.resume();
  }
}

export default Timer;