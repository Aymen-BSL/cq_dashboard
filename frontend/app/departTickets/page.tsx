import { TableDep } from "@/components/TableDep";

function Page() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Horizontally center
        alignItems: "center", // Vertically center
        height: "100vh", // Full viewport height
      }}
    >
      <TableDep />
    </div>
  );
}

export default Page;
