class Clock {
  getTime() {
    return new Date().toUTCString();
  }
}

export default Clock;
