import { TaskType } from "./Task"

export type Store = {
    tasks: TaskType[],
    addTask: (id:string, title:string, state:string) => void,
    deleteTask: (id:string) => void,
    draggedTask: TaskType,
    setDraggedTask: (id:string) => void,
    moveTask: (draggedTask:TaskType, state:string) => void,
    isCopySelected: boolean,
    setCopySelected: (SelectedOption:boolean) => void
}