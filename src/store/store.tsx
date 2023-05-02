import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';

const store = (set:any) => ({
    tasks: [],
    addTask: (title:string, state:string) => 
        set((store:any) => ({tasks: [...store.tasks, {title, state}] }), false, "addTask"),
    deleteTask: (title:string) => 
        set((store:any) => ({tasks: store.tasks.filter((task:any) => task.title !== title )})),
    draggedTask: null,
    setDraggedTask: (title:string | null) => set({ draggedTask: title }),
    moveTask: (title:string | null, state:string) => set((store:any) => ({ 
        tasks: store.tasks.map((task:any) => 
            task.title === title ? { title, state } : task
        )
     }))
});
 
const log = (config:any) => (set:any, get:any, api:any) => config(
    (...args:any[]) => {
        //const current = get();
        // if(!current) {
            // get state from external source
        // }
        console.log(args);
        set(...args)
    },
    get,
    api
)

export const useStore = create(log(persist(devtools(store), {
    name: "store"
})));