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
    this.item.sellIn += this.getSellInChangeRate();
  }

  updateQuality() {
    const quality = this.item.quality + this.getQualityChangeRate(this.item.sellIn);
    this.item.quality = MathUtils.clamp(
      this.QUALITY_LOWER_BOUND,
      this.QUALITY_UPPER_BOUND,
      quality,
    );
  }

  getQualityChangeRate() {
    if (this.isPastSellInDate()) { return -2; }
    return -1;
  }

  getSellInChangeRate() {
    return -1;
  }

  isPastSellInDate() {
    return this.item.sellIn <= 0;
  }
}

module.exports = ItemProcessor;
