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
    it("Non Sulfuras items should have SellIn updated", function () {
      const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
      const initialSellIn = gildedRose.items[0].sellIn;
      gildedRose.updateQuality();
      const finalSellIn = gildedRose.items[0].sellIn;
      expect(finalSellIn - initialSellIn).to.equal(-1);
    });

    it("Sulfuras items should not have SellIn updated", function () {
        const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 0, 0)]);
        const initialSellIn = gildedRose.items[0].sellIn;
        gildedRose.updateQuality();
        const finalSellIn = gildedRose.items[0].sellIn;
        expect(finalSellIn - initialSellIn).to.equal(0);
      });
  });
});
