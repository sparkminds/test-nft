
import { createSlice } from '@reduxjs/toolkit';
const createNFTSlice = createSlice({
    name: "icon",
    initialState: {
        step: 0
    },
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
    }
})

export const { setStep } = createNFTSlice.actions;
export const selectStep = (state: any) => state.nft.step;

const createNFTReducers = createNFTSlice.reducer;
export default createNFTReducers;