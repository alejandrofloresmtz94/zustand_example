import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';
import { TaskType } from '../types/Task';
import { Store } from '../types/Store';

const store = (set:Function) => ({
    tasks: [],
    addTask: (id:string, title:string, state:string) => 
        set((store:Store) => ({tasks: [...store.tasks, {id, title, state}] }), false, "addTask"),
    deleteTask: (id:string) => 
        set((store:Store) => ({tasks: store.tasks.filter((task:TaskType) => task.id !== id )}), false, "deleteTask"),
    draggedTask: {},
    setDraggedTask: (id:string) => set((store:Store) => ( id !== "" ? { draggedTask: store.tasks.filter((task:TaskType) => task.id === id )[0]} : {}), false, "setDraggedTask"),
    moveTask: (oldTask:TaskType, newState:string) => set((store:Store) => ({
        tasks: store.tasks.map((task:TaskType) =>
            task.id === oldTask.id ? { ...oldTask, state: newState } : task
        )
    }), false, "moveTask"),
    isCopySelected: false,
    setCopySelected: ((SelectedOption:boolean) => set({ isCopySelected: SelectedOption }))
});

const log = (config:Function) => (set:Function, get:Function, api:Object) => config(
    (...args:Object[]) => {
        //const current = get();
        // if(!current) {
            // get state from external source
        // }
        //console.log(args);
        set(...args)
    },
    get,
    api
)

export const useStore = create<Store>(log(persist(devtools(store), {
    name: "store"
})));