import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col } from 'antd';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useOrder from "../../hooks/useOrder";
import useUser from '../../hooks/useUser';
const { Header, Content } = Layout;

const DashboardView = () => {
  const [chartData, setChartData] = useState([]);
  const { ordertotalData, fetchOrderTotalData } = useOrder(); // Custom hook for orders
  const { ordertotalsucessData, fetchOrderSucessTotalData } = useOrder(); // Custom hook for orders
  const { CustomercountData, fetchCountCustomer } = useUser();
  console.log("check customer count",ordertotalData)
  useEffect(() => {
    // Fetch total order data
    fetchOrderTotalData();
    fetchOrderSucessTotalData();
    fetchCountCustomer();
    // Mock data for previous years
    const fakeData = [
      { year: 2020, totalsales: 900000, totalorders: 15 },
      { year: 2021, totalsales: 1000000, totalorders: 22 },
      { year: 2022, totalsales: 1200000, totalorders: 25 },
      { year: 2023, totalsales: 2000000, totalorders: 28 },
    ];

    // Add real data for 2024 if available
    if (ordertotalData && ordertotalData.length > 0) {
      const { totalsales, totalorders } = ordertotalData[0]; // Assuming first item contains sales and orders for 2024
      fakeData.push({ year: 2024, totalsales, totalorders });
    }
 
    // Update state with the combined data (real + fake)
    setChartData(fakeData);
  }, [ordertotalData]);

  // Format numbers for display
  const formatCurrency = value => Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  const formatNumber = value => Intl.NumberFormat('vi-VN').format(value);

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Header className="bg-white text-gray-900 shadow-lg text-2xl py-4 px-6">Dashboard</Header>
      <Content className="p-6">
        {/* Stat cards */}
        <Row gutter={16}>
          <Col span={8}>
            <Card className="bg-gradient-to-r from-pink-500 to-red-400 text-white text-center shadow-md">
              <h2 className="text-4xl font-semibold">{formatCurrency(chartData[4]?.totalsales || 0)}</h2>
              <p>Total Sales (2024)</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white text-center shadow-md">
              <h2 className="text-4xl font-semibold">{formatNumber(chartData[4]?.totalorders || 0)}</h2>
              <p>Total Orders (2024)</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="bg-gradient-to-r from-green-400 to-teal-400 text-white text-center shadow-md">
              <h2 className="text-4xl font-semibold">{CustomercountData.UserCount}</h2>
              <p>Customer(2024)</p>
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={16} className="mt-8">
          <Col span={12}>
            {/* Total Sales Line Chart */}
            <Card title="Total Sales Over Years" className="shadow-md">
              <LineChart width={400} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalsales" stroke="#8884d8" />
              </LineChart>
            </Card>
          </Col>
          <Col span={12}>
            {/* Total Orders Bar Chart */}
            <Card title="Total Orders Over Years" className="shadow-md">
              <BarChart width={400} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalorders" fill="#82ca9d" />
              </BarChart>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashboardView;
