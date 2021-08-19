import useTestnet from 'hooks/use-testnet'

const TestnetGate = ({ children }) => {
  const hasAccess = useTestnet()

  return hasAccess ? children : null
}

export default TestnetGate
