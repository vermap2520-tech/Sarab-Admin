import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product/all");

      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/product/deleteProduct/${id}`,
      );
      alert("Product deleted successfully");
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>Products List</h2>

        <button className="add-btn" onClick={() => navigate("/add")}>
          Add Product
        </button>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Discount Price</th>
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={`http://localhost:5000/image-uploads/${product.image}`}
                  alt={product.title}
                  width="50px"
                />
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td> $ {product.price}</td>
              <td>{product.stock}</td>
              <td> $ {product.discount}</td>

              <td>
                <button
                  className="view-btns"
                  onClick={() => navigate(`/viewProduct/${product._id}`)}
                >
                  View
                </button>
              </td>

              <td>
                <button
                  className="update-btns"
                  onClick={() => navigate(`/updateProduct/${product._id}`)}
                >
                  Update
                </button>
              </td>

              <td>
                <button
                  className="delete-btns"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
