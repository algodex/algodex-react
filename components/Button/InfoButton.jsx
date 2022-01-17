import { Info } from 'react-feather'
import IconButton from './IconButton'
/**
 * InfoButton
 *
 * Properties are passed to react-feather and IconButton
 *
 * @see https://www.npmjs.com/package/react-feather
 * @param {object} props Component Properties
 * @returns {JSX.Element}
 * @constructor
 */
const InfoButton = (props) => {
  return (
    <IconButton type="button" {...props}>
      <Info {...props} />
    </IconButton>
  )
}

export default InfoButton
