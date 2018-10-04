const ItemProcessor = require('./item-processor');

class BrieProcessor extends ItemProcessor {
  getQualityChangeRate(sellIn) {
    if (sellIn < 0) { return 2; }
    return 1;
  }
}

module.exports = BrieProcessor;
