import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  describe("Basic", function () {
    it("item.name should equal to first argument in function", function () {
      const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).to.equal("foo");
    });
  });

  describe("Update SellIn", function () {
    it("Sulfuras items should not have SellIn updated", function () {
      const gildedRose = new GildedRose([new Item("Sulfuras", 0, 80)]);
      const initialSellIn = gildedRose.items[0].sellIn;
      gildedRose.updateQuality();
      const finalSellIn = gildedRose.items[0].sellIn;

      expect(finalSellIn - initialSellIn).to.equal(0);
    });

    it("Other items should have SellIn updated", function () {
      const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
      const initialSellIn = gildedRose.items[0].sellIn;
      gildedRose.updateQuality();
      const finalSellIn = gildedRose.items[0].sellIn;

      expect(finalSellIn - initialSellIn).to.equal(-1);
    });
  });

  describe("Update Quality", function () {
    describe("Sulfuras", function () {
      it("Sulfuras items should remain 80", function () {
        const gildedRose = new GildedRose([new Item("Sulfuras", 5, 80)]);
        gildedRose.updateQuality();
        const finalQuality = gildedRose.items[0].quality;

        expect(finalQuality).to.equal(80);
      });
    });

    describe("Normal items", function () {
      it("Normal items that didn't pass sellInDate should have Quality degraded by 1", function () {
        const gildedRose = new GildedRose([new Item("foo", 5, 5)]);
        const initialQuality = gildedRose.items[0].quality;
        gildedRose.updateQuality();
        const finalQuality = gildedRose.items[0].quality;

        expect(finalQuality - initialQuality).to.equal(-1);
      });

      it("Normal items that passed sellInDate should have Quality degraded by 2", function () {
        const gildedRose = new GildedRose([new Item("foo", 0, 5)]);
        const initialQuality = gildedRose.items[0].quality;
        gildedRose.updateQuality();
        const finalQuality = gildedRose.items[0].quality;

        expect(finalQuality - initialQuality).to.equal(-2);
      });
    });

    describe("Backstage", function () {
      it("Backstage - quality increases by 1 when 11 <= prevSellIn", function () {
        const gildedRose = new GildedRose([new Item("Backstage", 11, 5)]);
        const initialQuality = gildedRose.items[0].quality;
        gildedRose.updateQuality();
        const finalQuality = gildedRose.items[0].quality;

        expect(finalQuality - initialQuality).to.equal(1);
      });

      it("Backstage - quality increases by 2 when 6 <= prevSellIn <= 10", function () {
        const gildedRose = new GildedRose([
          new Item("Backstage", 6, 5),
          new Item("Backstage", 10, 5),
        ]);
        const initialQuality0 = gildedRose.items[0].quality;
        const initialQuality1 = gildedRose.items[1].quality;
        gildedRose.updateQuality();
        const finalQuality0 = gildedRose.items[0].quality;
        const finalQuality1 = gildedRose.items[1].quality;

        expect(finalQuality0 - initialQuality0).to.equal(2);
        expect(finalQuality1 - initialQuality1).to.equal(2);
      });

      it("Backstage - quality increases by 3 when 1 <= prevSellIn <= 5", function () {
        const gildedRose = new GildedRose([
          new Item("Backstage", 1, 5),
          new Item("Backstage", 5, 5),
        ]);
        const initialQuality0 = gildedRose.items[0].quality;
        const initialQuality1 = gildedRose.items[1].quality;
        gildedRose.updateQuality();
        const finalQuality0 = gildedRose.items[0].quality;
        const finalQuality1 = gildedRose.items[1].quality;

        expect(finalQuality0 - initialQuality0).to.equal(3);
        expect(finalQuality1 - initialQuality1).to.equal(3);
      });

      it("Backstage - quality drops to 0 when prevSellIn <= 0", function () {
        const gildedRose = new GildedRose([
          new Item("Backstage", 0, 5),
          new Item("Backstage", -1, 5),
        ]);

        gildedRose.updateQuality();
        const finalQuality0 = gildedRose.items[0].quality;
        const finalQuality1 = gildedRose.items[1].quality;

        expect(finalQuality0).to.equal(0);
        expect(finalQuality1).to.equal(0);
      });
    });

    describe("Aged Brie", function () {
      it("Aged Brie - quality increases by 1 when 1 <= prevSellIn", function () {
        const gildedRose = new GildedRose([
          new Item("Aged Brie", 1, 5),
          new Item("Aged Brie", 11, 5),
        ]);
        const initialQuality0 = gildedRose.items[0].quality;
        const initialQuality1 = gildedRose.items[1].quality;
        gildedRose.updateQuality();
        const finalQuality0 = gildedRose.items[0].quality;
        const finalQuality1 = gildedRose.items[1].quality;

        expect(finalQuality0 - initialQuality0).to.equal(1);
        expect(finalQuality1 - initialQuality1).to.equal(1);
      });
    });
    it("Aged Brie - quality increases by 2 when prevSellIn <= 0", function () {
      const gildedRose = new GildedRose([
        new Item("Aged Brie", 0, 5),
        new Item("Aged Brie", -1, 5),
      ]);
      const initialQuality0 = gildedRose.items[0].quality;
      const initialQuality1 = gildedRose.items[1].quality;
      gildedRose.updateQuality();
      const finalQuality0 = gildedRose.items[0].quality;
      const finalQuality1 = gildedRose.items[1].quality;

      expect(finalQuality0 - initialQuality0).to.equal(2);
      expect(finalQuality1 - initialQuality1).to.equal(2);
    });
  });

  describe("Quality threshold", function () {
    it("Quality should not drop below 0", function () {
      const gildedRose = new GildedRose([
        new Item("foo", -5, 0),
        new Item("Backstage", -5, 0),
        new Item("Aged Brie", -5, 0),
      ]);
      gildedRose.updateQuality();
      const finalQuality0 = gildedRose.items[0].quality;
      const finalQuality1 = gildedRose.items[1].quality;
      const finalQuality2 = gildedRose.items[2].quality;

      expect(finalQuality0).not.lessThan(0);
      expect(finalQuality1).not.lessThan(0);
      expect(finalQuality2).not.lessThan(0);
    });

    it("Non Sulfuras quality should not increase above 50", function () {
      const gildedRose = new GildedRose([
        new Item("foo", -5, 50),
        new Item("Backstage", -5, 50),
        new Item("Aged Brie", -5, 50),
      ]);
      gildedRose.updateQuality();
      const finalQuality0 = gildedRose.items[0].quality;
      const finalQuality1 = gildedRose.items[1].quality;
      const finalQuality2 = gildedRose.items[2].quality;

      expect(finalQuality0).not.greaterThan(50);
      expect(finalQuality1).not.greaterThan(50);
      expect(finalQuality2).not.greaterThan(50);
    });
  });

  describe("Conjured items", function () {
    it("Conjured item should change quality twice as normal", function () {
      const gildedRose = new GildedRose([
        new Item("Conjured foo", 9, 10),
        new Item("Conjured Backstage", 4, 10),
        new Item("Conjured Aged Brie", 9, 10),
      ]);
      const initialQuality0 = gildedRose.items[0].quality;
      const initialQuality1 = gildedRose.items[1].quality;
      const initialQuality2 = gildedRose.items[2].quality;
      gildedRose.updateQuality();
      const finalQuality0 = gildedRose.items[0].quality;
      const finalQuality1 = gildedRose.items[1].quality;
      const finalQuality2 = gildedRose.items[2].quality;

      expect(finalQuality0 - initialQuality0).to.equal(-2);
      expect(finalQuality1 - initialQuality1).to.equal(6);
      expect(finalQuality2 - initialQuality2).to.equal(4);
    });
  });
});
