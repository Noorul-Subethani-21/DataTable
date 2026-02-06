import DataTable from "@/components/DataTable";
import { users } from "@/data/users";
import { columns } from "@/lib/column";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 my-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ✨ Reusable DataTable
          </h1>
          <DataTable data={users} columns={columns} />
        </div>
      </div>
    </main>
  );
}