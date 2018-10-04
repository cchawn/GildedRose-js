const MathUtils = require('../utils/math-utils');

class ItemProcessor {
  constructor(item) {
    this.item = item;
    this.QUALITY_LOWER_BOUND = 0;
    this.QUALITY_UPPER_BOUND = 50;
  }

  process() {
    this.updateQuality();
    this.updateSellIn();
  }

  updateSellIn() {
    this.item.sellIn += ItemProcessor.getSellInChangeRate();
  }

  updateQuality() {
    const quality = this.item.quality + ItemProcessor.getQualityChangeRate(this.item.sellIn);
    this.item.quality = MathUtils.clamp(
      this.QUALITY_LOWER_BOUND,
      this.QUALITY_UPPER_BOUND,
      quality,
    );
  }

  static getQualityChangeRate(sellIn) {
    if (sellIn < 0) { return -2; }
    return -1;
  }

  static getSellInChangeRate() {
    return -1;
  }
}

module.exports = { ItemProcessor };
