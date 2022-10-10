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

const isTestNet =
  typeof process.env.NEXT_PUBLIC_API !== 'undefined' && process.env.NEXT_PUBLIC_API.match('testnet')
// eslint-disable-next-line @typescript-eslint/no-empty-function
const Manifest = () => {}
export const getServerSideProps = ({ res }) => {
  const manifest = {
    theme_color: '#4A5568',
    background_color: '#1A202C',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    name: isTestNet ? 'Algodex Testnet Exchange' : 'Algodex Exchange',
    short_name: isTestNet ? 'Algodex Testnet' : 'Algodex',
    description: 'Decentralized Algorand Exchange',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }

  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(manifest))
  res.end()

  return {
    props: {}
  }
}
export default Manifest
