import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',

    // initial state of app; null
    initialState: {
        roomId: null,
    },

    reducers: {
        // fuctions
        enterRoom: (state, action) => {
            // using enterRoom we will store channelId

            state.roomId = action.payload.roomId;
        },
    }

})

// we export action to use through out the code
export const { enterRoom } = appSlice.actions;


// help of this we can grap the value once they are loaded
                                        //from name .//from initial state

export const selectRoomId = (state) => state.app.roomId;


export default appSlice.reducer;