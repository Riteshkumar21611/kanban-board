import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
}

const taskSlice = createSlice({
  name: "task",
  initialState: [] as task[],
  reducers: {
    createTask: (state, action: PayloadAction<task>) => {
      state.push(action.payload);
    },
    updateTasks: (state, action: PayloadAction<task>) => {
      const index = state.findIndex((item) => item?.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTasks: (state, action: PayloadAction<String>) => {
      return state.filter((item) => item?.id != action.payload);
    },
    moveTask: (state, action: PayloadAction<{
      id: string|undefined;
      newStatus: string;
      newIndex: number;
    }>) => {
      const { id, newStatus, newIndex } = action.payload;
      const taskIndex = state.findIndex((task) => task.id === id);
      
      if (taskIndex === -1) return;

      const [movedTask] = state.splice(taskIndex, 1);
      const updatedTask = { ...movedTask, status: newStatus };

      const targetColumnTasks = state.filter(task => task.status === newStatus);

      if (targetColumnTasks.length === 0 || newIndex >= targetColumnTasks.length) {
        state.push(updatedTask);
      } else {
        const referenceTask = targetColumnTasks[newIndex];
        const insertIndex = state.indexOf(referenceTask);
        state.splice(insertIndex, 0, updatedTask);
      }

      
    },
  },
});

export const { createTask, deleteTasks, updateTasks,moveTask } = taskSlice.actions;
export default taskSlice;
