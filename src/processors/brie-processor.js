const ItemProcessor = require('./item-processor');

class BrieProcessor extends ItemProcessor {
  getQualityChangeRate() {
    if (this.isPastSellInDate()) { return 2; }
    return 1;
  }
}

module.exports = BrieProcessor;
