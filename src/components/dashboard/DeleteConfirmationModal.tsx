interface DeleteConfirmationModalProps {
  isOpen: boolean;
  itemName: string;
  itemTitle?: string;
  isLoading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export function DeleteConfirmationModal({
  isOpen,
  itemName,
  itemTitle,
  isLoading = false,
  onConfirm,
  onCancel,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  const displayText = itemTitle || itemName;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mt-1">This action cannot be undone</p>
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-700 mb-6">
          {message || (
            <>
              Are you sure you want to delete{' '}
              <span className="font-bold">"{displayText}"</span>?
            </>
          )}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? `${confirmText}...` : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
