import pool from "../config/db.js";

class SupplierController {
  async createSupplier(req, res) {
    const { supplier_name } = req.body;

    const newSupplier = await pool.query(
      `INSERT INTO supplier(supplier_name)
        VALUES($1)
        RETURNING *
        `,
      [supplier_name]
    );
    res.json(newSupplier.rows[0]);
  }
  async getSuppliers(req, res) {
    const suppliers = await pool.query(`SELECT * FROM supplier ORDER BY supplier_name`);
    res.json(suppliers.rows);
  }
  async getOneSupplier(req, res) {
    const supplier_id = req.params.id;
    const supplier = await pool.query(
      `SELECT * FROM supplier WHERE supplier_id =$1`,
      [supplier_id]
    );
    res.json(supplier.rows[0]);
  }
  async updateSupplier(req, res) {
    const { supplier_id, supplier_name } = req.body;
    const supplier = await pool.query(
      `UPDATE supplier SET supplier_name =$1 WHERE supplier_id =$2 RETURNING *`,
      [supplier_name, supplier_id]
    );
    res.json(supplier.rows[0]);
  }
  async deleteSupplier(req, res) {
    const supplier_id = req.params.id;
    const supplier = await pool.query(
      `DELETE FROM supplier WHERE supplier_id =$1 RETURNING *`,
      [supplier_id]
    );
    res.json(supplier.rows[0]);
  }
}

export default new SupplierController();
