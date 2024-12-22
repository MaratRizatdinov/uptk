import pool from "../config/db.js";

class CustomerController {
  async createCustomer(req, res) {
    const { customer_name } = req.body;

    const newCustomer = await pool.query(
      `INSERT INTO customer(customer_name)
        VALUES($1)
        RETURNING *
        `,
      [customer_name]
    );
    res.json(newCustomer.rows[0]);
  }
  async getCustomers(req, res) {
    const customers = await pool.query(`SELECT * FROM customer ORDER BY customer_name`);
    res.json(customers.rows);
  }
  async getOneCustomer(req, res) {
    const customer_id = req.params.id;
    const customer = await pool.query(
      `SELECT * FROM customer WHERE customer_id =$1`,
      [customer_id]
    );
    res.json(customer.rows[0]);
  }
  async updateCustomer(req, res) {
    const { customer_id, customer_name } = req.body;
    const customer = await pool.query(
      `UPDATE customer SET customer_name =$1 WHERE customer_id =$2 RETURNING *`,
      [customer_name, customer_id]
    );
    res.json(customer.rows[0]);
  }
  async deleteCustomer(req, res) {
    const customer_id = req.params.id;
    const customer = await pool.query(
      `DELETE FROM customer WHERE customer_id =$1 RETURNING *`,
      [customer_id]
    );
    res.json(customer.rows[0]);
  }
}

export default new CustomerController();
