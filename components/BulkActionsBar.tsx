"use client";

interface BulkActionsBarProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkEdit: () => void;
  onBulkExport: () => void;
  onClearSelection: () => void;
}

export default function BulkActionsBar({
  selectedCount,
  onBulkDelete,
  onBulkEdit,
  onBulkExport,
  onClearSelection,
}: BulkActionsBarProps) {
  return (
    <div className="mb-6 p-4 rounded-lg bg-blue-600 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-white font-medium">
          ✅ {selectedCount} row(s) selected
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onBulkEdit}
          className="px-3 py-1.5 rounded bg-green-500 hover:bg-green-600 text-white font-medium flex items-center gap-1"
          title="Edit selected rows"
        >
          ✏️ Edit
        </button>
        
        <button
          onClick={onBulkExport}
          className="px-3 py-1.5 rounded bg-purple-500 hover:bg-purple-600 text-white font-medium flex items-center gap-1"
          title="Export selected rows"
        >
          📥 Export
        </button>
        
        <button
          onClick={onBulkDelete}
          className="px-3 py-1.5 rounded bg-red-500 hover:bg-red-600 text-white font-medium flex items-center gap-1"
          title="Delete selected rows"
        >
          🗑️ Delete
        </button>
        
        <button
          onClick={onClearSelection}
          className="px-3 py-1.5 rounded bg-white hover:bg-gray-100 text-gray-700 font-medium flex items-center gap-1"
          title="Clear selection"
        >
          ✖️ Clear
        </button>
      </div>
    </div>
  );
}