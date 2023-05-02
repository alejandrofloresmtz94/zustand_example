import type { ColumnProps } from "../../types/ColumnProps";
import Task from "../Task/Task";
import { useState, Fragment } from "react";
import useUuid from "../../hooks/useUuid";
import { useStore } from "../../store/store";
import { shallow } from "zustand/shallow";
import "./Column.css";
import classNames from "classnames";

const Column = ({ state }: ColumnProps) => {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
    // (prev, next) => {
    //     return true;
    // }
  );

  const addTask = useStore((store) => store.addTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const moveTask = useStore((store) => store.moveTask);
  const taskKeys = useUuid(tasks.length);

  return (
    <Fragment>
      <div
        className={ classNames("column", { drop: drop } ) }
        onDragOver={(e) => {
          setDrop(true);
          e.preventDefault();
        }}
        onDragLeave={(e) => {
          setDrop(false);
          e.preventDefault();
        }}
        onDrop={() => {
          setDrop(false);
          moveTask(draggedTask, state);
          setDraggedTask(null);
        }}
      >
        <div className="titleWrapper">
          <p>{state}</p>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add
          </button>
        </div>
        {tasks.map((task, i) => (
          <Task title={task.title} key={taskKeys[i]} />
        ))}
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
                addTask(text, state);
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
