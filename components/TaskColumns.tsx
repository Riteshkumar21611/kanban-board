import { Column } from "@/Redux/slices/columnSlice";
import { deleteTasks, moveTask, task } from "@/Redux/slices/TaskSlice";
import { RootState } from "@/Redux/store";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./modal/Modal";
import TaskForm from "./TaskForm";

type props = {
  searchTerms: string;
  priorityFilter: string;
  statusFilter: string;
};

const TaskColumns: React.FC<props> = ({
  searchTerms,
  priorityFilter,
  statusFilter,
}) => {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.column);
  const tasks = useSelector((state: RootState) => state.task);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<task>();
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const deleteTask = (id: string) => {
    dispatch(deleteTasks(id));
  };

  const editTaskDetail = (item: task) => {
    setEditTask(item);
    setIsOpen(true);
  };

  const getFilteredData = (column: string) => {
    let allTask = tasks.filter((task: task) => task.status === column);
    if (searchTerms) {
      allTask = allTask.filter(
        (task) =>
          task.title.toLocaleLowerCase().includes(searchTerms.toLowerCase()) ||
          task.description
            .toLocaleLowerCase()
            .includes(searchTerms.toLowerCase())
      );
    }
    if (priorityFilter) {
      allTask = allTask.filter(
        (task) => task.priority.toLowerCase() === priorityFilter.toLowerCase()
      );
    }
    if (statusFilter) {
      allTask = allTask.filter(
        (task) => task.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    return allTask;
  };

  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    setDraggedTaskId(taskId);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", taskId);
  };

  const dragEndHandler = () => {
    setDraggedTaskId(null);
    setDragOverCol(null);
    setDragOverIdx(null);
  };

  const dragOverHandler = (
    event: React.DragEvent<HTMLDivElement>,
    colName: string,
    index: number
  ) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move"; 
    setDragOverCol(colName);
    setDragOverIdx(index);
  };

  // New handler for column-level drag over (empty columns)
  const columnDragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const dropHandler = (
    event: React.DragEvent<HTMLDivElement>,
    colName: string,
    index: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const id = event.dataTransfer.getData("text/plain");
    if (id) {
      console.log(
        id,
        `<<<what is this type of id
        `
      );
      dispatch(moveTask({ id, newStatus: colName, newIndex: index }));
    }
    setDraggedTaskId(null);
    setDragOverCol(null);
    setDragOverIdx(null);
  };

  return (
    <div className="mx-11 border border-blue-500 rounded p-4">
      <h1 className="text-xl font-medium text-blue-600">Task List</h1>

      <div className="grid grid-cols-4 mt-5 gap-4">
        {columns.map((col: Column) => {
          const filteredTask = getFilteredData(col.columnName);

          return (
            <div
              className={`border-2 border-blue-500 rounded bg-white min-h-40 ${
                filteredTask.length === 0 && dragOverCol === col.columnName
                  ? "bg-blue-50 border-2 border-dashed border-blue-400"
                  : ""
              }`}
              key={col?.id}
              onDragOver={
                filteredTask.length === 0 ? columnDragOverHandler : undefined
              }
              onDrop={
                filteredTask.length === 0
                  ? (event) => dropHandler(event, col.columnName, 0)
                  : undefined
              }
            >
              <h1 className="text-center my-2 font-medium text-gray-500">
                {col.columnName.charAt(0).toUpperCase() +
                  col.columnName.substring(1)}
              </h1>

              {filteredTask.length === 0 ? (
                <div className="flex items-center justify-center min-h-32 text-gray-500">
                  {dragOverCol === col.columnName ? (
                    <div className="text-blue-700 font-medium">
                      Drop task here
                    </div>
                  ) : (
                    <div>No tasks yet</div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {/* Drop zone at the beginning */}
                  <div
                    className={`w-[90%] transition-all duration-200 ${
                      dragOverCol === col.columnName && dragOverIdx === 0
                        ? "h-12 bg-blue-200 border-2 border-dashed border-blue-400 rounded my-2 flex items-center justify-center text-blue-700 font-medium"
                        : "h-2"
                    }`}
                    onDragOver={(e) => dragOverHandler(e, col.columnName, 0)}
                    onDrop={(e) => dropHandler(e, col.columnName, 0)}
                  >
                    {dragOverCol === col.columnName &&
                      dragOverIdx === 0 &&
                      "Drop here"}
                  </div>

                  {filteredTask.map((item: task, index: number) => (
                    <React.Fragment key={item.id}>
                      <div
                        className={`min-w-[90%] border border-gray-200 mb-2 p-2 m-2 rounded cursor-move ${
                          draggedTaskId === item.id ? "opacity-50 scale-95" : ""
                        }`}
                        draggable
                        onDragStart={(event) =>
                          dragStartHandler(event, item.id)
                        }
                        onDragEnd={dragEndHandler}
                      >
                        <div className="flex justify-end gap-2">
                          <CiEdit
                            className="cursor-pointer"
                            onClick={() => editTaskDetail(item)}
                          />
                          <MdDeleteForever
                            onClick={() => deleteTask(item?.id)}
                            className="cursor-pointer text-red-500"
                          />
                        </div>

                        <h1 className="text-xs font-bold mb-1">
                          {item?.title}
                        </h1>
                        <p className="text-sm text-gray-600 mb-2">
                          {item?.description}
                        </p>
                        <p className="bg-green-500 px-2 py-1 text-white text-xs rounded inline-block">
                          {item?.priority}
                        </p>
                      </div>

                      {/* Drop zone after each task */}
                      <div
                        className={`w-[90%] transition-all duration-200 ${
                          dragOverCol === col.columnName &&
                          dragOverIdx === index + 1
                            ? "h-12 bg-blue-200 border-2 border-dashed border-blue-400 rounded my-2 flex items-center justify-center text-blue-700 font-medium"
                            : "h-2"
                        }`}
                        onDragOver={(e) =>
                          dragOverHandler(e, col.columnName, index + 1)
                        }
                        onDrop={(e) =>
                          dropHandler(e, col.columnName, index + 1)
                        }
                      >
                        {dragOverCol === col.columnName &&
                          dragOverIdx === index + 1 &&
                          "Drop here"}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TaskForm onClose={() => setIsOpen(false)} data={editTask} />
      </Modal>
    </div>
  );
};

export default TaskColumns;
