import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    completedTasks: 0,
    uncompletedTasks: 0,
  },
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
        state.uncompletedTasks += 1;
      },
      prepare: (taskTitle) => ({
        payload: {
          id: nanoid(),
          isImportant: false,
          isCompleted: false,
          taskTitle
        }
      })
    },
    editTask: (state, action) => {
      const { id, taskTitle } = action.payload;
      const existingTask = state.tasks.find(task => task.id === id);
      if (existingTask) {
        existingTask.taskTitle = taskTitle;
      }
    },
    deleteTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        const task = state.tasks[index];
        if (task.isCompleted) {
          state.completedTasks -= 1;
        } else {
          state.uncompletedTasks -= 1;
        }
        state.tasks.splice(index, 1);
      }
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isImportant = !task.isImportant;
      }
    },
    toggleCompleted: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
        if (task.isCompleted) {
          state.completedTasks += 1;
          state.uncompletedTasks -= 1;
        } else {
          state.completedTasks -= 1;
          state.uncompletedTasks += 1;
        }
      }
    }
  }
});

export const { addTask, editTask, deleteTask, toggleImportant, toggleCompleted } = taskSlice.actions;

export default taskSlice.reducer;
