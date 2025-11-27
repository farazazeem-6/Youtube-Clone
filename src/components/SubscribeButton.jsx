import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeChannel,
  unsubscribeChannel,
} from "../store/slices/subscriptionSlice";

const SubscribeButton = ({ channelId, channelInfo }) => {
  const dispatch = useDispatch();
  
  // Check if user is subscribed to this channel
  const isSubscribed = useSelector(
    (state) => !!state.subscription.subscribedChannels[channelId]
  );

  const handleSubscribe = () => {
    // Validate channel data exists
    if (!channelId) {
      console.error("Missing channelId");
      return;
    }

    if (isSubscribed) {
      // Unsubscribe - we don't need channel info for this
      dispatch(unsubscribeChannel(channelId));
    } else {
      // Subscribe - check if channel info is loaded
      if (!channelInfo || !channelInfo.snippet) {
        console.error("Channel data not loaded yet. Please wait...");
        return;
      }

      dispatch(
        subscribeChannel({
          channelId,
          channelData: {
            id: channelId,
            title: channelInfo.snippet.title,
            thumbnail: channelInfo.snippet.thumbnails?.medium?.url || channelInfo.snippet.thumbnails?.default?.url,
            subscriberCount: channelInfo.statistics?.subscriberCount || "0",
            description: channelInfo.snippet.description || "",
          },
        })
      );
    }
  };

  // Disable button if channel data hasn't loaded yet (for subscribe action)
  const isDisabled = !isSubscribed && (!channelId || !channelInfo?.snippet);

  return (
    <button
      onClick={handleSubscribe}
      disabled={isDisabled}
      className={`px-4 py-2 rounded-full text-[10px] cursor-pointer font-semibold transition-all duration-200 ${
        isSubscribed
          ? "bg-gray-200 text-black hover:bg-gray-300"
          : isDisabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      {isDisabled ? (
        <>
          <i className="ri-loader-4-line animate-spin mr-1"></i>
          Loading...
        </>
      ) : isSubscribed ? (
        <>
          <i className="ri-check-line mr-1"></i>
          Subscribed
        </>
      ) : (
        "Subscribe"
      )}
    </button>
  );
};

export default SubscribeButton;