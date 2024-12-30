import pool from "../config/db.js";


function createInsertQuery(tableName, columns, data) {
  const values = [];
  const valuePlaceholders = [];

  // Генерация placeholders для каждого значения

  data.forEach((row, rowIndex) => {
    const rowPlaceholders = columns.map(
      (_, colIndex) => `$${rowIndex * columns.length + colIndex + 1}`
    );
    valuePlaceholders.push(`(${rowPlaceholders.join(", ")})`);
    values.push(...columns.map((col) => row[col]));
  });

  // Формирование SQL-запроса
  const query = `
    INSERT INTO ${tableName} (${columns.join(", ")})
    VALUES ${valuePlaceholders.join(", ")}
    RETURNING *
  `;

  return { query, values };
}

class InitDocController {
  async createInitDoc(req, res) {
    
    const { init_date, init_doc_alias, init_internal_num, items } = req.body;
    
    const newInitDoc = await pool.query(
      `INSERT INTO init_journal(init_date, init_doc_alias, init_internal_num)
            VALUES($1, $2, $3)
            RETURNING *
            `,
      [init_date, init_doc_alias, init_internal_num]
    );
    
    const docId = newInitDoc.rows[0].init_doc_id;

    const columns = ["product_id", "product_fuse", "product_code"];
    const { query, values } = createInsertQuery("product_item", columns, items);
    const newInitItems = await pool.query(query, values);
    const itemsArray = newInitItems.rows;    
    const crossArray = [];
    for (let i = 0; i < items.length; i++) {
      let obj = {
        doc_id: docId,
        warehouse_id: items[i].warehouse_id,
        item_id: itemsArray[i].item_id,
        product_count: items[i].weight,
      };
      crossArray.push(obj);
    }
    
    const docColumns = ["doc_id", "warehouse_id", "item_id", "product_count"];
    const { query :query1, values: values1 } = createInsertQuery(
      "init_product_warehouse",
      docColumns,
      crossArray
    );
    
    const newInitDocList = await pool.query(query1, values1);
    
    res.json(newInitDocList.rows);
  }
  async getInitDocAll(req, res) {
    const documents = await pool.query(`SELECT * FROM init_journal ORDER BY init_date`);
    res.json(documents.rows);
  }
  async getOneInitDoc(req, res) {
    const doc_id = req.params.id;
    const document = await pool.query(
      `select doc_id,
                        init_product_warehouse.warehouse_id,
                        warehouse_name,
                        init_product_warehouse.item_id,
                        product.product_name,
                        product_item.product_fuse,
                        product_item.product_code,
                        product_count
                        from init_product_warehouse
                        INNER JOIN warehouse ON init_product_warehouse.warehouse_id = warehouse.warehouse_id
                        INNER JOIN product_item ON init_product_warehouse.item_id = product_item.item_id
                        INNER JOIN product ON product_item.product_id = product.product_id
                        where doc_id=$1`,
      [doc_id]
    );
    res.json(document.rows);
  }
}
export default new InitDocController();
