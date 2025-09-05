"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Column {
  id: number | string;
  columnName: string;
}

const initialState: Column[] = [
  {
    id: 1,
    columnName: "todo",
  },
  {
    id: 2,
    columnName: "progress",
  },
  {
    id: 3,
    columnName: "done",
  },
];

const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    addTaskColumn: (state, action: PayloadAction<Column>) => {
      state.push(action.payload);
    },
    
  },
});

export const { addTaskColumn } = columnSlice.actions;
export default columnSlice;
