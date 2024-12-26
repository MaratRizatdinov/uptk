import { initDocsType } from "@/app/types/InitDocsType";
import InitDocsTable from "../../components/Tables/InitDocsTable/InitDocsTable";
export default async function InitPage() {
  const initDocs: initDocsType[] = [
    {
      init_doc_id: 1,
      init_date: new Date("2024-01-22"),
      init_doc_alias: "Init",
    },
  ];
  return (
    <div className="container">
      <h1>Журнал документов ввода начальных остатков</h1>
      <InitDocsTable initDocs={initDocs} />
      <button>Добавить документ</button>
    </div>
  );
}
