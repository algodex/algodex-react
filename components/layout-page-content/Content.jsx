import { Fragment, useEffect } from 'react'
import { useEventDispatch } from '../../events'

export default function LayoutContent() {
  const dispatcher = useEventDispatch()
  useEffect(() => {
    console.log('Dispatch: loaded')
    dispatcher('loaded', 'content')
  }, [dispatcher])
  return <Fragment>{'<Content/>'}</Fragment>
}
