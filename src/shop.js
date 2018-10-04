const ItemProcessor = require('./processors/item-processor');
const BrieProcessor = require('./processors/brie-processor');

const BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';

class Shop {
  constructor(items=[]) {
    this.items = items;
  }

  static decreaseSellIn(sellIn) {
    return sellIn - 1;
  }

  static increaseQuality(quality) {
    if (quality < 50) return quality + 1;
    return quality;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name === SULFURAS) { continue; }

      if (item.name === BRIE) {
        new BrieProcessor(item).process();
      } else if (item.name === PASSES) {
        item.quality = Shop.increaseQuality(item.quality);
        if (item.sellIn <= 10) {
          item.quality = Shop.increaseQuality(item.quality);
        }
        if (item.sellIn <= 5) {
          item.quality = Shop.increaseQuality(item.quality);
        }

        /* Decrease Sell In Date */
        item.sellIn = Shop.decreaseSellIn(item.sellIn);

        if (item.sellIn < 0) {
          item.quality = 0;
        }
      } else {
        new ItemProcessor(item).process();
      }
    }

    return this.items;
  }
}

module.exports = { Shop };
