---
to: components/<%= name %>/index.js
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