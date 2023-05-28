import { observer } from 'mobx-react-lite'
import { useStore } from '../hooks/useStore'
import { getSnapshot } from 'mobx-state-tree'
import { useToast } from '../hooks/useToast'

const Download = observer(() => {
  const { store } = useStore()
  return (
    <div>
      <button
        className="btn btn-sm btn-info"
        type="button"
        onClick={() => {
          const snap = JSON.stringify(getSnapshot(store))

          const b = new File([snap], 'dailies.json', {
            type: 'application/json;charset=utf-8',
          })
          window.open(window.URL.createObjectURL(b))
        }}
      >
        download
      </button>
    </div>
  )
})

export const About = () => {
  const { show } = useToast()
  return (
    <>
      <h1>Daily quests</h1>

      <div>
        <Download></Download>
      </div>
      <div>
        <button className="btn btn-xs" onClick={() => show('test toast')}>
          toast test
        </button>
      </div>
    </>
  )
}
