import React, { useState, useEffect } from "react";
import { Card, Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useHospital from "../../hooks/useHospital";
import "./HospitalList.css";
import { Link } from "react-router-dom";

function HospitalListView() {
  const [filteredCategory, setFilteredCategory] = useState("all");
  const [sortedByName, setSortedByName] = useState(false);
  const { Meta } = Card;

  // Dropdown menu for filtering by zone
  const menu = (handleFilter) => (
    <Menu>
      <Menu.Item onClick={() => handleFilter("all")}>Tất cả khu vực</Menu.Item>
      <Menu.Item onClick={() => handleFilter("Thủ Đức")}>Thủ Đức</Menu.Item>
      <Menu.Item onClick={() => handleFilter("Quận 10")}>Quận 10</Menu.Item>
      <Menu.Item onClick={() => handleFilter("Quận 5")}>Quận 5</Menu.Item>
      <Menu.Item onClick={() => handleFilter("Quận 6")}>Quận 6</Menu.Item>
    </Menu>
  );

  const { hospitalData, fetchHospitalrData } = useHospital();

  useEffect(() => {
    fetchHospitalrData();
  }, [fetchHospitalrData]);

  // Handle filter selection
  const handleFilter = (category) => {
    setFilteredCategory(category);
  };

  // Sort hospitals by name (A-Z)
  const sortByName = () => {
    setSortedByName((prevSortedByName) => !prevSortedByName);
  };

  // Filter hospitals based on selected category
  const filteredHospitals =
    filteredCategory === "all"
      ? hospitalData
      : hospitalData.filter((hospital) =>
          hospital.Address.toLowerCase().includes(
            filteredCategory.toLowerCase()
          )
        );

  // Apply sorting if necessary
  const sortedHospitals = sortedByName
    ? [...filteredHospitals].sort((a, b) => a.hosname.localeCompare(b.hosname))
    : filteredHospitals;

  return (
    <div className="container ml-[50px] py-40 flex justify-center align-middle">
      {/* Adjust the header and buttons */}
      <div className="flex flex-col items-center w-full mb-[140px] ">
        <div className="flex justify-between items-center w-[100%]">
          <h1 className="text-5xl font-bold text-[#1079B1]">Phòng Khám</h1>
          <div className="flex space-x-4">
            {/* Filter by area */}
            <Dropdown overlay={menu(handleFilter)} trigger={["click"]}>
              <Button className="bg-[#1079B1] w-[234px] rounded-3xl text-white text-base flex justify-between items-center">
                <p> Khu vực </p>
                <p>
                  {" "}
                  <DownOutlined />
                </p>
              </Button>
            </Dropdown>
            {/* Sort by name */}
            <Button
              onClick={sortByName}
              className="bg-[#ffff] w-[100px] rounded-3xl text-[#1079B1] flex items-center justify-between"
            >
              A-Z <DownOutlined />
            </Button>
          </div>
        </div>
        {/* Horizontal line below the header */}
        <div className="w-full h-[2px] bg-[#1079B1] mt-4"></div>
      </div>

      {/* Render hospitals or display message if no results */}
      {sortedHospitals.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[95%]"
          style={{ columnGap: "10px", rowGap: "70px" }} // Adjusted gaps
        >
          {sortedHospitals.map((hospital) => (
            <div key={hospital.id} className="w-[97%] h-100">
              <Link to={`/Hospital/detail/${hospital.Id}`}>
                <Card
                  hoverable
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  cover={
                    <img
                      alt="example"
                      src={hospital.imageurls}
                      className="w-full h-60 object-cover"
                    />
                  }
                >
                  <Meta
                    title={
                      <div
                        style={{
                          minHeight: "100px", // Increased height to allow more room for the text
                          maxHeight: "100px",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          textAlign: "left", // Align title content to the left
                        }}
                      >
                        <h1
                          className="font-bold text-white text-xl"
                          style={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                            lineHeight: "1.2", // Adjusted line height for better readability
                          }}
                        >
                          {hospital.hosname}
                        </h1>
                        <h2 className="text-white">{hospital.Zone}</h2>
                      </div>
                    }
                    description={
                      <div
                        style={{
                          minHeight: "60px",
                          maxHeight: "60px",
                          overflow: "hidden",
                          paddingTop: "8px",
                          textAlign: "left", // Align description content to the left
                        }}
                      >
                        <p className="text-white text-sm break-words">
                          {hospital.Address}
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
        <div className="w-full h-[400px] flex justify-center items-center">
          <h2 className="text-xl text-gray-500">
            Không tìm thấy phòng khám phù hợp.
          </h2>
        </div>
      )}
    </div>
  );
}

export default HospitalListView;
