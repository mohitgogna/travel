import { Action } from "src/actions";
import { USER_REQUEST, USER_SUCCESS } from "src/actions/user-action"
import { flightSearchModel } from "src/app/model/flightSearchModel";

export interface UserReducerState {
    loading: boolean,
    loaded: boolean,
    users: flightSearchModel[]
}

const initialState: UserReducerState = {
    loaded: false,
    loading: false,
    users: []
}

export function UserReducer(state = initialState, action: Action): UserReducerState {
    switch (action.type) {
        case USER_REQUEST: {
            return { ...state, loading: true };
        }
        case USER_SUCCESS: {
            console.log("Reducer -");
            console.log(action.payload.data);
            const updatedusers = state.users.concat( action.payload.data);
            return { ...state, loading: false, loaded: true, users: updatedusers };
        }
        default:{
            return state;
        }
    }
}

//selectors
export const  getLoading=(state:UserReducerState)=> state.loading;
export const  getLoaded=(state:UserReducerState)=> state.loaded;
export const  getUsers=(state:UserReducerState)=> state.users;