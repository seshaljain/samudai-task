import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserData = {
  address: string
}

export interface UserState {
  isLoggedIn: boolean
  data: UserData | null
}

const initialState: UserState = {
  isLoggedIn: false,
  data: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload
      state.isLoggedIn = true
    },
    clear: (state) => {
      state.isLoggedIn = false
      state.data = null
    },
  },
})

export const { save, clear } = userSlice.actions

export default userSlice.reducer
