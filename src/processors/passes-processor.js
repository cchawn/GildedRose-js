const ItemProcessor = require('./item-processor');

class PassesProcessor extends ItemProcessor {
  updateQuality() {
    if (this.isPastSellInDate()) {
      this.item.quality = 0;
      return;
    }

    super.updateQuality();
  }

  getQualityChangeRate(sellIn) {
    if (sellIn <= 5) { return 3; }
    if (sellIn <= 10) { return 2; }
    return 1;
  }
}

module.exports = PassesProcessor;
