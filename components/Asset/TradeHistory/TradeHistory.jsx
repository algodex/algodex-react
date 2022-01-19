import Spinner from 'components/Spinner'
import Error from 'components/Error'
import { floatToFixed } from 'services/display'
import PropTypes from 'prop-types'
import { useAssetTradeHistoryQuery } from 'hooks/useAlgodex'
import styled from 'styled-components'
import { rgba } from 'polished'
import { BodyCopyTiny, HeaderCaps } from 'components/Typography'
import useTranslation from 'next-translate/useTranslation'
import Icon from 'components/Icon'
import Big from 'big.js'
import dayjs from 'dayjs'

const AssetTradeHistorySection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  // display: ${({ active }) => (active ? 'flex' : 'none')};
  // height: calc(100% - 50px);
  // @media (min-width: 996px) {
  //   grid-area: history;
  //   display: flex;
  //   height: inherit;
  // }
`
const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: 0.75rem 0.625rem 1rem;
`

const gridStyles = `
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.25rem;
`

const Header = styled.header`
  flex-shrink: 0%;
  display: grid;
  ${gridStyles}
  padding: 0 0.5rem 0.75rem;
`

const Trades = styled.div`
  flex: 1 1 0%;
  position: relative;
  overflow: hidden scroll;
`

const TradesWrapper = styled.div`
  flex: 1 1 0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: visible;
`

const TradesRow = styled.div`
  display: grid;
  ${gridStyles}
  padding: 0 0.5rem;
  transition: background-color 150ms ease-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, type }) => {
      const color = type === 'buyASA' ? 'green' : 'red'
      return rgba(theme.colors[color]['500'], 0.15)
    }};

    p {
      &:not(:first-child) {
        color: ${({ theme }) => theme.colors.gray['000']};
      }
    }
  }
`

const PriceHeaderText = styled(BodyCopyTiny)`
  display: flex;
  align-items: center;
  margin: 0;
  color: ${({ theme }) => theme.colors.gray['500']};

  svg {
    margin-left: 0.25rem;
  }
`

const PriceHeader = () => {
  const { t } = useTranslation('common')
  return (
    <PriceHeaderText>
      {t('price')}
      <Icon use="algoLogo" size={0.625} />
    </PriceHeaderText>
  )
}

/**
 * @todo Refactor to AssetTradeHistory withAssetTradeHistoryQuery
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function TradeHistoryView(props) {
  const { asset, tradesData } = props
  const { t } = useTranslation('common')
  const hasTradeHistory = tradesData.length > 0

  const renderHistory = () => {
    const getColor = (type) => (type === 'buyASA' ? 'green.500' : 'red.500')

    return tradesData
      .sort((a, b) => {
        if (a.timestamp === b.timestamp) {
          return a.id > b.id ? -1 : 1
        }
        return b.timestamp - a.timestamp
      })
      .map((row) => {
        const amount = new Big(row.amount)

        return (
          <TradesRow key={row.id} type={row.type} data-testid="trade-history-row">
            <BodyCopyTiny
              fontFamily="'Roboto Mono', monospace"
              color={getColor(row.type)}
              title={row.price}
              m={0}
            >
              {floatToFixed(row.price)}
            </BodyCopyTiny>
            <BodyCopyTiny
              fontFamily="'Roboto Mono', monospace"
              color="gray.400"
              textAlign="right"
              title={amount.toFixed(asset.decimals)}
              m={0}
            >
              {amount.toFixed(Math.min(3, asset.decimals))}
            </BodyCopyTiny>
            <BodyCopyTiny
              fontFamily="'Roboto Mono', monospace"
              color="gray.400"
              textAlign="right"
              title={dayjs(row.timestamp).format('lll')}
              m={0}
            >
              {dayjs(row.timestamp).format('HH:mm:ss')}
            </BodyCopyTiny>
          </TradesRow>
        )
      })
  }

  return (
    <AssetTradeHistorySection>
      <Container>
        <HeaderCaps color="gray.500" mb={1}>
          {t('trade-history')}
        </HeaderCaps>
        <br />
        <Header>
          <PriceHeader />
          <BodyCopyTiny color="gray.500" textAlign="right" m={0}>
            {t('amount')}
          </BodyCopyTiny>
          <BodyCopyTiny color="gray.500" textAlign="right" m={0}>
            {t('time')}
          </BodyCopyTiny>
        </Header>
        <Trades>
          <TradesWrapper>
            {hasTradeHistory ? (
              renderHistory()
            ) : (
              <BodyCopyTiny color="gray.600" textAlign="center" m={4}>
                {t('no-trades-completed')}
              </BodyCopyTiny>
            )}
          </TradesWrapper>
        </Trades>
      </Container>
    </AssetTradeHistorySection>
  )
}

TradeHistoryView.propTypes = {
  asset: PropTypes.object.isRequired,
  tradesData: PropTypes.array.isRequired
}

/**
 * @todo Move into TradeHistoryView
 * @deprecated
 * @param asset
 * @returns {JSX.Element}
 * @constructor
 */
export default function TradeHistory({ asset }) {
  const { status, data } = useAssetTradeHistoryQuery({ asset })

  if (status === 'loading') {
    return <Spinner flex />
  }
  if (status === 'error') {
    return <Error message="Error loading trade history" flex />
  }

  const tradesData =
    data?.transactions.map((txn) => ({
      id: txn.PK_trade_history_id,
      type: txn.tradeType,
      price: floatToFixed(txn.formattedPrice),
      amount: txn.formattedASAAmount,
      timestamp: txn.unix_time * 1000
    })) || []

  if (!asset?.id) {
    return <Spinner flex />
  }
  return <TradeHistoryView asset={asset} tradesData={tradesData} />
}
TradeHistory.propTypes = {
  asset: PropTypes.object.isRequired
}
