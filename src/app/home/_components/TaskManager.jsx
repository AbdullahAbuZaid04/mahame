'use client'

import { useOptimistic } from 'react'
import AddTaskForm from './AddTaskForm'
import TaskList from './TaskList'

export default function TaskManager({ tasks, filter }) {
  const [optimisticTasks, addOptimistic] = useOptimistic(
    tasks,
    (state, { type, task }) => {
      switch (type) {
        case 'add':
          return [...state, task];
        case 'toggle':
          return state.map(t =>
            t.id === task.id ? { ...t, ...task } : t
          );
        case 'update':
          return state.map(t =>
            t.id === task.id ? { ...t, ...task } : t
          );
        case 'delete':
          return state.filter(t => t.id !== task.id);
        default:
          return state;
      }
    }
  );

  return (
    <>
      <AddTaskForm addOptimistic={addOptimistic} />
      <TaskList tasks={optimisticTasks} filter={filter} addOptimistic={addOptimistic} />
    </>
  )
}
