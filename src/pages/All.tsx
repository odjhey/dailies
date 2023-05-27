import { observer } from 'mobx-react-lite'
import { useStore } from '../hooks/useStore'
import { IconCheck, IconX } from '@tabler/icons-react'

export const All = observer(() => {
  const { store, loading } = useStore()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>All</h1>
      <section>
        {store.allTasks().map((task) => {
          return (
            <div className="flex justify-between p-1" key={task.id}>
              {task.name} - {task.due.toLocaleDateString()}
              {task.done ? (
                <IconCheck
                  onClick={() => {
                    store.tasks.get(task.id)?.undone()
                  }}
                ></IconCheck>
              ) : (
                <IconX
                  onClick={() => {
                    store.tasks.get(task.id)?.markDone()
                  }}
                ></IconX>
              )}
            </div>
          )
        })}
      </section>
    </>
  )
})
