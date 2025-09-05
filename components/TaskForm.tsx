import { Column } from "@/Redux/slices/columnSlice";
import { createTask, task, updateTasks } from "@/Redux/slices/TaskSlice";
import { RootState } from "@/Redux/store";
import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TaskForm({ onClose, data }: { onClose: () => void; data?: task }) {
  const dispatch = useDispatch();
  const id = useId();
  const [taskDetail, setTaskDetail] = useState<task>({
    id: "",
    title: "",
    description: "",
    priority: "",
    status: "",
  });

  const status = useSelector((state: RootState) => state.column);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setTaskDetail({ ...taskDetail, [name]: value });
  };

  const submitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) {
      const payload = { ...taskDetail, id: id };
      dispatch(createTask(payload));
      alert("Task created sucessfully");
    } else {
      dispatch(updateTasks(taskDetail));
      alert("Task updated sucessfully");
    }

    onClose();
  };

  useEffect(() => {
    if (data) {
      setTaskDetail((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  return (
    <div className="">
      <h1 className="font-medium text-2xl text-blue-400">Create Task</h1>
      <form
        action=""
        className="grid grid-cols-1 gap-1.5"
        onSubmit={submitTask}
      >
        <div className="mt-5">
          <label htmlFor="" className="text-blue-500 text-[14px]">
            Title
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            id="title"
            value={taskDetail.title}
            className="w-full border-blue-500 border outline-blue-400  mb-2 py-2 rounded text-blue-600 px-2"
          />
        </div>
        <div>
          <label htmlFor="" className="text-blue-500 text-[14px]">
            Description
          </label>
          <textarea
            onChange={handleChange}
            name="description"
            id="description"
            value={taskDetail.description}
            className="w-full border-blue-500 border outline-blue-400  mb-2 py-2 rounded text-blue-600 px-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-blue-500 text-[14px]">
            Priority
          </label>
          <select
            onChange={handleChange}
            name="priority"
            value={taskDetail.priority}
            id=""
            className="w-full border-blue-500 border outline-blue-400  mb-2 py-2 rounded text-blue-600 px-2 "
          >
            <option value="">Select</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-blue-500 text-[14px]">
            Status
          </label>
          <select
            onChange={handleChange}
            value={taskDetail?.status}
            name="status"
            id=""
            className="w-full border-blue-500 border outline-blue-400  mb-2 py-2 rounded text-blue-600 px-2 "
          >
            <option value="">select</option>
            {status.map((item) => (
              <option
                key={item?.id}
                value={item.columnName || taskDetail?.status}
              >
                {item?.columnName}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 border-2 hover:bg-blue-700 rounded"
          type="submit"
        >
          {data ? "update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
