import { Action, Reducer } from "redux";
import { ThunkAction } from "redux-thunk";

export type RootState = {
    token: string;
}

const InitialState: RootState = {
    token: '',
}

const SAVE_TOKEN = 'SAVE_TOKEN';
type SaveTokenAction = {
    type: typeof SAVE_TOKEN;
    text: string;
}

type MyAction = SaveTokenAction;

export const saveToken = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
    dispatch({ type: SAVE_TOKEN, text: window.location.hash ?
        window.location.hash.substr(window.location.hash.indexOf('#access_token=')).split('&')[0].split('=')[1]
        :
        ''
    });
}

export const rootReducer: Reducer<RootState, MyAction> = (state = InitialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.text,
            }
        default: 
            return state;
    }
}