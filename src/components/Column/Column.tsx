import type { ColumnProps } from "../../types/ColumnProps";
import type { TaskType } from "../../types/Task";
import Task from "../Task/Task";
import classNames from "classnames";
import { useState, Fragment } from "react";
import { useStore } from "../../store/store";
import { shallow } from "zustand/shallow";
import "./Column.css";
import { nanoid } from "nanoid";

const Column = ({ state }: ColumnProps) => {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task:TaskType) => task.state === state),
    shallow
    // (prev, next) => {
    //     return true;
    // }
  );

  const addTask = useStore((store) => store.addTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const moveTask = useStore((store) => store.moveTask);
  const isCopySelected = useStore((store) => store.isCopySelected);

  return (
    <Fragment>
      <div
        className={ classNames("column", { drop: drop } ) }
        onDragOver={(e) => {
          e.preventDefault();
          setDrop(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDrop(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDrop(false);
          if(isCopySelected) {
            addTask(nanoid(), draggedTask.title, state);
            setDraggedTask("");
          } else {
            moveTask(draggedTask, state);
            setDraggedTask("");
          }
        }}
      >
        <div className="titleWrapper">
          <p className={classNames("status", state)} >{state}</p>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add
          </button>
        </div>
        { tasks.length > 0 ? tasks.map((task:TaskType) => (
          <Task id={task.id} key={task.id} />
        )): (
          <div className="noTasks">No tasks</div>
        ) }
      </div>
      {isOpen && (
        <div className="Modal">
          <div className="modalContent">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              onClick={() => {
                addTask(nanoid(), text, state);
                setText("");
                setIsOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Column;
