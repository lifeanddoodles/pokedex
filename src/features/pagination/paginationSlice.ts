import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface PaginationSliceState {
  currentOffset: number
}

const initialState: PaginationSliceState = {
  currentOffset: 0,
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: create => ({
    updateOffset: create.reducer((state, action: PayloadAction<number>) => {
      state.currentOffset = action.payload
    }),
  }),
  selectors: {
    selectCurrentOffset: pagination => pagination.currentOffset,
  },
})

export const { updateOffset } = paginationSlice.actions

export const { selectCurrentOffset } = paginationSlice.selectors
