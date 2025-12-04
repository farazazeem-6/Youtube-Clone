import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function ConfirmationModal({
  open,
  handleClose,
  handleConfirm,
  title = "Are you sure?",
  message = "",
  cancelText = "Cancel",
  confirmText = "OK",
  isLoading = false,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm cursor-pointer font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : confirmText}
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ConfirmationModal;
