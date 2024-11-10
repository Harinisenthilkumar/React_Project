import { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.mp4";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "", //here it's name
    image: "",
    category: "Vegetarian",
    new_price: "",

    old_price: "",
  });

  // Handler for image selection
  const imageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handler for other product detail changes
  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle product addition (e.g., form submission)
  const handleAddProduct = async () => {
    console.log("Product details:", productDetails);
    console.log("Selected image:", image);

    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("image", image); // Neenga `product` nu write panni irundhiga

    // First API call to upload image
    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct",{
        method :'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("product added"):alert("Failed")

      })

      // Second API call to add the product with image URL
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Product Not Added");
        });
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name} // Inga title nu write panni irundhinga
          onChange={changeHandler}
          type="text"
          name="name" // Same here
          placeholder="Type Here"
        />
      </div>

      {/* Price and Offer Price in the same row */}
      <div className="add-product-price">
        <div className="add-product-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type Here"
          />
        </div>
        <div className="add-product-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type Here"
          />
        </div>
      </div>

      {/* Category Selector */}
      <div className="add-product-itemfield">
        <p>Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector">
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Desserts">Desserts</option>
        </select>
      </div>

      {/* Image Preview for File Upload */}
      <div className="add-product-itemfield">
        <label htmlFor="file-input">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              className="add-product-thumbnail-preview"
              alt="Selected Preview"
            />
          ) : (
            <video
              src={upload_area}
              className="add-product-thumbnail-video"
              autoPlay
              loop
              muted
            />
          )}
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      {/* Submit Button */}
      <button onClick={handleAddProduct} className="addproduct">
        Add
      </button>
    </div>
  );
};

export default AddProduct;
