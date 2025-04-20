import { create } from 'zustand';
import { Item } from '../types';

interface ItemState {
  mainList: Item[];
  fruits: Item[];
  vegetables: Item[];
  addItem: (item: Item) => void;
  moveToColumn: (item: Item) => void;
  returnToMain: (item: Item) => void;
  removeFromColumn: (item: Item) => void;
}

const useItemStore = create<ItemState>((set) => ({
  mainList: [
    { name: 'Apple', type: 'Fruit' },
    { name: 'Broccoli', type: 'Vegetable' },
    { name: 'Banana', type: 'Fruit' },
    { name: 'Carrot', type: 'Vegetable' },
  ],
  fruits: [],
  vegetables: [],
  addItem: (item) =>
    set((state) => ({
      mainList: [...state.mainList, item],
    })),
  moveToColumn: (item) =>
    set((state) => {
      const newMain = state.mainList.filter((i) => i.name !== item.name);
      if (item.type === 'Fruit') {
        return { mainList: newMain, fruits: [...state.fruits, item] };
      } else {
        return { mainList: newMain, vegetables: [...state.vegetables, item] };
      }
    }),
  returnToMain: (item) =>
    set((state) => {
      const remove = (list: Item[]) => list.filter((i) => i.name !== item.name);
      return {
        fruits: remove(state.fruits),
        vegetables: remove(state.vegetables),
        mainList: [...state.mainList, item],
      };
    }),
  removeFromColumn: (item) =>
    set((state) => {
      if (item.type === 'Fruit') {
        return {
          fruits: state.fruits.filter((i) => i.name !== item.name),
        };
      } else {
        return {
          vegetables: state.vegetables.filter((i) => i.name !== item.name),
        };
      }
    }),
}));

export default useItemStore;