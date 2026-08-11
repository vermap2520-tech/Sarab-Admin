import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    discount: "",
  });

  const [image, setImage] = useState();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fdata = new FormData();
    fdata.append("title", product.title);
    fdata.append("category", product.category);
    fdata.append("price", product.price);
    fdata.append("stock", product.stock);
    fdata.append("description", product.description);
    fdata.append("discount", product.discount);
    fdata.append("image", image);

    // Add your API here
    try {
      const res = await axios.post(
        "http://localhost:5000/api/product/add",
        fdata,
      );
      console.log(res);
      alert("Product Added Successfully!");

      setProduct({
        title: "",
        category: "",
        price: "",
        stock: "",
        discount: "",
        image: "",
        description: "",
      });
      setImage(null);
    } catch (error) {
      console.log(error.res?.data || error.message);
      alert("Error in adding product");
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2>Add New Product</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="input-group">
            <label>Product Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Product Title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter Price"
                value={product.price}
                onChange={handleChange}
                // required
              />
            </div>

            <div className="input-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                placeholder="Enter Stock"
                value={product.stock}
                onChange={handleChange}
                // required
              />
            </div>
            <div className="input-group">
              <label>Discount</label>
              <input
                type="number"
                name="discount"
                placeholder="Enter Discount"
                value={product.discount}
                onChange={handleChange}
                // required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Image URL</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              // required
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Enter Product Description"
              value={product.description}
              onChange={handleChange}
              // required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
