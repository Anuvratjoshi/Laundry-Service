import { createReducer } from "@reduxjs/toolkit"
const initialState = {
    isLoggedIn: false,
    route: "",
    name: ""

}
export const customReducer = createReducer(initialState, {
    loggedIn: (state, action) => {
        state.isLoggedIn = action.payload
    },
    currentRoute: (state, action) => {
        state.route = action.payload
    },
    userName: (state, action) => {
        state.name = action.payload
    }

    //we can add as my reducer here
})