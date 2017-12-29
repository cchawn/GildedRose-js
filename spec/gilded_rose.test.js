const { Item, Shop } = require('../src/gilded_rose');

describe('Gilded Rose', () => {
  function createShop({ name, sellIn = 0, quality = 0 }) {
    return new Shop([ new Item(name, sellIn, quality) ]);
  }

  it('reduces SellIn date by 1 each day');
  it('reduces Quality by 1 each day');

  describe('when SellIn date has passed', () => {
    it('reduces Quality by 2 each day');
  });

  describe('when Quality is 0', () => {
    it('does not reduce quality below 0');
  });

  describe('Aged Brie', () => {
    it('increases Quality by 1 each day');
  });

  describe('when Quality is 50', () => {
    it('does not increase quality above 50');
  });

  describe('when Quality is >50', () => {
    it('cannot create the Item');
  });

  describe('Sulfuras', () => {
    it('does not reduce Quality');
    it('does not reduce SellIn date');
  });

  describe('Backstage passes', () => {
    describe('when SellIn date is more than 10 days away', () => {
      it('increases Quality by 1 each day');
    });

    describe('when SellIn date is 10 days away (or less)', () => {
      it('increases Quality by 2 each day');
    });

    describe('when SellIn date is 5 days away (or less)', () => {
      it('increases Quality by 3 each day');
    });

    describe('when SellIn date has passed', () => {
      it('Quality drops to 0');
    });
  });

  describe('Conjured items', () => {
    it('reduces in Quality by 2 each day');
  });
});
