import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: null,
    users: [],
    isError: null
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userStart: (state) => {
            state.isLoading = true;
        },
        userSuccess: (state, action) => {
            state.isLoading = false;
            if (action.payload.type === "a") {
                state.user = action.payload.data;
            } else if (action.payload.type === "b") {
                state.users = action.payload.data;
            }
        },
        userFailure: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        }
    }
});

export const {
    userStart,
    userSuccess,
    userFailure,
} = UserSlice.actions;
export default UserSlice.reducer;