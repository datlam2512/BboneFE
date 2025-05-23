import React, { useState, useEffect } from 'react';
import useOrder from "../../hooks/useOrder";
import { Table, Tag, Button, notification } from "antd";
import './OrderView.css';
import { purchaseconfirm, Cancle } from '../../api/orderapi'; // Import cancel function
import useUser from "../../hooks/useUser";

function OrderView() {
    const { orderData, fetchOrderData } = useOrder();
    const { CustomerData, fetchCustomer } = useUser();
    const [loading, setLoading] = useState(true);
    const [mergedData, setMergedData] = useState([]);

    useEffect(() => {
        const loadOrderData = async () => {
            setLoading(true);
            await fetchOrderData();
            await fetchCustomer(); // Fetch customer data as well
            setLoading(false);
        };
        loadOrderData();
    }, [fetchOrderData, fetchCustomer]);

    useEffect(() => {
        if (orderData.length && CustomerData.length) {
            const merged = orderData.map(order => {
                const customer = CustomerData.find(cust => cust.Id === order.UserId);
                return {
                    ...order,
                    Email: customer?.Email || 'N/A',
                    TelephoneNumber: customer?.TelephoneNumber || 'N/A',
                };
            });
            setMergedData(merged);
        }
    }, [orderData, CustomerData]);

    const handleConfirmPayment = async (orderId) => {
        try {
            await purchaseconfirm(orderId);
            notification.success({
                message: 'Đã xác nhận thanh toán',
                description: `Thanh toán cho đơn ${orderId} đã xác nhận.`,
            });
            await fetchOrderData(); // Refresh order data
        } catch (error) {
            notification.error({
                message: 'Xác nhận thanh toán thất bại',
                description: 'Có lỗi khi xác nhận thanh toán.',
            });
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await Cancle(orderId); // Call the API to cancel the order
            notification.success({
                message: 'Đã hủy đơn hàng',
                description: `Đơn hàng ${orderId} đã được hủy.`,
            });
            await fetchOrderData(); // Refresh the order data
        } catch (error) {
            notification.error({
                message: 'Hủy đơn hàng thất bại',
                description: 'Có lỗi khi hủy đơn hàng.',
            });
        }
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'Id',
            key: 'Id',
        },
        {
            title: 'Khách hàng',
            dataIndex: 'UserName',
            key: 'UserName',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'TelephoneNumber',
            key: 'TelephoneNumber',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'Status',
            key: 'Status',
            render: (status) => (
                <Tag color={status === 3 ? "red" : status === 2 ? "green" : "blue"}>
                    {status === 3 ? "Đã hủy" : status === 2 ? "Đã xác nhận" : "Đang xử lý"}
                </Tag>
            ),
        },
        {
            title: 'Sản phẩm',
            key: 'OrderDetails',
            render: (_, record) => (
                record.OrderDetails.map(detail => (
                    <div key={detail.Id}>
                        <p>{detail.NameProduct}</p>
                        <p>Giá: {detail.Price} VND</p>
                        <p>Số lượng: {detail.QuantityProduct}</p>
                    </div>
                ))
            ),
        },
        {
            title: 'Tổng cộng',
            dataIndex: 'TotalPrice',
            key: 'TotalPrice',
            render: (price) => `${price} VND`,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                record.Status === 1 && ( // Only show buttons for pending orders
                    <div>
                        <Button 
                            type="primary" 
                            onClick={() => handleConfirmPayment(record.Id)}
                            style={{ marginRight: 8 }}
                        >
                            Xác nhận thanh toán
                        </Button>
                        <Button 
                            type="danger" 
                            onClick={() => handleCancelOrder(record.Id)}
                        >
                            Hủy đơn
                        </Button>
                    </div>
                )
            ),
        },
    ];

    return (
        <div className="order-page">
            {/* Table Component */}
            <Table
                dataSource={mergedData}
                columns={columns}
                rowKey="Id"
                pagination={{ pageSize: 5 }}
                loading={loading} // Show loading spinner while data is being fetched
            />
        </div>
    );
}

export default OrderView;
