import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/product/singleProduct/${id}`,
      );
      setProduct(res.data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-product">
      <div className="view-card">
        <img
          src={`http://localhost:5000/image-uploads/${product.image}`}
          alt={product.title}
        />
        <h2>{product.title}</h2>
        <p>
          <strong>Category :</strong> {product.category}
        </p>
        <p>
          <strong>Price :</strong> $ {product.price}
        </p>
        <p>
          <strong>Stock :</strong> {product.stock}
        </p>
        <p>
          <strong>Discount Price :</strong> $ {product.discount}
        </p>
        <p>
          <strong>Description :</strong>
        </p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
