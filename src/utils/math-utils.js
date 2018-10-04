class MathUtils {
  static clamp(min, max, val) {
    return Math.min(Math.max(val, min), max);
  }
}

module.exports = MathUtils;
