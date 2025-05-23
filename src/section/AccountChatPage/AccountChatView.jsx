import React, { useState } from 'react';
import '../AccountChatPage/views/ChatApp.css';

const customers = [
    { id: 1, name: 'Dat' },
    { id: 2, name: 'Minh' },
    { id: 3, name: 'Kiet' },
];

function AccountChatView({ onSelectCustomer }) {
    return (
        <div className="customer-list">
            <h3>Danh sách khách hàng</h3>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id} onClick={() => onSelectCustomer(customer)}>
                        {customer.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AccountChatView;
