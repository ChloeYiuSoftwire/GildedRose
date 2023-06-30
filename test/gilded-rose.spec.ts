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
      const gildedRose = new GildedRose([new Item("Sulfuras", 0, 0)]);
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
      it("Sulfuras items should not have Quality degraded", function () {
        const gildedRose = new GildedRose([new Item("Sulfuras", 5, 5)]);
        const initialQuality = gildedRose.items[0].quality;
        gildedRose.updateQuality();
        const finalQuality = gildedRose.items[0].quality;
        expect(finalQuality - initialQuality).to.equal(0);
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

    describe("Backstage amd Aged Brie", function () {
      it("Backstage amd Aged Brie - quality increases by 1 when 10 < SellIn", function () {
        const gildedRose = new GildedRose([new Item("Backstage", 11, 5)]);
        const initialQuality = gildedRose.items[0].quality;
        gildedRose.updateQuality();
        const finalQuality = gildedRose.items[0].quality;
        expect(finalQuality - initialQuality).to.equal(1);
      });

      it("Backstage amd Aged Brie - quality increases by 2 when 5 < SellIn <= 10", function () {
        const gildedRose = new GildedRose([new Item("Backstage", 7, 5)]);
        const initialQuality = gildedRose.items[0].quality;
        gildedRose.updateQuality();
        const finalQuality = gildedRose.items[0].quality;
        expect(finalQuality - initialQuality).to.equal(2);
      });

      it("Backstage amd Aged Brie - quality increases by 3 when 0 < SellIn <= 5", function () {
        const gildedRose = new GildedRose([new Item("Backstage", 1, 5)]);
        const initialQuality = gildedRose.items[0].quality;
        gildedRose.updateQuality();
        const finalQuality = gildedRose.items[0].quality;
        expect(finalQuality - initialQuality).to.equal(3);
      });

      it("Backstage amd Aged Brie - quality drops to 0 when SellIn <= 0", function () {
        const gildedRose = new GildedRose([new Item("Backstage", 0, 5)]);
        gildedRose.updateQuality();
        const finalQuality = gildedRose.items[0].quality;
        expect(finalQuality).to.equal(0);
      });
    });
  });
});
