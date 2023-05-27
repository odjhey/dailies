import { types } from 'mobx-state-tree'

const Task = types
  .model({
    id: types.identifier,
    name: types.string,
    due: types.optional(types.Date, new Date()),
    done: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    markDone() {
      self.done = true
    },
    undone() {
      self.done = false
    },
  }))

export const RootStore = types
  .model({
    tasks: types.optional(types.map(Task), {}),
  })
  .views((self) => ({
    tasksToday() {
      return [...self.tasks.values()].filter(
        (task) =>
          task.due.toLocaleDateString() === new Date().toLocaleDateString()
      )
    },
    allTasks() {
      return [...self.tasks.values()]
    },
  }))
  .actions((self) => {
    return {
      addTask: (task: { id: string; name: string; due: Date }) => {
        self.tasks.put(task)
      },
    }
  })
