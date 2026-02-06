"use client";

import { useState, useEffect } from "react";

export default function EditModal({ isOpen, onClose, data, isBulk = false }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData(isBulk ? (data[0] || {}) : data);
    }
  }, [data, isBulk]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving data:", formData);
    alert(isBulk ? "Bulk edit applied successfully!" : "Changes saved successfully!");
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {isBulk ? "Bulk Edit" : "Edit Record"}
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {Object.entries(formData).map(([key, value]) => (
              key !== "id" && (
                <div key={key} className="space-y-2">
                  <label 
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    {key.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={value || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 outline-none"
                    placeholder={`Enter ${key}`}
                  />
                </div>
              )
            ))}
          </form>
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
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}