import { TaskType } from "./Task"

export type Store = {
    tasks: TaskType[],
    addTask: (id:string, title:string, state:string) => any,
    deleteTask: (id:string) => any,
    draggedTask: TaskType,
    setDraggedTask: (id:string) => void,
    moveTask: (draggedTask:TaskType, state:string) => any,
    isCopySelected: boolean,
    setCopySelected: (SelectedOption:boolean) => any
}