const ProcessorFactory = require('./processor-factory');

class Shop {
  constructor(items=[]) {
    this.items = items;
  }

  updateQuality() {
    return this.items
      .map(ProcessorFactory.createProcessor)
      .forEach(processor => processor.process());
  }
}

module.exports = { Shop };
