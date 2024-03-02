import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "https://open.er-api.com/v6/latest/USD";

// Create an async thunk to fetch the products
export const fetchDollarValue = createAsyncThunk(
    "DollarValueInRupees/fetchDollarValue",
    async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const jsonResult = await response.json();
            const dollarInRupees = jsonResult.rates.INR;

            return dollarInRupees;
        } catch (error) {
            console.error("An error occurred: \n", error);
        }
    }
);

const DollarValueSlice = createSlice({
    name: "DollarValueInRupees",
    initialState: {
        dollarInRupees: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDollarValue.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDollarValue.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.dollarInRupees = action.payload;
            })
            .addCase(fetchDollarValue.rejected, (state, action) => {
                state.status = "failed";
                state.dollarInRupees = action.error.message;
            });
    },
});

export default DollarValueSlice.reducer;
