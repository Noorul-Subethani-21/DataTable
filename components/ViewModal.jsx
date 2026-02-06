"use client";

export default function ViewModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-blue-600 rounded-t-lg flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">View Details</h2>
          <button 
            onClick={onClose}
            className="text-white hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        {/* Body */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <div className="px-3 py-2 bg-gray-50 rounded border border-gray-200 text-gray-600">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}