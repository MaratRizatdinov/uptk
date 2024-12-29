import { getWarehouses } from "@/app/api/warehousesApi";
import { InitDoc } from "@/app/types/InitDocsType";
import { WarehouseType } from "@/app/types/warehouseTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Iprops = {
  data: InitDoc;
  setData: Dispatch<SetStateAction<InitDoc>>;
  index: number;
};

export default function SelectWarehouseField({ data, setData, index }: Iprops) {
  const [name, setName] = useState<WarehouseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWarehouses().then((response: WarehouseType[]) => {
      setName(response);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <span>Загрузка</span>
      ) : (
        <select
          value={data.items[index].warehouse_id ?? ""}
          onChange={(event) => {
            const clone = structuredClone(data);
            clone.items[index].warehouse_id = Number(event.target.value);
            setData(clone);
          }}
        >
          <option value="" disabled>
            Выберите склад
          </option>
          {name.map((el) => (
            <option key={el.warehouse_id} value={el.warehouse_id}>
              {el.warehouse_name}
            </option>
          ))}
        </select>
      )}
    </>
  );
}
