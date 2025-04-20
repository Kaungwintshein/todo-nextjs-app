import React from 'react';
import { Item } from '../../types';

interface Props {
  item: Item;
  onClick: () => void;
}

export default function Button({ item, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gray-100 border border-gray-300 rounded font-medium p-2 mb-2 hover:bg-gray-200 hover:cursor-pointer"
    >
      {item.name}
    </button>
  );
}
