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
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name !== BRIE && this.items[i].name !== PASSES) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name !== SULFURAS) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name === PASSES) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name !== SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      /** Sell In Date has passed **/
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name === BRIE) {
          /* Aged Brie
           * Once the sell in date has passed,
           * increase in quality up to a maximum of 50.
           */
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        } else if (this.items[i].name === PASSES) {
          /* Backstage Passes
           * Once the sell in date has passed,
           * decrease the quality to 0.
           */
          this.items[i].quality = 0;
        } else {
          /* Everything else
           * Once the sell in date has passed,
           * decrease the quality twice as fast to a minimum of 0.
           * We already decreased the quality once, do it again here.
           */
          if (this.items[i].quality > 0) {
            if (this.items[i].name !== SULFURAS) {
              this.items[i].quality = this.items[i].quality - 1;
            }
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = { Item, Shop };
