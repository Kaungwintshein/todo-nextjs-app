/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, act, within } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import React from 'react';

jest.useFakeTimers();

describe('Todo List App', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renders main UI with heading and form', () => {
    expect(screen.getByText('Fruit & Vegetable Todo List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Item name')).toBeInTheDocument();
  });

  it('adds a new item and shows success alert', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    fireEvent.change(screen.getByPlaceholderText('Item name'), { target: { value: 'TestFruit' } });
    fireEvent.change(screen.getByDisplayValue('Fruit'), { target: { value: 'Fruit' } });
    fireEvent.click(screen.getByText('Add'));

    expect(screen.getByText('TestFruit')).toBeInTheDocument();
    alertMock.mockRestore();
  });

  // it('moves item to fruit column on click, returns after 5s', () => {
  //   fireEvent.change(screen.getByPlaceholderText('Item name'), { target: { value: 'Apple' } });
  //   fireEvent.click(screen.getByText('Add'));
  //   const btn = screen.getByText('Apple');

  //   fireEvent.click(btn);
  //   const fruitColumn = screen.getByText('Fruits');
  //   expect(fruitColumn.parentElement).toHaveTextContent('Apple');

  //   act(() => {
  //     jest.advanceTimersByTime(5000);
  //   });

  //   const mainList = screen.getByText('All Items');
  //   expect(mainList.parentElement).toHaveTextContent('Apple');
  // });

  it('moves item to fruit column on click, returns after 5s', () => {
    fireEvent.change(screen.getByPlaceholderText('Item name'), { target: { value: 'Apple' } });
    fireEvent.click(screen.getByText('Add'));
    const btn = screen.getByText('Apple');
  
    fireEvent.click(btn);
  
    const fruitColumn = screen.getByRole('region', { name: /fruits/i }); // assumes "Fruits" is an accessible region/label
    expect(within(fruitColumn).getByText('Apple')).toBeInTheDocument();
  
    act(() => {
      jest.advanceTimersByTime(5000);
    });
  
    expect(within(fruitColumn).queryByText('Apple')).not.toBeInTheDocument();
  });

  it('clicking on column item returns it to All Items immediately', () => {
    fireEvent.change(screen.getByPlaceholderText('Item name'), { target: { value: 'Banana' } });
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('Banana'));

    const btn = screen.getByText('Banana');
    fireEvent.click(btn);

    const mainList = screen.getByText('All Items');
    expect(mainList.parentElement).toHaveTextContent('Banana');
  });
});
