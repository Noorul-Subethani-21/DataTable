"use client";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  isBulk?: boolean;
}

export default function DeleteModal({ isOpen, onClose, data, isBulk = false }: DeleteModalProps) {
  if (!isOpen) return null;

  const handleDelete = () => {
    console.log("Deleting:", data);
    alert(isBulk 
      ? `${Array.isArray(data) ? data.length : 1} record(s) deleted successfully!`
      : "Record deleted successfully!");
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Confirm Delete</h2>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {isBulk ? (
              <>Are you sure you want to delete <strong className="text-red-600">{Array.isArray(data) ? data.length : 0}</strong> selected records? This action cannot be undone.</>
            ) : (
              <>Are you sure you want to delete this record? This action cannot be undone.</>
            )}
          </p>
          
          {!isBulk && data && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-left">
              <strong className="block mb-2 text-gray-700">Record to delete:</strong>
              <pre className="text-sm text-gray-600 whitespace-pre-wrap break-words overflow-auto max-h-40">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}