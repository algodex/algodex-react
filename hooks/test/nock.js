/*
 * Algodex Hooks
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

import nock from 'nock';
import wallet from '../spec/Wallet.json';
import asset from '../spec/Asset.json';

const routes = {
  walletTradeHistory: {
    path: `/trades/history/wallet/${wallet.address}`,
    reply: require('../spec/fetchWalletTradeHistory.json'),
  },
  walletOrders: {
    path: `/orders/wallet/${wallet.address}`,
    reply: require('../spec/fetchWalletOrders.json'),
  },
  assetOrders: {
    path: `/orders/asset/${asset.id}`,
    reply: require('../spec/fetchAssetOrders.json'),
  },
  assetChart: {
    path: `/trades/charts/asset/${asset.id}/period/15m`,
    reply: require('../spec/fetchAssetChart.json'),
  },
};

if (process.env.TEST_ENV !== 'integration') {
  Object.keys(routes).forEach((key)=>{
    const r = routes[key];
    nock('https://testnet.algodex.com/api/v2')
        .get(r.path)
        .reply(200, r.reply);
  });
}
