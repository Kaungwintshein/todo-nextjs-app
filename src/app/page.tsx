'use client';

import React from 'react';
import useItemStore from '@/store/itemStore';
import Column from './components/Column';
import CreateForm from './components/Form';
import { useRef } from 'react';
import { Item } from '@/types';

export default function Home() {
  const { mainList, fruits, vegetables, moveToColumn, returnToMain } = useItemStore();
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const handleMainClick = (item: Item) => {
    moveToColumn(item);
    timers.current[item.name] = setTimeout(() => {
      returnToMain(item);
    }, 5000);
  };

  const handleColumnClick = (item: Item) => {
    clearTimeout(timers.current[item.name]);
    returnToMain(item);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Fruit & Vegetable Todo List</h1>
      <CreateForm />
      <div className="flex gap-4">
        <Column title="" items={mainList} onItemClick={handleMainClick} />
        <Column title="Fruits" items={fruits} onItemClick={handleColumnClick} />
        <Column title="Vegetables" items={vegetables} onItemClick={handleColumnClick} />
      </div>
    </main>
  );
}
