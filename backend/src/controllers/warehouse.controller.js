import pool from "../config/db.js";

class WarehouseController {
  async createWarehouse(req, res) {
    const { warehouse_name } = req.body;

    const newWarehouse = await pool.query(
      `INSERT INTO warehouse(warehouse_name)
        VALUES($1)
        RETURNING *
        `,
      [warehouse_name]
    );
    res.json(newWarehouse.rows[0]);
  }
  async getWarehouses(req, res) {
    const warehouses = await pool.query(
      `SELECT * FROM warehouse ORDER BY warehouse_name`
    );
    res.json(warehouses.rows);
  }
  async getOneWarehouse(req, res) {
    const warehouse_id = req.params.id;
    const warehouse = await pool.query(
      `SELECT * FROM warehouse WHERE warehouse_id =$1`,
      [warehouse_id]
    );
    res.json(warehouse.rows[0]);
  }
  async updateWarehouse(req, res) {
    const { warehouse_id, warehouse_name } = req.body;
    const warehouse = await pool.query(
      `UPDATE warehouse SET warehouse_name =$1 WHERE warehouse_id =$2 RETURNING *`,
      [warehouse_name, warehouse_id]
    );
    res.json(warehouse.rows[0]);
  }
  async deleteWarehouse(req, res) {
    const warehouse_id = req.params.id;
    const warehouse = await pool.query(
      `DELETE FROM warehouse WHERE warehouse_id =$1 RETURNING *`,
      [warehouse_id]
    );
    res.json(warehouse.rows[0]);
  }
}

export default new WarehouseController();
