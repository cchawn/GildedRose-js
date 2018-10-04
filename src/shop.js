const BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const PASSES = 'Backstage passes to a TAFKAL80ETC concert';

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  static decreaseSellIn(sellIn) {
    return sellIn - 1;
  }

  static decreaseQuality(quality) {
    if (quality > 0) return quality - 1;
    return quality;
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
        item.quality = Shop.increaseQuality(item.quality);
      } else if (item.name === PASSES) {
        item.quality = Shop.increaseQuality(item.quality);
        if (item.sellIn <= 10) {
          item.quality = Shop.increaseQuality(item.quality);
        }
        if (item.sellIn <= 5) {
          item.quality = Shop.increaseQuality(item.quality);
        }
      } else {
        /* Everything else
         * Decrease quality by 1 to a minimum of 0.
         */
        item.quality = Shop.decreaseQuality(item.quality);
      }

      /* Decrease Sell In Date */
      item.sellIn = Shop.decreaseSellIn(item.sellIn);

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
        } else {
          /* Everything else
           * Once the sell in date has passed,
           * decrease the quality twice as fast to a minimum of 0.
           * We already decreased the quality once, do it again here.
           */
          item.quality = Shop.decreaseQuality(item.quality);
        }
      }
    }

    return this.items;
  }
}

module.exports = { Shop };
