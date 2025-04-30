export function Modal({
  open,
  setOpen,
  message,
  onClose,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  message: string;
}) {
  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-gray-900 opacity-50 z-40"></div>

        <div className="bg-white rounded-lg p-8 max-w-xs md:max-w-lg w-full z-50">
          <h2 className="text-2xl font-bold mb-4"></h2>
          <p className="mb-4 text-center">{message}</p>
          <div className="flex justify-end">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 hover:cursor-pointer mt-4"
            onClick={() => {
              setOpen(false);
              onClose && onClose();
            }}
          >
            סגור
          </button>
          </div>
        </div>
      </div>
    )
  );
}
