const BrieProcessor = require('./processors/brie-processor');
const ItemProcessor = require('./processors/item-processor');
const LegendaryProcessor = require('./processors/legendary-processor');
const PassesProcessor = require('./processors/passes-processor');

const BRIE = 'Aged Brie';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';

class ProcessorFactory {
  static createProcessor(item) {
    if (item.name === BRIE) {
      return new BrieProcessor(item);
    } else if (item.name === PASSES) {
      return new PassesProcessor(item);
    } else if (item.name === SULFURAS) {
      return new LegendaryProcessor(item);
    } else {
      return new ItemProcessor(item);
    }
  }
}

module.exports = ProcessorFactory;
