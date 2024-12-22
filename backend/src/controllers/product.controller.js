import pool from "../config/db.js";

class ProductController {
  async getProducts(req, res) {
    const products = await pool.query(
      `SELECT * FROM product ORDER BY product_name`
    );
    res.json(products.rows);
  }
}
export default new ProductController();
