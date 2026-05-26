import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mouvementsData from "../../data/mouvement.json";

let mouvements = [...mouvementsData.mouvement];

export const fetchMouvements = createAsyncThunk(
    "mouvements/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return mouvements;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const MouvementsSlice = createSlice({
    name: "mouvements",
    initialState: {
        loading: false,
        list: [],
        error: null,
    },

    reducers: {
        addMouvement: (state, action) => {
            state.list.unshift(action.payload);
        },

        deleteMouvement: (state, action) => {
            state.list = state.list.filter(
                (m) => m.id !== action.payload
            );
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchMouvements.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchMouvements.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })

            .addCase(fetchMouvements.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const addMouvementAsync = createAsyncThunk(
    "mouvements/add",
    async (mouvement, { dispatch, rejectWithValue }) => {
        try {
            const newMouvement = {
                ...mouvement,
                id: mouvements.length
                    ? Math.max(...mouvements.map((m) => m.id)) + 1
                    : 1,
            };

            mouvements.unshift(newMouvement);

            dispatch(addMouvement(newMouvement));

            return newMouvement;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const {
    addMouvement,
    deleteMouvement,
} = MouvementsSlice.actions;

export default MouvementsSlice.reducer;