import Tab from '@/components/Tab'
import Tabs from '@/components/Tabs'
import PropType from 'prop-types'
import useTranslation from 'next-translate/useTranslation'

function ExecutionToggle({ order, onChange }) {
  const { t } = useTranslation('place-order')
  return (
    <Tabs
      sx={{ marginBottom: '16px' }}
      textColor="primary"
      onChange={(e, value) => onChange(e, 'execution', value)}
      aria-label="secondary tabs example"
      value={order.execution}
    >
      <Tab label={t('limit')} value={order.execution !== 'market' ? order.execution : 'both'} />
      <Tab label={t('market')} value="market" />
    </Tabs>
  )
}
ExecutionToggle.propTypes = {
  onChange: PropType.func,
  order: PropType.shape({
    execution: PropType.string.isRequired
  }).isRequired
}
export default ExecutionToggle
