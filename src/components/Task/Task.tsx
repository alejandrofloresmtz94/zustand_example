import classNames from "classnames";
import type { TaskProps } from "../../types/TaskProps";
import type { TaskType } from "../../types/Task";
import "./Task.css";
import { useStore } from "../../store/store";

const Task = ({ id }: TaskProps) => {
  const task = useStore((store) =>
    store.tasks.find((task:TaskType) => task.id === id)
  );

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  return task ? (
    <div className="task" draggable onDragStart={() => setDraggedTask(id)}>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <button className="delBtn" onClick={() => deleteTask(task.id)}>Delete</button>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  ): null;
};

export default Task;
