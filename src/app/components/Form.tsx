import React, { useState } from 'react';
import { ItemType } from '../../types';
import useItemStore from '../../store/itemStore';

export default function Form() {
  const [name, setName] = useState('');
  const [type, setType] = useState<ItemType>('Fruit');
  const addItem = useItemStore((state) => state.addItem);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addItem({ name, type });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mr-2"
      />
      <select value={type} onChange={(e) => setType(e.target.value as ItemType)} className="border px-2 py-[11px] mr-2">
        <option value="Fruit">Fruit</option>
        <option value="Vegetable">Vegetable</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer">
        Add
      </button>
    </form>
  );
}
