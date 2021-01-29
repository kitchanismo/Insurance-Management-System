import { GlobalProps, AlertProps } from '../contexts/globalContext'

import { useState } from 'react'

const useGlobalState = () => {
  const [alert, setAlert] = useState<AlertProps | null>(null)
  const [title, setTitle] = useState<string>('')
  const [isDark, setIsDark] = useState(false)

  return {
    isDark,
    setIsDark,
    alert,
    setAlert,
    title,
    setTitle,
  } as GlobalProps
}

export default useGlobalState
