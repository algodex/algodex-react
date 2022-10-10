/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
