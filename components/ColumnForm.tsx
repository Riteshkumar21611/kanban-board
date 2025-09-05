"use client";
import { addTaskColumn } from "@/Redux/slices/columnSlice";
import { RootState } from "@/Redux/store";
import React, { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ColumnForm({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<{ id: string | null; name: string }>({
    id: null,
    name: "",
  });
  const id = useId();

  const columnName = useSelector((state: RootState) => state.column);

  const dispatch = useDispatch();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: id,
      columnName: status.name,
    };
    dispatch(addTaskColumn(payload));
    alert("colum add sucessfully");
    onClose();
  };

  console.log(columnName, `<<<`);

  return (
    <div className="">
      <h1 className="font-medium text-2xl text-blue-400">New Status</h1>
      <form action="" className="grid grid-cols-1 gap-1.5">
        <div className="mt-5">
          <label htmlFor="" className="text-blue-500 text-[14px]">
            Status
          </label>
          <input
            type="text"
            name="status"
            id="status"
            className="w-full border-blue-500 border outline-blue-400  mb-2 py-2 rounded text-blue-600 px-2"
            onChange={(e) => setStatus({ ...status, name: e.target.value })}
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 border-2 hover:bg-blue-700 rounded"
          onClick={handleAddTask}
        >
          Add New Column
        </button>
      </form>
    </div>
  );
}

export default ColumnForm;
