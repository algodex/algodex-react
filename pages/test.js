import useWallets from '@/hooks/useWallets'
import { useEffect } from 'react'

export default function TestPage() {
  const { addresses, myAlgoConnect, peraConnect } = useWallets()
  useEffect(() => {
    console.log(peraConnect)
  }, [])
  return (
    <>
      <button onClick={myAlgoConnect}>MyAlgo</button>
      <button
        onClick={() => {
          peraConnect()
        }}
      >
        Pera
      </button>
      {addresses.map((addr, index) => {
        return <div key={index}>Hello {addr.address}</div>
      })}
    </>
  )
}
