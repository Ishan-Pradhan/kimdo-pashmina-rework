import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminMenu from "../../components/AdminPage/AdminMenu";
import { useProductContext } from "../../context/productcontext";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:8000/api/v1/product";

function UpdateProducts() {
  const navigate = useNavigate();

  const [productImg, setProductImg] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState("");
  const [featured, setFeatured] = useState(false);
  const [generalCategory, setGeneralCategory] = useState("");
  const [genderCategory, setGenderCategory] = useState("");
  const [stock, setStock] = useState();
  const [composition, setComposition] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { getSingleProduct, singleProduct } = useProductContext();
  const { id } = useParams();

  useEffect(() => {
    getSingleProduct(`${API}/${id}`);
  }, []);

  useEffect(() => {
    if (singleProduct) {
      setProductImg(singleProduct.productImg || "");
      setProductName(singleProduct.productName || "");
      setDescription(singleProduct.description || "");
      setPrice(singleProduct.price || "");
      setDiscount(singleProduct.discount || "");
      setFeatured(singleProduct.featured || false);
      setGeneralCategory(singleProduct.generalCategory || "");
      setGenderCategory(singleProduct.genderCategory || "");
      setStock(singleProduct.stock);
      setComposition(singleProduct.composition || "");
      setWeight(singleProduct.weight || "");
      setSize(singleProduct.size || "");
    }
  }, [singleProduct]);

  if (stock < 0) {
    return setStock(0);
  }

  const handleImageChange = (e) => {
    console.log("handle image change");
    const newImage = e.target.files[0];

    if (newImage) {
      console.log("Selected image:", newImage);
      setProductImg(newImage);
    }
  };

  const handleNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const handleFeaturedChange = (e) => {
    setFeatured(e.target.checked);
  };

  const handleGeneralCategoryChange = (e) => {
    setGeneralCategory(e.target.value);
  };

  const handleGenderCategoryChange = (e) => {
    setGenderCategory(e.target.value);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleCompositionChange = (e) => {
    setComposition(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(`/api/v1/product/${id}`);
      toast.success("product deleted successfully");
      navigate("/dashboard/admin/manage-products");
    } catch (error) {
      console.log(error);
      toast.error("error deleting");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      console.log("Current productImg:", productImg);
      const formData = new FormData();
      if (productImg) {
        formData.append("productImg", productImg);
      }

      formData.append("productName", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("featured", featured);
      formData.append("generalCategory", generalCategory);
      formData.append("genderCategory", genderCategory);
      formData.append("stock", stock);
      formData.append("composition", composition);
      formData.append("weight", weight);
      formData.append("size", size);

      const { data } = await axios.put(`/api/v1/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success("Product updated sucessfully");
        navigate("/dashboard/admin/manage-products");
      } else {
        toast.error(data.message);
      }

      console.log(data);
    } catch (error) {
      console.log("error updating products", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="container  flex justify-start items-start gap-10 ">
        <AdminMenu />
        <div className="flex flex-col justify-center items-center w-full mt-10">
          <h2 className="text-2xl uppercase font-head font-bold mb-1 text-center">
            Update-product
          </h2>
          <form
            encType="multipart/form-data"
            className="border border-[#888]-2  p-10 flex flex-col gap-4 my-5 bg-white shadow-lg"
          >
            <div className="flex items-center gap-10">
              <label htmlFor="productImg" className=" w-40 place-items-center">
                {productImg ? (
                  <img className="border shadow-lg" src={productImg} />
                ) : (
                  <div>new photo</div>
                )}
              </label>
              <input
                className="col-span-2 "
                type="file"
                id="productImg"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex flex-col mb-2 gap-2">
              <label className="text-[#222]" htmlFor="productName">
                Product Name:
              </label>
              <input
                className=" border border-[#888] px-3 py-1 col-span-2"
                type="text"
                id="productName"
                value={productName}
                onChange={handleNameChange}
              />
            </div>

            <div className="flex flex-col mb-2 gap-2">
              <label className="text-[#222]" htmlFor="description">
                Description:
              </label>
              <textarea
                className=" border border-[#888] px-3 py-1 col-span-2"
                rows="6"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>

            <div className="flex flex-col mb-2 gap-2">
              <label className="text-[#222]" htmlFor="price">
                Price:
              </label>
              <input
                className=" border border-[#888] px-3 py-1 col-span-2 "
                type="text"
                id="price"
                value={price}
                onChange={handlePriceChange}
              />
            </div>

            <div className="flex flex-col mb-2 gap-2">
              <label className="text-[#222]" htmlFor="discount">
                Discount:
              </label>
              <input
                className=" border border-[#888] px-3 py-1 col-span-2"
                type="text"
                id="discount"
                value={discount}
                onChange={handleDiscountChange}
              />
            </div>

            <div className="flex  mb-2 gap-10">
              <label className="text-[#222]" htmlFor="featured">
                Featured
              </label>
              <div className="col-span-2 px-2 flex gap-3">
                <input
                  className="  "
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={handleFeaturedChange}
                />
                <p className="text-sm">
                  Click to feature this product in the homepage
                </p>
              </div>
            </div>

            <div className="flex flex-col mb-2 gap-2">
              <label className="text-[#222]" htmlFor="generalCategory">
                General Category:
              </label>
              <select
                className=" border border-[#888] px-3 py-1 col-span-2"
                id="generalCategory"
                value={generalCategory}
                onChange={handleGeneralCategoryChange}
              >
                <option value="shawl">Shawl</option>
                <option value="muffler">Muffler</option>
                <option value="poncho">Poncho</option>
                <option value="blanket">Blanket</option>
              </select>
            </div>

            <div className="flex flex-col mb-2 gap-2">
              <label className="text-[#222]" htmlFor="genderCategory">
                Gender Category:
              </label>
              <select
                className=" border border-[#888] px-3 py-1 col-span-2"
                id="genderCategory"
                value={genderCategory}
                onChange={handleGenderCategoryChange}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>

            <div className="flex flex-col mb-2 gap-2">
              <label className="text-[#222]" htmlFor="stock">
                Stock:
              </label>
              <input
                className=" border border-[#888] px-3 py-1 col-span-2"
                type="number"
                id="stock"
                value={stock}
                onChange={handleStockChange}
              />
            </div>

            <div className="flex flex-col mb-2 gap-2">
              <label className="text-[#222]" htmlFor="composition">
                Composition:
              </label>
              <input
                className=" border border-[#888] px-3 py-1 col-span-2"
                type="text"
                id="composition"
                value={composition}
                onChange={handleCompositionChange}
              />
            </div>

            <div className="flex flex-col mb-2 gap-2">
              <label className="text-[#222]" htmlFor="weight">
                Weight:
              </label>
              <input
                className=" border border-[#888] px-3 py-1 col-span-2"
                type="text"
                id="weight"
                value={weight}
                onChange={handleWeightChange}
              />
            </div>

            <div className="flex flex-col mb-2 gap-2">
              <label className="text-[#222]" htmlFor="size">
                Size:
              </label>
              <input
                className=" border border-[#888] px-3 py-1 col-span-2"
                type="text"
                id="size"
                value={size}
                onChange={handleSizeChange}
              />
            </div>
            <div className="flex justify-between items-center col-span-3 mt-10 ">
              <button
                className="bg-red-300 group text-red-700 font-semibold py-2 px-6 text-md  transition-all duration-300 ease-in hover:bg-red-600 hover:text-background hover:ease-in-out md:w-auto flex gap-3 items-center"
                onClick={handleDelete}
              >
                Delete
                <i className="fa-solid fa-trash text-red-700 transition group:duration-300 ease-in group-hover:text-background"></i>
              </button>
              <button
                className="bg-secondary text-background font-semibold py-2 px-3 text-md   transition delay-50 ease-in hover:bg-secondaryTint hover:text-text hover:ease-in-out md:w-auto flex gap-3 items-center"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default UpdateProducts;
