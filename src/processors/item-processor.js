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
    let qualityChange = this.getQualityChangeRate();

    if (this.isPastSellInDate()) { qualityChange *=2; }
    if (this.isConjuredItem()) { qualityChange *=2; }

    const quality = this.item.quality + qualityChange;
    this.item.quality = MathUtils.clamp(
      this.QUALITY_LOWER_BOUND,
      this.QUALITY_UPPER_BOUND,
      quality,
    );
  }

  getQualityChangeRate() {
    return -1;
  }

  getSellInChangeRate() {
    return -1;
  }

  isPastSellInDate() {
    return this.item.sellIn <= 0;
  }

  isConjuredItem() {
    return this.item.name.includes('Conjured');
  }
}

module.exports = ItemProcessor;
