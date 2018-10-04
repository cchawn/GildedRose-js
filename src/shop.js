const BrieProcessor = require('./processors/brie-processor');
const ItemProcessor = require('./processors/item-processor');
const LegendaryProcessor = require('./processors/legendary-processor');
const PassesProcessor = require('./processors/passes-processor');

const BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';

class Shop {
  constructor(items=[]) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name === SULFURAS) {
        new LegendaryProcessor(item).process();
      } else if (item.name === BRIE) {
        new BrieProcessor(item).process();
      } else if (item.name === PASSES) {
        new PassesProcessor(item).process();
      } else {
        new ItemProcessor(item).process();
      }
    }

    return this.items;
  }
}

module.exports = { Shop };
