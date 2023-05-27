import { observer } from 'mobx-react-lite'
import { useStore } from '../hooks/useStore'
import { useForm } from 'react-hook-form'
import { IconCheck, IconX } from '@tabler/icons-react'

export const Home = observer(() => {
  const { store, loading } = useStore()
  const { register, handleSubmit, reset, setFocus } = useForm<{
    name: string
    due: Date
  }>()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Home</h1>
      <section>
        <form
          onSubmit={handleSubmit((v) => {
            store.addTask({ name: v.name, id: String(Date.now()), due: v.due })
            reset()
            setFocus('name')
          })}
        >
          <input
            {...register('name', { required: true })}
            className="input input-bordered"
          ></input>
          <input
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            {...register('due', { valueAsDate: true, required: true })}
            className="input input-bordered"
          ></input>
          <button type="submit" className="btn btn-primary">
            save
          </button>
        </form>
      </section>
      <section>
        {store.tasksToday().map((task) => {
          return (
            <div key={task.id} className="p-2 flex justify-between">
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
