import { useEffect, useState } from 'react'
import { RootStore } from '../models/root-store'
import localforage from 'localforage'
import { Instance, onSnapshot } from 'mobx-state-tree'

const LOCALFORAGE_STORE_KEY = 'rootStore'

export const useStore = () => {
  const [store, setStore] = useState<Instance<typeof RootStore>>(
    RootStore.create({})
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    localforage.getItem(LOCALFORAGE_STORE_KEY).then((snapshot) => {
      const rootStore = snapshot
        ? RootStore.create(snapshot)
        : RootStore.create({})

      setStore(rootStore)
      onSnapshot(rootStore, (snapshot) => {
        localforage.setItem(LOCALFORAGE_STORE_KEY, snapshot)
      })
      setLoading(false)
    })
  }, [])

  return { store, loading }
}
