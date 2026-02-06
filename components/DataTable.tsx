"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
  type RowSelectionState,
} from "@tanstack/react-table";

import { useState } from "react";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import BulkActionsBar from "./BulkActionsBar";

export default function DataTable({ data, columns }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const tableColumns = [
    {
      id: "select",
      header: ({ table }: any) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      ),
      cell: ({ row }: any) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div className="flex gap-1 justify-center">
          <button 
            onClick={() => handleView(row.original)}
            className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200"
            title="View"
          >
            👁️
          </button>
          <button 
            onClick={() => handleEdit(row.original)}
            className="p-1.5 rounded-md bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 transition-all duration-200"
            title="Edit"
          >
            ✏️
          </button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 rounded-md bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  const handleView = (row: any) => {
    setSelectedRow(row);
    setViewModalOpen(true);
  };

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setEditModalOpen(true);
  };

  const handleDelete = (row: any) => {
    setSelectedRow(row);
    setDeleteModalOpen(true);
  };

  const handleBulkDelete = () => setDeleteModalOpen(true);
  const handleBulkEdit = () => setEditModalOpen(true);
  
  const handleBulkExport = () => {
    console.log("Exporting selected rows:", selectedRows);
    alert(`Exporting ${selectedRows.length} rows to CSV`);
  };

  const clearSelection = () => {
    table.resetRowSelection();
    setSelectedRows([]);
  };

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: { sorting, columnFilters, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(newSelection);
      
      const selectedRowIds = Object.keys(newSelection).filter(id => newSelection[id]);
      const selectedRowsData = data.filter((_:any, index: number) => selectedRowIds.includes(index.toString()));
      setSelectedRows(selectedRowsData);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  return (
    <div className="animate-fadeIn">
      {/* Bulk Actions Bar */}
      {selectedRows.length > 0 && (
        <BulkActionsBar
          selectedCount={selectedRows.length}
          onBulkDelete={handleBulkDelete}
          onBulkEdit={handleBulkEdit}
          onBulkExport={handleBulkExport}
          onClearSelection={clearSelection}
        />
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {table.getAllColumns()
          .filter(col => !["actions", "select"].includes(col.id))
          .map(col => (
            <div key={col.id}>
              <input
                placeholder={`Filter ${col.id}...`}
                value={(col.getFilterValue() ?? "") as string}
                onChange={e => col.setFilterValue(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 outline-none"
              />
            </div>
          ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-3 text-left text-xs font-semibold text-white uppercase cursor-pointer hover:bg-blue-700 transition-colors"
                    style={{ 
                      width: header.column.id === "actions" ? "120px" : 
                            header.column.id === "select" ? "50px" : "auto" 
                    }}
                  >
                    <div className="flex items-center justify-between">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="ml-1 opacity-70">
                          {header.column.getIsSorted() === "asc" && "↑"}
                          {header.column.getIsSorted() === "desc" && "↓"}
                          {!header.column.getIsSorted() && "↕"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-gray-50 ${row.getIsSelected() ? 'bg-blue-50' : ''}`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 text-sm text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableColumns.length} className="px-4 py-8 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ⟪
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        
        <span className="px-3 py-1.5 bg-gray-100 rounded text-gray-700">
          Page <strong className="text-blue-600">{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          <strong className="text-blue-600">{table.getPageCount()}</strong>
        </span>
        
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ⟫
        </button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
          className="px-3 py-1.5 rounded border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-blue-500"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      {/* Table Info */}
      <div className="text-center mt-4 text-gray-600 text-sm">
        Showing {table.getRowModel().rows.length} of {data.length} entries
        {selectedRows.length > 0 && (
          <span className="text-blue-600 font-medium"> • {selectedRows.length} row(s) selected</span>
        )}
      </div>

      {/* Modals */}
      <ViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        data={selectedRow}
      />
      
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        data={selectedRows.length > 1 ? selectedRows : selectedRow}
        isBulk={selectedRows.length > 1}
      />
      
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        data={selectedRows.length > 1 ? selectedRows : selectedRow}
        isBulk={selectedRows.length > 1}
      />
    </div>
  );
}