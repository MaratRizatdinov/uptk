import { getProducts } from "@/app/api/productsApi";
import { InitDoc } from "@/app/types/InitDocsType";
import { ProductType } from "@/app/types/productTypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Iprops = {
  data: InitDoc;
  setData: Dispatch<SetStateAction<InitDoc>>;
  index: number;
};

export default function SelectNameField({ data, setData, index }: Iprops) {
  const [name, setName] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts().then((response: ProductType[]) => {
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
          value={data.items[index].product_id ?? ""}
          onChange={(event) => {
            const clone = structuredClone(data);
            clone.items[index].product_id = Number(event.target.value);
            setData(clone);
          }}
        >
          <option value="" disabled>
            Выберите продукцию
          </option>
          {name.map((el) => (
            <option key={el.product_id} value={el.product_id}>
              {el.product_name}
            </option>
          ))}
        </select>
      )}
    </>
  );
}
