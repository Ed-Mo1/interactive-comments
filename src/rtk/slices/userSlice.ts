import { createSlice } from "@reduxjs/toolkit";
import deffaultData from "../../data/data.json";
import { UserType } from "../../types/userType";

const initialState: { user: UserType } = {
  user: deffaultData.currentUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
