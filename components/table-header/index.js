import PropTypes from 'prop-types'
import { Container, ColumnTitle } from './table-header.css'

function TableHeader({ headings, columns }) {
  return (
    <Container columns={columns}>
      {headings.map((heading) => (
        <ColumnTitle>{heading}</ColumnTitle>
      ))}
    </Container>
  )
}

export default TableHeader

TableHeader.propTypes = {}
TableHeader.defaultProps = {}
