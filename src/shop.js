const ProcessorFactory = require('./processor-factory');

class Shop {
  constructor(items=[]) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      ProcessorFactory.createProcessor(item).process();
    }

    return this.items;
  }
}

module.exports = { Shop };
