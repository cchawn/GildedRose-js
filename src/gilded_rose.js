class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  static increaseQuality(quality) {
    if (quality < 50) return quality + 1;
    return quality;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name === BRIE) {
        item.quality = Shop.increaseQuality(item.quality);
      } else if (item.name === PASSES) {
        item.quality = Shop.increaseQuality(item.quality);
        if (item.sellIn < 11) {
          item.quality = Shop.increaseQuality(item.quality);
        }
        if (item.sellIn < 6) {
          item.quality = Shop.increaseQuality(item.quality);
        }
      } else if (item.name === SULFURAS) {
        /* Sulfuras, Hand of Ragnaros
         * Do nothing. Quality never decreases.
         */
      } else {
        /* Everything else
         * Decrease quality by 1 to a minimum of 0.
         */
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      }

      /* Decrease Sell In Date */
      if (item.name !== SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }

      /** Sell In Date has passed **/
      if (item.sellIn < 0) {
        if (item.name === BRIE) {
          /* Aged Brie
           * Once the sell in date has passed,
           * increase in quality up to a maximum of 50.
           */
          item.quality = Shop.increaseQuality(item.quality);
        } else if (item.name === PASSES) {
          /* Backstage Passes
           * Once the sell in date has passed,
           * decrease the quality to 0.
           */
          item.quality = 0;
        } else if (item.name === SULFURAS) {
          /* Sulfuras, Hand of Ragnaros
           * Do nothing. Quality never decreases.
           */
        } else {
          /* Everything else
           * Once the sell in date has passed,
           * decrease the quality twice as fast to a minimum of 0.
           * We already decreased the quality once, do it again here.
           */
          if (item.quality > 0) {
            item.quality = item.quality - 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = { Item, Shop };
