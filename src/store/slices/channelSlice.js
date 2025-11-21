import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channels: {},
  },
  reducers: {
    addChannelData: (state, action) => {
      const { id, snippet, statistics } = action.payload;
      state.channels[id] = { snippet, statistics };
    },
  },
});
export const { addChannelData } = channelSlice.actions;
export default channelSlice.reducer;
