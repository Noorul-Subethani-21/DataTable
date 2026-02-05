import DataTable from "@/components/DataTable";
import { users } from "@/data/users";
import { columns } from "@/lib/column";

export default function Home() {
  return (
    <main>
      <h1>✨ Reusable DataTable</h1>
      <DataTable data={users} columns={columns} />
    </main>
  );
}