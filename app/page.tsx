"use client";
import ColumnForm from "@/components/ColumnForm";
import GlobalSearch from "@/components/GlobalSearch";
import { Modal } from "@/components/modal/Modal";
import TaskColumns from "@/components/TaskColumns";
import TaskForm from "@/components/TaskForm";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen1, setIsOpen1] = useState<boolean>(false);

  const [searchTerms, setSearchTerms] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  return (
    <>
      <div className="w-5xl mx-auto ">
        <h1 className="text-center text-2xl mb-5 font-bold text-blue-500">
          Kanban Board
        </h1>
        <GlobalSearch
          setSearchTerms={setSearchTerms}
          setPriorityFilter={setPriorityFilter}
          setStatusFilter={setStatusFilter}
          searchTerms={searchTerms}
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
        />
        <div className="my-5 ml-11 ">
          <button
            className="bg-blue-500 text-white px-4 py-2 border-2 hover:bg-blue-700 rounded"
            onClick={() => setIsOpen(true)}
          >
            Create Task
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 border-2 hover:bg-blue-700 rounded"
            onClick={() => setIsOpen1(true)}
          >
            Add New Column
          </button>
        </div>
        <TaskColumns
          searchTerms={searchTerms}
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
        />
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TaskForm onClose={() => setIsOpen(false)} />
      </Modal>
      <Modal isOpen={isOpen1} onClose={() => setIsOpen1(false)}>
        <ColumnForm onClose={() => setIsOpen1(false)} />
      </Modal>
    </>
  );
}
