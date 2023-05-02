import classNames from "classnames";
import type { TaskProps } from "../../types/TaskProps";
import "./Task.css";
import { useStore } from "../../store/store";

const Task = ({ title }: TaskProps) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  return task ? (
    <div className="task" draggable onDragStart={() => setDraggedTask(title)}>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <button className="delBtn" onClick={() => deleteTask(title)} >Delete</button>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  ): null;
};

export default Task;
