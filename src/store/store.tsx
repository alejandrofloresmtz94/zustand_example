import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';
import { TaskType } from '../types/Task';

const store = (set:any) => ({
    tasks: [],
    addTask: (id:string, title:string, state:string) => 
        set((store:any) => ({tasks: [...store.tasks, {id, title, state}] }), false, "addTask"),
    deleteTask: (id:string) => 
        set((store:any) => ({tasks: store.tasks.filter((task:any) => task.id !== id )}), false, "deleteTask"),
    draggedTask: {},
    setDraggedTask: (id:string) => set((store:any) => ( id !== "" ? { draggedTask: store.tasks.filter((task:any) => task.id === id )[0]} : {}), false, "setDraggedTask"),
    moveTask: (oldTask:TaskType, newState:string) => set((store:any) => ({
        tasks: store.tasks.map((task:TaskType) =>
            task.id === oldTask.id ? { ...oldTask, state: newState } : task
        )
    }), false, "moveTask"),
    isCopySelected: false,
    setCopySelected: ((SelectedOption:boolean) => set({ isCopySelected: SelectedOption }))
});

const log = (config:any) => (set:any, get:any, api:any) => config(
    (...args:any[]) => {
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

export const useStore = create(log(persist(devtools(store), {
    name: "store"
})));