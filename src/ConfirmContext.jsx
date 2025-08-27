import React, { createContext, useContext, useState, useCallback } from "react";

// Context & hook
const ConfirmContext = createContext();
export const useConfirm = () => useContext(ConfirmContext);

// Provider
export const ConfirmProvider = ({ children }) => {
  const [options, setOptions] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    resolve: null,
  });

  // confirm function returns a promise
  const confirm = useCallback(
    ({ title, message, confirmText = "Confirm", cancelText = "Cancel" }) => {
      return new Promise((resolve) => {
        setOptions({
          open: true,
          title,
          message,
          confirmText,
          cancelText,
          resolve,
        });
      });
    },
    []
  );

  // handle user's choice
  const handleClose = (result) => {
    if (options.resolve) options.resolve(result);
    setOptions((prev) => ({ ...prev, open: false, resolve: null }));
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      {options.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            {options.title && <h2 className="text-lg font-semibold mb-2">{options.title}</h2>}
            <p className="mb-4">{options.message}</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleClose(false)}
              >
                {options.cancelText}
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleClose(true)}
              >
                {options.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};
