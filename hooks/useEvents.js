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

/* eslint-disable */
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useCallback
} from 'react'

export const EventContext = createContext([
    (_event, _cb) => {}, // subscribe
    (_event, _cb) => {}, // unsubscribe
    (_event, _payload) => {} // dispatch
])

export const useEventDispatch = () => {
    const [_subscribe, _unsubscribe, dispatch] = useContext(EventContext)

    return dispatch
}

export const useEvent = (event, callback) => {
    const [subscribe, unsubscribe, _dispatch] = useContext(EventContext)

    useEffect(() => {
        subscribe(event, callback)

        return () => unsubscribe(event, callback)
    }, [subscribe, unsubscribe, event, callback])
}

export const EventEmitter = ({ children }) => {
    const [subscribers, dispatch] = useReducer(
        (state, action) => {
            const { type, event } = action
            switch (type) {
                case 'subscribe': {
                    const { callback } = action
                    if (event in state) {
                        if (state[event].includes(callback)) {
                            return state
                        }
                        return { ...state, [event]: [...state[event], callback] }
                    }
                    return { ...state, [event]: [callback] }
                }

                case 'unsubscribe': {
                    const { callback } = action
                    if (event in state && state[event].includes(callback)) {
                        return { ...state, [event]: [...state[event].filter((cb) => cb !== callback)] }
                    }
                    return state
                }

                default:
                    throw new Error()
            }
        },
        {},
        () => ({})
    )

    const subscribersRef = useRef({})

    subscribersRef.current = useMemo(() => subscribers, [subscribers])

    const subscribe = useCallback(
        (event, callback) => {
            dispatch({ type: 'subscribe', event, callback })
        },
        [dispatch]
    )

    const unsubscribe = useCallback(
        (event, callback) => {
            dispatch({ type: 'unsubscribe', event, callback })
        },
        [dispatch]
    )

    const dispatchEvent = useCallback(
        (event, payload) => {
            if (event in subscribersRef?.current) {
                subscribersRef?.current[event].forEach((cb) => cb(payload))
            }
        },
        [subscribersRef]
    )

    const eventPack = useMemo(
        () => [subscribe, unsubscribe, dispatchEvent],
        [subscribe, unsubscribe, dispatchEvent]
    )

    return <EventContext.Provider value={eventPack}>{children}</EventContext.Provider>
}
