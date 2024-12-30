import { initDocsType } from "@/app/types/InitDocsType";
import InitDocsTable from "../../components/Tables/InitDocsTable/InitDocsTable";
import Link from "next/link";
import { getInitDocsAll } from "@/app/api/initDocApi";
export default async function InitPage() {
  // const initDocs: initDocsType[] = [
  //   {
  //     init_doc_id: 1,
  //     init_date: new Date("2024-01-22"),
  //     init_doc_alias: "Init",
  //     init_internal_num:10,
  //   },
  //   {
  //     init_doc_id: 2,
  //     init_date: new Date("2024-01-24"),
  //     init_doc_alias: "Init",
  //     init_internal_num:11,
  //   },
  // ];
   const initDocs: initDocsType[] =await getInitDocsAll()
   console.log(initDocs)
  return (
    <div className="container">
      <h1>Журнал документов ввода начальных остатков</h1>
      <InitDocsTable initDocs={initDocs} />
      <Link href={"/docs/init/create"}>Создать новый документ</Link>
    </div>
  );
}
