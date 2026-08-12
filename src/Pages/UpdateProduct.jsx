import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    image: "",
    title: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    discount: "",
  });

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // GET SINGLE PRODUCT
  // =========================

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/product/singleProduct/${id}`
      );

      console.log("Product:", res.data);

      const productData = res.data.data;

      setProduct({
        image: productData.image || "",
        title: productData.title || "",
        description: productData.description || "",
        category: productData.category || "",
        price: productData.price || "",
        quantity: productData.quantity || "",
        discount: productData.discount || "",
      });

      setOldImage(productData.image || "");
    } catch (error) {
      console.log(
        "Get Product Error:",
        error.response?.data || error.message
      );

      alert("Product data not found");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // CHANGE IMAGE
  // =========================

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      return;
    }

    // Image validation 
    if (!selectedImage.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    // 5 MB validation
    // if (selectedImage.size > 5 * 1024 * 1024) {
    //   alert("Image size must be less than 5MB");
    //   return;
    // }
    console.log(selectedImage);
    setImage(selectedImage);
  };

  // =========================
  // UPDATE PRODUCT
  // =========================

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);
      formData.append("discount", product.discount);

      // New image only
      if (image) {
        formData.append("image", image);
      }

      // Check FormData
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await axios.post(
        `http://localhost:5000/api/product/updateProduct/${id}`,
        formData
      );

      console.log("Update Response:", res.data);

      alert("Product Updated Successfully");

      navigate("/product");
    } catch (error) {
      console.log(
        "Update Product Error:",
        error.response?.data || error.message
      );

      alert("Product update failed");
    } finally {
      setLoading(false);
    }
  };

  // IMAGE URL
  const imagePreview = image ? URL.createObjectURL(image) : oldImage
    ? `http://localhost:5000/image-uploads/${oldImage}` : "";

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

        <form
          className="update-form"
          onSubmit={handleUpdate}
        >
          {/* ================= IMAGE ================= */}

          <div className="form-group full-width">
            <label>Product Image</label>

            <div className="image-section">
              <div className="image-preview">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={product.title || "Product"}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>

              <div className="image-actions">
                <input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />

                <label
                  htmlFor="productImage"
                  className="change-image-btn"
                  style={{
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                >
                  📷 Change Image
                </label>

                {image && (
                  <p>Selected : <strong>{image.name}</strong></p>
                )}

                {/* <p>
                  JPG, PNG or WEBP
                  <br />
                  Maximum size: 5MB
                </p> */}
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
              min="0"
              required
            />
          </div>

          {/* ================= DISCOUNT ================= */}

          <div className="form-group">
            <label>Discount Price</label>

            <input
              type="number"
              name="discount"
              placeholder="Enter discount price"
              value={product.discount}
              onChange={handleChange}
              min="0"
            />
          </div>

          {/* ================= QUANTITY ================= */}

          <div className="form-group">
            <label>Quantity</label>

            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              value={product.quantity}
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
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
