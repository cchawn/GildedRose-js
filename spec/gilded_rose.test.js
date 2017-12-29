const { Item, Shop } = require('../src/gilded_rose');

describe('Gilded Rose', () => {
  beforeEach(() => {
    gildedRose = createShop({sellIn: 1, quality: 1 });
  });

  it('reduces SellIn date by 1 each day', () => {
    const previous = item().sellIn;
    gildedRose.updateQuality();
    expect(item().sellIn).toEqual(previous - 1);
  });

  it('reduces Quality by 1 each day', () => {
    const previous = item().quality;
    gildedRose.updateQuality();
    expect(item().quality).toEqual(previous - 1);
  });

  describe('when SellIn date has passed', () => {
    beforeEach(() => {
      gildedRose = createShop({ sellIn: 0, quality: 2 });
    });

    it('reduces Quality by 2 each day', () => {
      const previous = item().quality;
      gildedRose.updateQuality();
      expect(item().quality).toEqual(previous - 2);
    });
  });

  describe('when Quality is 0', () => {
    beforeEach(() => {
      gildedRose = createShop({ quality: 0 });
    });

    it('does not reduce quality below 0', () => {
      gildedRose.updateQuality();
      expect(item().quality).not.toBeLessThan(0);
    });
  });

  describe('Aged Brie', () => {
    beforeEach(() => {
      gildedRose = createShop({ name: 'Aged Brie', sellIn: 1, quality: 1 });
    });

    it('increases Quality by 1 each day', () => {
      const previous = item().quality;
      gildedRose.updateQuality();
      expect(item().quality).toEqual(previous + 1);
    });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    beforeEach(() => {
      gildedRose = createShop({ name: 'Sulfuras, Hand of Ragnaros' });
    });

    it('does not reduce Quality', () => {
      const previous = item().quality;
      gildedRose.updateQuality();
      expect(item().quality).toEqual(previous);
    });

    it('does not reduce SellIn date', () => {
      const previous = item().sellIn;
      gildedRose.updateQuality();
      expect(item().sellIn).toEqual(previous);
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';

    describe('when SellIn date is more than 10 days away', () => {
      beforeEach(() => {
        gildedRose = createShop({ name, sellIn: 11 });
      });

      it('increases Quality by 1 each day', () => {
        const previous = item().quality;
        gildedRose.updateQuality();
        expect(item().quality).toEqual(previous + 1);
      });
    });

    describe('when SellIn date is 10 days away (or less)', () => {
      beforeEach(() => {
        gildedRose = createShop({ name, sellIn: 10 });
      });

      it('increases Quality by 2 each day', () => {
        const previous = item().quality;
        gildedRose.updateQuality();
        expect(item().quality).toEqual(previous + 2);
      });
    });

    describe('when SellIn date is 5 days away (or less)', () => {
      beforeEach(() => {
        gildedRose = createShop({ name, sellIn: 5 });
      });

      it('increases Quality by 3 each day', () => {
        const previous = item().quality;
        gildedRose.updateQuality();
        expect(item().quality).toEqual(previous + 3);
      });
    });

    describe('when SellIn date has passed', () => {
      beforeEach(() => {
        gildedRose = createShop({ name, sellIn: 0 });
      });

      it('Quality drops to 0', () => {
        gildedRose.updateQuality();
        expect(item().quality).toEqual(0);
      });
    });
  });

  describe('when Quality is 50', () => {
    beforeEach(() => {
      gildedRose = createShop({ name: 'Aged Brie', sellIn: 1, quality: 50 });
    });

    it('does not increase quality above 50', () => {
      gildedRose.updateQuality();
      expect(item().quality).not.toBeGreaterThan(50);
    });
  });

  describe('Conjured items', () => {
    it('reduces in Quality by 2 each day');
  });

  let gildedRose;

  function createShop({ name, sellIn = 0, quality = 0 }) {
    return new Shop([ new Item(name, sellIn, quality) ]);
  }

  function item() {
    return gildedRose.items[0];
  }
});
