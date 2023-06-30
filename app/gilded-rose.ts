export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality; // 0 <= quality <= 50
  }
}

export class GildedRose {
  // an array of items
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    // every time it runs, one day has passed so sellIn should drop
    for (let i = 0; i < this.items.length; i++) {
      const name = this.items[i].name;
      const sellIn = this.items[i].sellIn;
      const quality = this.items[i].quality;

      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras") {
            this.items[i].quality -= 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == "Backstage") {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality += 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality += 1;
              }
            }
          }
        }
      }

      if (this.items[i].sellIn <= 0) {
        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage") {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras") {
                this.items[i].quality -= 1;
              }
            }
          } else {
            this.items[i].quality = 0;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality += 1;
          }
        }
      }
      // update sellIn values
      this.items[i].sellIn = name == "Sulfuras" ? sellIn : sellIn - 1;
    }

    return this.items;
  }
}
