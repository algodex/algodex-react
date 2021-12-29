import PropTypes from 'prop-types'

const DropdownFooter = () => {
  return (
    <div className="p-4">
      <p
        style={{
          fontSize: '14px',
          color: 'white',
          fontWeight: '600'
        }}
      >
        New to Algorand?
      </p>
      <p
        style={{
          fontSize: '12px',
          color: 'white',
          marginTop: '0.2rem',
          textDecoration: 'underline'
        }}
      >
        Learn More About Algorand Wallets
      </p>
    </div>
  )
}

DropdownFooter.propTypes = {
  externalLink: PropTypes.string
}

export default DropdownFooter
