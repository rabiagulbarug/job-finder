'use client';
import React, {useMemo} from 'react';
import { useRouter } from 'next/navigation';
import {getToken} from "@/utils/get-token";

export interface State {
    isAuthorized: boolean;
    activeChatbotId?: string
}

const initialState = {
    isAuthorized: getToken() ? true : false,
};

type Action =
    | {
    type: 'SET_AUTHORIZED';
}
    | {
    type: 'SET_UNAUTHORIZED';
}
    | {
    type: 'SET_CHATBOT_ID'
    chatbotId?: string
};

type MODAL_VIEWS =
    | 'SIGN_UP_VIEW'
    | 'LOGIN_VIEW'
    | 'FORGET_PASSWORD'
    | 'PRODUCT_VIEW';
type ToastText = string;

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
    switch (action.type) {
        case 'SET_AUTHORIZED': {
            return {
                ...state,
                isAuthorized: true,
            };
        }
        case 'SET_UNAUTHORIZED': {
            return {
                ...state,
                isAuthorized: false,
            };
        }
        case 'SET_CHATBOT_ID': {
            return {
                ...state,
                activeChatbotId: action.chatbotId,
            }
        }
    }
}

export const UIProvider: React.FC = (props) => {
    const [state, dispatch] = React.useReducer(uiReducer, initialState);

    const authorize = () => dispatch({ type: 'SET_AUTHORIZED' });
    const unauthorize = () => dispatch({ type: 'SET_UNAUTHORIZED' });

    const setChatbotId = (chatbotId?: string) => dispatch({type: 'SET_CHATBOT_ID', chatbotId});

    const router = useRouter();


    const value = useMemo(
        () => ({
            ...state,
            authorize,
            unauthorize,
            setChatbotId,
        }),
        [state]
    );

    return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
    const context = React.useContext(UIContext);
    if (context === undefined) {
        throw new Error(`useUI must be used within a UIProvider`);
    }
    return context;
};

// @ts-ignore
export const ManagedUIContext: React.FC = ({ children }) => (
    // @ts-ignore
    <UIProvider>{children}</UIProvider>
);
