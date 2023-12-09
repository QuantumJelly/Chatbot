import React, { Fragment, useState } from 'react';
import { Button } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import ChatbotDialog from './ChatbotDialog';

import './index.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <div className={`floating-window ${isOpen ? 'open' : ''}`}>
        {
          !isOpen
          &&
          <Button
            className="toggle-button"
            type="primary"
            style={{
              height: 60,
              width: 60,
            }}
            icon={<CommentOutlined />}
            onClick={toggleChatbot}
          />
        }
      </div>
      {
        isOpen
        &&
        <ChatbotDialog isOpen={isOpen} onClose={() => {
          setIsOpen(false);
        }} />
      }
    </Fragment>
  );
};

export default Chatbot;
