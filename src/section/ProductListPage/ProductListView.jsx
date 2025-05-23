import React, { useState, useEffect } from "react";
import { Card, Dropdown, Menu, Button, Spin, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useProduct from "../../hooks/useProduct";
import "./ProductList.css";
import { Link } from "react-router-dom";

function ProductListView() {
  const [filteredCategory, setFilteredCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState(null); // New state for sorting (null, 'name', 'price')
  const { Meta } = Card;
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Danh mục sản phẩm"); // Placeholder state

  const { productData, fetchProductrData } = useProduct();

  useEffect(() => {
    const loadProductDetail = async () => {
      await fetchProductrData();
      setLoading(false);
    };
    loadProductDetail();
  }, [fetchProductrData]);

  const handleFilter = (category) => {
    setFilteredCategory(category);
    setSelectedCategory(category === "all" ? "Danh mục sản phẩm" : category); // Update dropdown text
  };

  const handleSort = (order) => {
    setSortOrder(order); // Sort products based on name or price
  };

  // Filter products based on selected category
  const filteredProducts =
    filteredCategory === "all"
      ? productData
      : productData.filter((product) =>
          product.nameproduct
            .toLowerCase()
            .includes(filteredCategory.toLowerCase())
        );

  // Sort products based on sortOrder state
  const sortedProducts =
    sortOrder === "name"
      ? [...filteredProducts].sort((a, b) =>
          a.nameproduct.localeCompare(b.nameproduct)
        )
      : sortOrder === "price-asc"
      ? [...filteredProducts].sort((a, b) => a.Price - b.Price)
      : sortOrder === "price-desc"
      ? [...filteredProducts].sort((a, b) => b.Price - a.Price) // Sort by descending price
      : filteredProducts;
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container w-full ml-[100px] py-40 flex justify-center align-middle ">
      <div className="w-full flex justify-center items-center mb-[140px] relative">
        <h1 className="text-5xl font-bold text-[#1079B1] absolute left-0">
          Sản phẩm
        </h1>
        <div className="absolute top-[50px] left-0 w-[93%] h-[2px] bg-[#1079B1]"></div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => handleFilter("all")}>
                Tất cả sản phẩm
              </Menu.Item>
              <Menu.Item onClick={() => handleFilter("cổ")}>Cổ</Menu.Item>
              <Menu.Item onClick={() => handleFilter("lưng")}>Vai</Menu.Item>
              <Menu.Item onClick={() => handleFilter("tay")}>Tay</Menu.Item>
              <Menu.Item onClick={() => handleFilter("đầu gối")}>
                Đầu gối
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button className="bg-[#1079B1] w-[234px] rounded-3xl text-white absolute right-64 text-base flex justify-between align-middle mt-5 pb-7">
            <p>{selectedCategory}</p>
            <DownOutlined className="mt-2"/>
          </Button>
        </Dropdown>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => handleSort("name")}>
                Tên A-Z
              </Menu.Item>
              <Menu.Item onClick={() => handleSort("price-asc")}>
                Giá thấp đến cao
              </Menu.Item>
              <Menu.Item onClick={() => handleSort("price-desc")}>
                Giá cao đến thấp
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button className="bg-[#ffff] w-[100px] rounded-3xl text-[#1079B1] absolute right-28 mt-5 flex justify-center">
            <p className="mr-3">A-Z</p>
             <p><DownOutlined /></p>
          </Button>
        </Dropdown>
      </div>
      {sortedProducts.length > 0 ? (
       <div
       className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[95%]"
       style={{ columnGap: "3px", rowGap: "70px" }} // Adjusted gaps
     >
       {sortedProducts.map((product) => (
         <div key={product.Id} className="w-[93%] h-100">
           <Link to={`/San-pham/detail/${product.Id}`}>
             <Card
               hoverable
               style={{
                width: "100%", // Ensure the card fills the container
                height: "350px", // Set a fixed height for the card
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Ensure content fills and spaces out properly
              }}
               cover={
                 <img
                   alt="example"
                   src={product.imageurls}
                   className="w-full h-60 object-cover"
                 />
               }
             >
               <Meta
                 title={
                   <div
                     style={{
                       height: "60px",
                       overflow: "hidden",
                     }}
                   >
                     <h1
                       className="font-bold text-white text-xl"
                       style={{
                         wordWrap: "break-word",
                         whiteSpace: "normal",
                         overflow: "hidden",
                       }}
                     >
                       {product.nameproduct}
                     </h1>
                     <h1 className="text-white">
  {Number(product.Price).toLocaleString("vi-VN")} đ
</h1>
                   </div>
                 }
                 description={
                   <div>
                     <p className="text-white text-sm truncate" style={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                            overflow: "hidden", // Hide any overflow
                          }}>
                       {product.descriptionproduct}
                     </p>
                   </div>
                 }
               />
             </Card>
           </Link>
         </div>
       ))}
     </div>
     
      ) : (
        <div className="w-full flex justify-center items-center h-64">
          <h2 className="text-xl text-gray-500">
            Không tìm thấy sản phẩm phù hợp.
          </h2>
        </div>
      )}
    </div>
  );
}

export default ProductListView;
