const ItemProcessor = require('./item-processor');

class BrieProcessor extends ItemProcessor {
  getQualityChangeRate() {
    return 1;
  }
}

module.exports = BrieProcessor;
