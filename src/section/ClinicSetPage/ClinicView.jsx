import React, { useEffect, useState } from "react";
import useHospital from "../../hooks/useHospital";
import { Table, Tag, Button, notification } from "antd";
import { confirmbooking, Canclebooking } from '../../api/hospital'; // Import your API functions
import useUser from "../../hooks/useUser";

function ClinicView() {
    const { bookingData, fetchBookingData } = useHospital();
    const [loading, setLoading] = useState(true);
    const { CustomerData, fetchCustomer } = useUser();
    const [mergedData, setMergedData] = useState([]);

    useEffect(() => {
        const loadBookingData = async () => {
            setLoading(true);
            await fetchBookingData();
            await fetchCustomer(); // Fetch customer data as well
            setLoading(false);
        };
        loadBookingData();
    }, [fetchBookingData, fetchCustomer]);

    useEffect(() => {
        if (bookingData.length && CustomerData.length) {
            const merged = bookingData.map(booking => {
                const customer = CustomerData.find(cust => cust.Id === booking.UserId);
                return {
                    ...booking,
                    Email: customer?.Email || 'N/A',
                    TelephoneNumber: customer?.TelephoneNumber || 'N/A',
                };
            });
            setMergedData(merged);
        }
    }, [bookingData, CustomerData]);

    const handleConfirm = async (id) => {
        try {
            await confirmbooking(id); // Call the API to confirm booking
            notification.success({
                message: 'Xác nhận đặt lịch',
                description: `Đặt lịch với mã ${id} đã được xác nhận.`,
            });
            await fetchBookingData(); // Refresh booking data
        } catch (error) {
            notification.error({
                message: 'Xác nhận thất bại',
                description: 'Có lỗi khi xác nhận đặt lịch.',
            });
        }
    };

    const handleCancel = async (id) => {
        try {
            await Canclebooking(id); // Call the API to cancel booking
            notification.success({
                message: 'Hủy đặt lịch',
                description: `Đặt lịch với mã ${id} đã được hủy.`,
            });
            await fetchBookingData(); // Refresh booking data
        } catch (error) {
            notification.error({
                message: 'Hủy thất bại',
                description: 'Có lỗi khi hủy đặt lịch.',
            });
        }
    };

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'Id',
            key: 'Id',
        },
        {
            title: 'Tài khoản',
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
            title: 'Phòng khám',
            dataIndex: 'Hosname',
            key: 'Hosname',
        },
        {
            title: 'Thời gian',
            dataIndex: 'Date',
            key: 'Date',
            render: (date) => new Date(date).toLocaleString(), // Format the date
        },
        {
            title: 'Trạng thái',
            dataIndex: 'Status',
            key: 'Status',
            render: (status) => (
                <Tag color={status === 2 ? "blue" : status === 1 ? "orange" : "red"}>
                    {status === 2 ? "Hoàn tất" : status === 1 ? "Đang xử lý" : "Unknown"}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                record.Status === 1 && ( // Only show buttons for pending bookings
                    <div>
                        <Button 
                            type="primary" 
                            onClick={() => handleConfirm(record.Id)}
                            style={{ marginRight: 8 }}
                        >
                            Xác nhận
                        </Button>
                        <Button 
                            type="danger" 
                            onClick={() => handleCancel(record.Id)}
                        >
                            Hủy
                        </Button>
                    </div>
                )
            ),
        },
    ];

    return (
        <div className="appointment-page">
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

export default ClinicView;
