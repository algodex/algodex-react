/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
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

import { useReducer } from "react"

export default function useSearchFilter() {
  const filterReducer = (state, action) => {
    switch (action.type) {
      case 'updateSliderValue':
        return {
          ...state,
          [action.field]: action.value
        }
      case 'setPriceMax':
        return {
          ...state,
          priceMax: action.value
        }
      case 'toggleMarketCap':
        return {
          ...state,
          isFilteringMarketCap: !state.isFilteringMarketCap
        }
      case 'toggleAgeOfProject':
        return {
          ...state,
          isFilteringAgeOfProject: !state.isFilteringAgeOfProject
        }
      case 'toggleMarketPrice':
        return {
          ...state,
          isFilteringPrice: !state.isFilteringPrice
        }
      case 'toggleNFTOnly':
        return {
          ...state,
          isFilteringNFTOnly: !state.isFilteringNFTOnly
        }
      default:
        break;
    }
    return state
  }
  const initialState = {
    marketCapAmount: 0,
    isFilteringMarketCap: false,
    ageOfProject: [0, 20],
    isFilteringAgeOfProject: false,
    price: [0, 100],
    priceMax: 0,
    isFilteringPrice: false,
    isFilteringNFTOnly: false
  }
  const [filters, dispatch] = useReducer(filterReducer, initialState)
  return { filters, dispatch }
}
