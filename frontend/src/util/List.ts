export interface Item {
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

  public reset(): Item[] {
    this.list = this.list.map((item) => ({
      ...item,
      isSelected: false,
    }));
    return this.list;
  }

  public getSelected() {
    return this.list.filter((item) => item.isSelected === true);
  }

  public setSelected(key: number) {
    const newList = this.list.map((item) => {
      if (item.key === key) item.isSelected = !item.isSelected;
      return item;
    });
    this.list = newList;
    return newList;
  }

  public setMultiSelect(keys: number[]) {
    this.list = this.list.map((item) => {
      item.isSelected = keys.some((key) => key === item.key);
      return item;
    });
  }
}
