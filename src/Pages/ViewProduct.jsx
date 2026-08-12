import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/product/singleProduct/${id}`
      );

      console.log("Product:", res.data);

      setProduct(res.data.data);
    } catch (error) {
      console.error(
        "Error fetching product:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="view-product">
      <div className="view-card">
        {product.image ? (
          <img
            src={`http://localhost:5000/image-uploads/${product.image}`}
            alt={product.title}
          />
        ) : (
          <p>No Image</p>
        )}

        <h2>{product.title}</h2>

        <p>
          <strong>Category :</strong> {product.category}
        </p>

        <p>
          <strong>Price :</strong> $ {product.price}
        </p>

        <p>
          <strong>Quantity :</strong> {product.quantity}
        </p>

        <p>
          <strong>Discount Price :</strong> $ {product.discount}
        </p>

        <p>
          <strong>Description :</strong>
        </p>

        <p>{product.description}</p>

        <button
          onClick={() => navigate("/product")}
          className="back-btn"
        >
          ← Back to Products
        </button>
      </div>
    </div>
  );
}