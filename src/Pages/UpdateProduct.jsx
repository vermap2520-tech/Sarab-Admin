import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [product, setProduct] = useState({
    image: "",
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    discount: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/product/singleProduct/${id}`
      );

      setProduct(res.data.data);
    } catch (error) {
      console.log("Get Product Error:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // CHANGE IMAGE
  // =========================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    // Preview selected image
    const imageUrl = URL.createObjectURL(file);

    setProduct({
      ...product,
      image: imageUrl,
    });
  };

  const handleChangeImageClick = () => {
    fileInputRef.current.click();
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("discount", product.discount);

      // Send new image only if selected
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await axios.post(
        `http://localhost:5000/api/product/updateProduct/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product Updated Successfully");
      navigate("/product");
    } catch (error) {
      console.log("Update Product Error:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="update-product-page">

      {/* ================= HEADER ================= */}

      <div className="update-product-header">
        <div>
          <h1>Update Product</h1>
          <p>Edit product information and save your changes.</p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/product")}
        >
          ← Back to Products
        </button>
      </div>

      {/* ================= CARD ================= */}

      <div className="update-product-card">

        <div className="form-header">
          <h2>Product Details</h2>
          <span>Product #{id}</span>
        </div>

        <form className="update-form" onSubmit={handleSubmit}>

          {/* ================= IMAGE ================= */}

          <div className="form-group full-width">

            <label>Product Image</label>

            <div className="image-section">

              <div className="image-preview">

                {product.image ? (
                  <img
                    src={`http://localhost:5000/image-uploads/${product.image}`}
                    alt={product.title || "Product"}
                  />
                ) : (
                  <span>No Image</span>
                )}

              </div>

              <div className="image-actions">

                {/* Hidden File Input */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />

                {/* Change Image Button */}

                <button
                  type="button"
                  className="change-image-btn"
                  onClick={handleChangeImageClick}
                >
                  📷 Change Image
                </button>

                <p>
                  JPG, PNG or WEBP
                  <br />
                  Maximum size: 5MB
                </p>

              </div>

            </div>

          </div>

          {/* ================= PRODUCT NAME ================= */}

          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              name="title"
              placeholder="Enter product name"
              value={product.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* ================= CATEGORY ================= */}

          <div className="form-group">
            <label>Category</label>

            <input
              type="text"
              name="category"
              placeholder="Enter category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </div>

          {/* ================= PRICE ================= */}

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* ================= DISCOUNT ================= */}

          <div className="form-group">
            <label>Discount Price </label>

            <input
              type="string"
              name="discount price"
              placeholder="Enter discount price"
              value={product.discount}
              onChange={handleChange}
            // min="0"
            />
          </div>

          {/* ================= STOCK ================= */}

          <div className="form-group">
            <label>Stock</label>

            <input
              type="number"
              name="stock"
              placeholder="Enter stock quantity"
              value={product.stock}
              onChange={handleChange}
              min="0"
            />
          </div>

          {/* ================= DESCRIPTION ================= */}

          <div className="form-group full-width">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter product description"
              value={product.description}
              onChange={handleChange}
              rows="5"
            />
          </div>

          {/* ================= BUTTONS ================= */}

          <div className="form-actions full-width">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/product")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-btn"
            >
              Update Product
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}