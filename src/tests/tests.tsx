import { Store } from "../types/Store";
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import TestComponent from "./components/TestComponent";

test('should return default value at the start', () => {
    const selector = (store:Store) => store.tasks;
    const effect = vi.fn();
    render(<TestComponent selector={selector} effect={effect} />)
    expect(effect).toHaveBeenCalledWith([]);
});

test('should add an item to the store and rerun the effect', () => {
    const selector = (store:Store) => ({tasks: store.tasks, addTask: store.addTask});
    const effect = vi.fn().mockImplementation((items) => {
        if(items.tasks.length === 0) {
            items.addTask("1234", "Test", "ONGOING");
        }
    });
    
    render(<TestComponent selector={selector} effect={effect} />)
    expect(effect).toHaveBeenCalledTimes(2);
    expect(effect).toHaveBeenCalledWith(expect.objectContaining({tasks: [{ id: "1234", title: "Test", state: "ONGOING" }]}));
});