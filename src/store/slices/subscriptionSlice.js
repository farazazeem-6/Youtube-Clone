import { createSlice } from "@reduxjs/toolkit";

// Load subscriptions from localStorage on init
const loadSubscriptions = () => {
  try {
    const saved = localStorage.getItem("subscriptions");
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Error loading subscriptions:", error);
    return {};
  }
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscribedChannels: loadSubscriptions(), // { channelId: channelData }
  },
  reducers: {
    subscribeChannel: (state, action) => {
      const { channelId, channelData } = action.payload;
      
      state.subscribedChannels[channelId] = {
        ...channelData,
        subscribedAt: new Date().toISOString(),
      };

      // Save to localStorage
      try {
        localStorage.setItem(
          "subscriptions",
          JSON.stringify(state.subscribedChannels)
        );
      } catch (error) {
        console.error("Error saving subscriptions:", error);
      }
    },

    unsubscribeChannel: (state, action) => {
      const channelId = action.payload;
      
      delete state.subscribedChannels[channelId];

      // Update localStorage
      try {
        localStorage.setItem(
          "subscriptions",
          JSON.stringify(state.subscribedChannels)
        );
      } catch (error) {
        console.error("Error saving subscriptions:", error);
      }
    },

    clearAllSubscriptions: (state) => {
      state.subscribedChannels = {};
      localStorage.removeItem("subscriptions");
    },
  },
});

export const { subscribeChannel, unsubscribeChannel, clearAllSubscriptions } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;