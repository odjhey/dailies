import { useContext, useEffect } from 'react'
import { ToastContext } from '../App'

export const useToast = () => {
  const toast = useContext(ToastContext)

  useEffect(() => {
    if (toast.isOpen) {
      setTimeout(() => {
        toast.hide()
      }, 2500)
    }
  }, [toast])

  return { show: toast.show }
}
