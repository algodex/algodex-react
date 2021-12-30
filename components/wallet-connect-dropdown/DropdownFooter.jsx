import PropTypes from 'prop-types'

const DropdownFooter = () => {
  return (
    <div className="p-4">
      <p className="text-xs text-white font-semibold">New to Algorand?</p>
      <p className="text-xs text-white underline mt-1">Learn More About Algorand Wallets</p>
    </div>
  )
}

DropdownFooter.propTypes = {
  externalLink: PropTypes.string
}

export default DropdownFooter
