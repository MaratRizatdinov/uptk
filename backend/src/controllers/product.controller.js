import pool from "../config/db.js";

class ProductController {
  async getProducts(req, res) {
    const products = await pool.query(
      `SELECT * FROM product ORDER BY product_name`
    );
    res.json(products.rows);
  }
  async getOneProduct(req, res) {
    const product_id = req.params.id;
    const product = await pool.query(
      `SELECT * FROM product WHERE product_id =$1`,
      [product_id]
    );
    res.json(product.rows[0]);
  }
  async updateProduct(req, res) {
    const {
      product_id,
      product_name,
      product_category,
      product_marking,
      product_diameter,
      product_length,
      unit_of_measure,
      weight_per_meter,
    } = req.body;
    const customer = await pool.query(
      `UPDATE product SET 
                product_name = $2,
                product_category = $3,                
                product_marking = $4,
                product_diameter = $5,
                product_length = $6,
                unit_of_measure = $7,
                weight_per_meter  = $8                     
                WHERE product_id =$1 RETURNING *`,
      [
        product_id,
        product_name,
        product_category,
        product_marking,
        product_diameter,
        product_length,
        unit_of_measure,
        weight_per_meter,
      ]
    );
    res.json(customer.rows[0]);
  }
  async createProduct(req, res) {
    const {
      product_name,
      product_category,
      product_marking,
      product_diameter,
      product_length,
      unit_of_measure,
      weight_per_meter,
    } = req.body;

    const newProduct = await pool.query(
      `INSERT INTO product
      (
        product_name,
        product_category,
        product_marking,
        product_diameter,
        product_length,
        unit_of_measure,
        weight_per_meter
      )
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
        `,
      [
        product_name,
        product_category,
        product_marking,
        product_diameter,
        product_length,
        unit_of_measure,
        weight_per_meter,
      ]
    );
    res.json(newProduct.rows[0]);
  }
  async deleteProduct(req, res) {
    const product_id = req.params.id;
    const product = await pool.query(
      `DELETE FROM product WHERE product_id =$1 RETURNING *`,
      [product_id]
    );
    res.json(product.rows[0]);
  }
}
export default new ProductController();
