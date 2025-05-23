import React, { useState } from 'react';
import AccountChatView from '../AccountChatView';
import Chatbox from '../Chatbox';
import './ChatApp.css';

function AccountChat() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    return (
        <div className="chat-app">
            <AccountChatView onSelectCustomer={setSelectedCustomer} />
            {selectedCustomer ? (
                <Chatbox customer={selectedCustomer} />
            ) : (
                <div className="no-chat-selected">Chọn một khách hàng để bắt đầu chat</div>
            )}
        </div>
    );
}

export default AccountChat;
