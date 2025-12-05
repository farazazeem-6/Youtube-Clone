import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  subscribeChannel,
  unsubscribeChannel,
} from "../store/slices/subscriptionSlice";
import AuthenticationModal from "../components/AuthenticationModal";
import ConfirmationModal from "../components/ConfirmationModal";

const SubscribeButton = ({ channelId, channelInfo }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isUser = useSelector((state) => state.user);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  // Check if user is on subscriptions page
  const isSubscriptionsPage = location.pathname === "/subscriptions";

  // Check if user is subscribed to this channel
  const isSubscribed = useSelector(
    (state) => !!state.subscription.subscribedChannels[channelId]
  );

  const handleUnsubscribe = () => {
    dispatch(unsubscribeChannel(channelId));
    setOpenConfirmModal(false);
  };

  const handleSubscribe = () => {
    if (!isUser) {
      setOpenAuthModal(true);
      return;
    }

    // Validate channel data exists
    if (!channelId) {
      console.error("Missing channelId");
      return;
    }

    if (isSubscribed) {
      // If on subscriptions page, show confirmation modal
      if (isSubscriptionsPage) {
        setOpenConfirmModal(true);
      } else {
        // Directly unsubscribe if not on subscriptions page
        dispatch(unsubscribeChannel(channelId));
      }
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
            thumbnail:
              channelInfo.snippet.thumbnails?.medium?.url ||
              channelInfo.snippet.thumbnails?.default?.url,
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
    <>
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
            <i className="animate-spin mr-1"></i>
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

      {/* Authentication Modal */}
      <AuthenticationModal
        open={openAuthModal}
        handleClose={() => setOpenAuthModal(false)}
      />

      {/* Confirmation Modal for Unsubscribe */}
      <ConfirmationModal
        open={openConfirmModal}
        handleClose={() => setOpenConfirmModal(false)}
        handleConfirm={handleUnsubscribe}
        title="Unsubscribe?"
        message={`Are you sure you want to unsubscribe from ${
          channelInfo?.snippet?.title || "this channel"
        }?`}
        cancelText="Cancel"
        confirmText="Unsubscribe"
      />
    </>
  );
};

export default SubscribeButton;
