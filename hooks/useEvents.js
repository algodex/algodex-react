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
