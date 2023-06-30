export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const name = this.items[i].name;
      const prevSellIn = this.items[i].sellIn;
      const multiplier = name.includes("Conjured") ? 2 : 1;

      if (name.includes("Conjured")) {
        console.log();
      }

      // update quality
      switch (true) {
        case name.includes("Sulfuras"):
          this.items[i].quality = 80;
          break;
        case name.includes("Backstage"):
          switch (true) {
            case prevSellIn <= 0:
              this.items[i].quality = 0;
              break;
            case prevSellIn <= 5:
              this.items[i].quality += 3 * multiplier;
              break;
            case prevSellIn <= 10:
              this.items[i].quality += 2 * multiplier;
              break;
            default:
              this.items[i].quality += 1 * multiplier;
              break;
          }
          break;
        case name.includes("Aged Brie"):
          switch (true) {
            case prevSellIn <= 0:
              this.items[i].quality += 2 * multiplier;
              break;
            default:
              this.items[i].quality += 1 * multiplier;
              break;
          }
          break;
        default: // normal items
          console.log(name);
          switch (true) {
            case prevSellIn <= 0:
              this.items[i].quality -= 2 * multiplier;
              break;
            default:
              this.items[i].quality -= 1 * multiplier;
              break;
          }
          break;
      }

      // check threshold
      const qualityBeforeThreshold = this.items[i].quality;
      if (!name.includes("Sulfuras")) {
        this.items[i].quality =
          qualityBeforeThreshold < 0 ? 0 : this.items[i].quality; // quality >= 0
        this.items[i].quality =
          qualityBeforeThreshold > 50 ? 50 : this.items[i].quality; // quality <= 50
      }

      // update sellIn values
      this.items[i].sellIn = name.includes("Sulfuras")
        ? prevSellIn
        : prevSellIn - 1;

      /*
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == "Backstage") {
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
      if (this.items[i].name != "Sulfuras") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage") {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    */
    }
    return this.items;
  }
}
