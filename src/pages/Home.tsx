import { observer } from 'mobx-react-lite'
import { useStore } from '../hooks/useStore'
import { useForm } from 'react-hook-form'

export const Home = observer(() => {
  const { store, loading } = useStore()
  const { register, handleSubmit } = useForm<{ name: string; due: Date }>()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Home</h1>
      <section>
        <form
          onSubmit={handleSubmit((v) => {
            store.addTask({ name: v.name, id: String(Date.now()) })
          })}
        >
          <input
            {...register('name', { required: true })}
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
            <div key={task.id}>
              {task.name} - {task.due.toLocaleDateString()}
            </div>
          )
        })}
      </section>
    </>
  )
})
