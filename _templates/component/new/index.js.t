---
to: components/<%= name %>/index.jsx
---
<% const comp = h.inflection.undasherize(name) -%>
import PropTypes from 'prop-types'
import {} from './<%= name %>.css'

function <%= comp %> (props){
  return(
    <> 
    </>
  )
}  

export default <%= comp %>

<%= comp %>.propTypes = {};
<%= comp %>.defaultProps = {};