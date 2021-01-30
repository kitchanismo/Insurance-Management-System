import GlobalContext from 'contexts/globalContext'
import { useContext } from 'react'

export const clientDecorator = (title: string) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  let method = descriptor.value
  descriptor.value = function (props: any) {
    const { setTitle } = useContext(GlobalContext)!
    setTitle(title)
    return method.call(this, props)
  }
}
