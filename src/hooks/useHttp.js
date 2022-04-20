import { useReducer, useCallback } from "react"

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null, //used to forward data to component,
    identifier: null // used to differenciate the actions what were done in useEffect of Ingredients component
}

const httpReducer = (currentHttpState, action) => {
    // dispatch by type, action: {type: 'TYPE'};
    switch (action.type) {
        case 'SEND':
            // just manage the state here;
            return {
                loading: true,
                error: null,
                data: null,
                extra: null,
                identifier: action.identifier
            }

        case 'RESPONSE':
            return {
                ...currentHttpState,
                loading: false,
                data: action.responseData,
                extra: action.extra
            }

        case 'ERROR':
            return {
                loading: false,
                error: action.errorMsg
            }

        case 'CLEAR':
            return initialState;

        default:
            throw new Error('DEFAULT??');
    }
}


const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

    const sendRequest = useCallback(async (URL, METHOD, body, reqExtra, reqIdentifier) => {
        dispatchHttp({ type: 'SEND', identifier: reqIdentifier });
        try {
            const response = await fetch(URL, {
                method: METHOD,
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                dispatchHttp({ type: 'ERROR', errorMsg: 'Something went wrong' })
                throw new Error('Something went wrong');
            }
            const data = await response.json();
            dispatchHttp({ type: 'RESPONSE', responseData: data, extra: reqExtra })
        } catch (error) {
            dispatchHttp({ type: 'ERROR', errorMsg: error.message || 'Something went wrong' });
        }
    }, []);



    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIdentifier: httpState.identifier,
        clear: clear
    };
};


export default useHttp;



