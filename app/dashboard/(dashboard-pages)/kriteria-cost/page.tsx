import { columnKriteriaCost } from "@/app/dashboard/(dashboard-pages)/kriteria-cost/data-column-kriteria-cost";
import { DataTable } from "@/components/data-table";
import { getDataKriteria, KriteriaType } from "@/lib/data-fetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPK | Kriteria Cost",
  description: "Generated by create next app",
};
const DataKriteriaCostPage = async () => {
  const data = await getDataKriteria({ type: KriteriaType.COST });
  if (!data) {
    return <div className="w-full p-10 text-center text-2xl font-bold">Data not found</div>;
  }

  return (
    <section className="container mx-auto p-10">
      <h1 className="mb-5 text-3xl font-bold">Data Kriteria Cost Page</h1>
      <DataTable data={data} columns={columnKriteriaCost} title="kriteria" searchBy="nama_kriteria" />
    </section>
  );
};

export default DataKriteriaCostPage;
