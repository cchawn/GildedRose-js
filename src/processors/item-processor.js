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
    this.item.quality += ItemProcessor.getQualityChangeRate(this.item.sellIn);
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
