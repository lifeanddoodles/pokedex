import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface PaginationSliceState {
  currentOffset: number
  disablePrev: boolean
  disableNext: boolean
}

const initialState: PaginationSliceState = {
  currentOffset: 0,
  disablePrev: true,
  disableNext: false,
}

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: create => ({
    updateOffset: create.reducer((state, action: PayloadAction<number>) => {
      state.currentOffset = action.payload
    }),
    toggleDisablePrev: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.disablePrev = action.payload
      },
    ),
    toggleDisableNext: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.disableNext = action.payload
      },
    ),
  }),
  selectors: {
    selectCurrentOffset: pagination => pagination.currentOffset,
    selectDisablePrev: pagination => pagination.disablePrev,
    selectDisableNext: pagination => pagination.disableNext,
  },
})

export const { updateOffset, toggleDisablePrev, toggleDisableNext } =
  paginationSlice.actions

export const { selectCurrentOffset, selectDisablePrev, selectDisableNext } =
  paginationSlice.selectors
