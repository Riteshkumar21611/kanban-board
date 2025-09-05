import { RootState } from "@/Redux/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  searchTerms: string;
  priorityFilter: string;
  statusFilter: string;
  setSearchTerms: React.Dispatch<React.SetStateAction<string>>;
  setPriorityFilter: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalSearch: React.FC<Props> = ({
  setSearchTerms,
  setPriorityFilter,
  setStatusFilter,
  searchTerms,
  priorityFilter,
  statusFilter,
}) => {
  const status = useSelector((state: RootState) => state.column);

  const handleClearFilter = () => {
    setSearchTerms("");
    setPriorityFilter("");
    setStatusFilter("");
  };

  return (
    <>
      <div className="flex gap-1 justify-center items-center">
        <input
          className="w-1/2 outline-blue-500 pl-2 py-2 border-2 border-blue-500 rounded text-[14px] bg-white text-blue-600"
          placeholder="Enter keyword to search ..."
          onChange={(e) => setSearchTerms(e.target.value)}
          value={searchTerms}
        />
        <select
          name="status"
          className="w-1/5 outline-blue-500 pl-2 py-2 border-2 border-blue-500 rounded text-[14px] bg-white text-blue-600"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option>Select</option>

          {status.map((item) => (
            <option key={item?.id} value={item?.columnName}>
              {item?.columnName.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          name="priority"
          className="w-1/5 outline-blue-500 pl-2 py-2 border-2 border-blue-500 rounded text-[14px] bg-white text-blue-600"
          onChange={(e) => setPriorityFilter(e.target.value)}
          value={priorityFilter}
        >
          <option>Select</option>
          <option value="high">HIGH</option>
          <option value="medium">MEDIUM</option>
          <option value="low">LOW</option>
        </select>
        <button
          className="bg-blue-500 text-white py-2 rounded px-2 cursor-pointer hover:bg-blue-800"
          onClick={handleClearFilter}
        >
          clearAll
        </button>
      </div>
    </>
  );
};

export default GlobalSearch;
