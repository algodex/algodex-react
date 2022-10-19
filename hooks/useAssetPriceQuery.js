
import ServiceError from '@algodex/algodex-hooks';
import Spinner from '@algodex/algodex-hooks';
import {useAlgodex} from '@algodex/algodex-hooks';
import {useMemo} from 'react';
import {useQuery} from 'react-query';
import withQuery from '@algodex/algodex-hooks';

const refetchInterval = 3000;

const components = {
  Loading: Spinner,
  ServiceError,
};

/**
 * With Asset Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] withQuery Options
 * @return {JSX.Element}
 */
export function withAssetPriceQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetPriceQuery,
    components,
    ...options,
  });
}
/**
 * Use Asset Price Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @todo: Consolidate with Search
 * @return {object} Massaged Query
 */
export function useAssetPriceQuery({
  asset: algorandAsset,
  options = {
    refetchInterval,
    notifyOnChangeProps: ['data', 'error'],
  },
} = {}) {
  const {http} = useAlgodex();
  let id = undefined;
  if (algorandAsset?.id) {
    id = algorandAsset.id;
  }

  const {data: dexAsset, ...rest} = useQuery(
      ['assetPrice', {id}],
      () => http.dexd.fetchAssetPrice(id),
      options,
  );

  const retdata = useMemo(() => {
    const asset = {
      ...algorandAsset,
      price_info: dexAsset,
    };

    const retdata = {data: {asset}, ...rest};
    return retdata;
  }, [algorandAsset, dexAsset, id]);

  if (id === 0 || id === undefined) {
    return {data: undefined}
  }

  return retdata;
}

export default useAssetPriceQuery;