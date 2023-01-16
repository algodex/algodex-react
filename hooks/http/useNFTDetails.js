/*
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021-2022 Algodex VASP (BVI) Corp.
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

import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
const refetchInterval = 3000;
import withQuery from '../utils/withQuery';
import Spinner from '../components/Spinner';
import ServiceError from '../components/ServiceError';
import useAlgodex from '../useAlgodex.js';

const components = {
  Loading: Spinner,
  ServiceError,
};
/**
 *
 * @param {JSX.Element} Component
 * @param {object} [options]
 * @return {JSX.Element}
 */
export function withNFTDetailsQuery(Component, options) {
  return withQuery(Component, {
    hook: useNFTDetailsQuery,
    components,
    ...options,
  });
}

/**
 * Use Asset Orders Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @return {object} React Query Results
 */
export function useNFTDetailsQuery({
  options = {
    refetchInterval,
  },
} = {}) {
  // const {http} = useAlgodex();
  // console.log('hello', http.dexd.fetchNFTDetails())
  // const {id} = asset;
  const id = 15322902;
  // const {data, isLoading, ...rest} = useQuery(
  //     ['fetchNFTDetails', {id}],
  //     () => http.dexd.fetchNFTDetails(),
  //     options,
  // );
  console.log('Hello')
  // return {data: { nftDetail: data }}
  // return {data: { nftDetail: {
  //   imageUrl: '/NFTImage.png',
  //   asset: 'LYNX46',
  //   collection: {
  //     name: 'Algo Lynx',
  //     url: 'https://www.nftexplorer.app/asset/379313755',
  //     creator: 'Linx Digital Studio'
  //   },
  //   description: "The Algo Lynx Collection will be a set of 600 unique 1/1 NFTs. The collections will be made up of 550 Algo Lynxes uniquely designed by our team, 10 full body Lynxes based on Greek Mythology, and 40 special Lynxes based on current popular themes and multiple special collaborations with our favorite creators. Additionally we will have 1 Algo Lynx LE Card and 5 Algo Lynx Legendary Cards.",
  //   nftExplorerLink: "https://www.nftexplorer.app/collection/0xm",
  //   prices: {
  //     lastSalePrice: '275',
  //     avgSalePrice: '127.54',
  //     collectionAverage: '178.291',
  //   },
  //   currentHolderAddr: 'COFEAYYFGE6QH4ZEOKXCWRIIDJ7H5ZN2VI3EGCNDZNQYBMVXEJADRWUAA4',
  //   algoExplorerLink: 'https://algoexplorer.io/asset/379305572'
  // } }}
  return { data: { nftDetail: {}}}
//   return {data: {orders: {sell, buy}, isLoading}, isLoading, ...rest};
}

export default useNFTDetailsQuery;
