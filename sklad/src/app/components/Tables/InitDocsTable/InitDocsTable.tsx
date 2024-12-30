"use client";

import { initDocsType } from "@/app/types/InitDocsType";
import styles from "../Tables.module.css";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

type Iprops = {
  initDocs: initDocsType[];
};

export default function InitDocsTable({ initDocs }: Iprops) {
  const router = useRouter();
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Дата документа</th>
          <th>Номер документа</th>
          <th>Вн.Номер документа</th>
          <th>Вид документа</th>
        </tr>
      </thead>
      <tbody>
        {initDocs.map((doc) => (
          <tr key={doc.init_doc_id} onClick={() => router.push(`/`)}>
            <td>{format(doc.init_date, "dd/MM/yyyy hh:mm")}</td>
            <td>{doc.init_doc_id}</td>
            <td>{doc.init_internal_num}</td>
            <td>{doc.init_doc_alias}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
