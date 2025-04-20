import React from 'react';
import ItemButton from './Button';
import { Item } from '../../types';

interface Props {
  title: string;
  items: Item[];
  onItemClick: (item: Item) => void;
}

export default function Column({ title, items, onItemClick }: Props) {
  return (
    <div className="flex-1 border rounded shadow overflow-hidden">
      {title && <h2 className="text-lg font-bold border-b-[1px] mb-2 text-center bg-gray-200 py-2">{title}</h2>}
      <div className="mx-2">
        {items.map((item) => (
          <ItemButton key={item.name} item={item} onClick={() => onItemClick(item)} />
        ))}
      </div>

    </div>
  );
}
