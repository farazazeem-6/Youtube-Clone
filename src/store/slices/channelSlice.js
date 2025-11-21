import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    channels: {},
  },
  reducers: {
    addChannelData: (state, action) => {
      const { id, snippet, statistics } = action.payload;

      // If channel already exists, merge with existing data
      state.channels[id] = {
        ...state.channels[id],   // keep old data
        snippet: snippet || state.channels[id]?.snippet,
        statistics: statistics || state.channels[id]?.statistics,
      };
    },
  },
});

export const { addChannelData } = channelSlice.actions;
export default channelSlice.reducer;
