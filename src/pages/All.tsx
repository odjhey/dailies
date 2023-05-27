import { observer } from 'mobx-react-lite'
import { useStore } from '../hooks/useStore'
import { useForm } from 'react-hook-form'

export const All = observer(() => {
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
      <h1>All</h1>
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
        {store.allTasks().map((task) => {
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
