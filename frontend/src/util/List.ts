interface Item {
  key: number;
  name: string;
  isSelected: boolean;
}

export class List {
  private list: Item[];

  public constructor(list: Item[]) {
    this.list = list;
  }

  public getList() {
    return this.list;
  }

  public getSelected() {
    return this.list.filter((item) => item.isSelected === true);
  }

  public setSelected(key: number) {
    this.list = this.list.map((item) => {
      item.isSelected = item.key === key;
      return item;
    });
  }

  public setMultiSelect(keys: number[]) {
    this.list = this.list.map((item) => {
      item.isSelected = keys.some((key) => key === item.key);
      return item;
    });
  }
}
