import { useEffect } from "react";

export default function ToastNotification({ text, bgColor, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      <div
        className={`fixed top-4 right-4 ${bgColor} text-white text-[16px] px-6 py-3 rounded-lg shadow-lg min-w-[300px] z-50`}
        style={{
          animation: "slideDown 0.3s ease-out",
        }}
      >
        {text}
      </div>
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
