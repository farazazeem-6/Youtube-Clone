import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 0,
};

// Report reasons with predefined descriptions
const REPORT_REASONS = [
  {
    id: "sexual-content",
    title: "Sexual content",
    description:
      "This video contains sexual or adult content that violates YouTube's community guidelines.",
  },
  {
    id: "violent-content",
    title: "Violent or repulsive content",
    description:
      "This video displays violence, graphic content, or disturbing material that may shock or disgust viewers.",
  },
  {
    id: "hateful-content",
    title: "Hateful or abusive content",
    description:
      "This video promotes hatred, discrimination, or abuse against individuals or groups based on protected attributes.",
  },
  {
    id: "harassment",
    title: "Harassment or bullying",
    description:
      "This video contains content that harasses, intimidates, or bullies an individual or group.",
  },
  {
    id: "spam",
    title: "Spam or misleading",
    description:
      "This video is spam, misleading, or uses deceptive practices to gain views or engagement.",
  },
  {
    id: "child-abuse",
    title: "Child abuse",
    description:
      "This video exploits, endangers, or otherwise harms children in any way.",
  },
  {
    id: "terrorism",
    title: "Promotes terrorism",
    description:
      "This video promotes or incites terrorist activities or violent extremism.",
  },
  {
    id: "copyright",
    title: "Infringes my rights",
    description:
      "This video violates my copyright, privacy, or other legal rights.",
  },
  {
    id: "misinformation",
    title: "Misinformation",
    description:
      "This video spreads false or misleading information that could cause harm.",
  },
  {
    id: "other",
    title: "Other",
    description: "",
  },
];

function ReportModal({ open, handleClose, onSubmit }) {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");

  const handleReasonChange = (e) => {
    const reasonId = e.target.value;
    setSelectedReason(reasonId);

    // Find the selected reason and auto-fill description
    const reason = REPORT_REASONS.find((r) => r.id === reasonId);
    if (reason) {
      setDescription(reason.description);
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setDescription(value);
    }
  };

  const handleSubmit = () => {
    if (description.trim()) {
      onSubmit({ reason: selectedReason, description: description.trim() });
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setSelectedReason("");
    setDescription("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={style}>
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Report this Video
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {/* Select Problem */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Select a problem
            </label>
            <div className="relative">
              <select
                value={selectedReason}
                onChange={handleReasonChange}
                className="w-full px-4 py-3 pr-10 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="">Select the issue you want to report</option>
                {REPORT_REASONS.map((reason) => (
                  <option key={reason.id} value={reason.id}>
                    {reason.title}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-500 text-xl"></i>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Select a problem to view its details, then you can update or add more details if needed."
              className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              rows="6"
            />
            <div className="flex justify-end mt-1">
              <span className="text-xs text-gray-500">
                {description.length}/1000
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={handleCloseModal}
            className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!description.trim()}
            className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition cursor-pointer ${
              description.trim()
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Report
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default ReportModal;
