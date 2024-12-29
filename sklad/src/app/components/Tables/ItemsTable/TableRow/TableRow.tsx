import { InitDoc } from "@/app/types/InitDocsType";
import { ProductItem } from "@/app/types/productTypes";
import { Dispatch, SetStateAction } from "react";
import SelectNameField from "../SelectNameField/SelectNameField";
import SelectWarehouseField from "../SelectWarehouseField/SelectWarehouseField";
import { nanoid } from "nanoid";

type Iprops = {
  product: ProductItem;
  data: InitDoc;
  setData: Dispatch<SetStateAction<InitDoc>>;
  index: number;
};

export const TableRow = ({ product, data, setData, index }: Iprops) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <SelectNameField data={data} setData={setData} index={index} />
      </td>
      <td>
        <input
          value={product.product_fuse ?? ""}
          onChange={(event) => {
            const clone = structuredClone(data);
            if (isNaN(Number(event.target.value))) return;
            clone.items[index].product_fuse = Number(event.target.value);
            setData(clone);
          }}
        />
      </td>
      <td>
        <input
          value={product.product_code ?? ""}
          onChange={(event) => {
            const clone = structuredClone(data);
            if (isNaN(Number(event.target.value))) return;
            clone.items[index].product_code = Number(event.target.value);
            setData(clone);
          }}
        />
      </td>
      <td>
        <SelectWarehouseField data={data} setData={setData} index={index} />
      </td>
      <td>
        <input
          value={product.weight ?? ""}
          onChange={(event) => {
            const clone = structuredClone(data);
            if (isNaN(Number(event.target.value))) return;
            clone.items[index].weight = Number(event.target.value);
            setData(clone);
          }}
        />
      </td>
      <td>
        <button
          onClick={(event) => {
            event.preventDefault();
            const clone = structuredClone(data);
            clone.items.splice(index, 1);
            setData(clone);
          }}
        >
          Delete
        </button>
      </td>
      <td>
        <button
          onClick={(event) => {
            event.preventDefault();
            const clone = structuredClone(data);
            const newRow = { ...clone.items[index], item_id: nanoid() };
            clone.items.push(newRow);
            setData(clone);
          }}
        >
          Copy
        </button>
      </td>
    </tr>
  );
};
