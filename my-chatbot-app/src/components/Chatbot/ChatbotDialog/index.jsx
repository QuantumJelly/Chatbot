// CustomChatDialog.js
import React, { useState, useEffect, useRef } from 'react';
import { Input, Avatar, Spin } from 'antd';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import { DefaultChat, QuickReplies, chat } from './chat';

import USER_IMAGE from './image/user.png';
import BOT_IMAGE from './image/bot.jpg';

import './index.css';

const ChatbotDialog = ({ onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const [chatHistory, setChatHistory] = useState(DefaultChat);

  const [isMobile, setIsMobile] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  const chatHistoryRef = useRef(null);

  const inputRef = useRef(null);

  // to simulate robot typing
  const simulateTyping = async () => {
    // simulate robot thinking
    setIsTyping(true);
    setChatHistory(prev => [
      ...prev,
      { text: '', user: 'bot', datetime: new Date() },
    ]);
    setInputValue('');

    const robotReply = await chat();

    // simulate typing
    setTimeout(() => {
      const replyArray = robotReply.split('');

      replyArray.forEach((char, index) => {
        setTimeout(() => {
          setChatHistory((prevHistory) => {
            return [
              ...prevHistory.slice(0, prevHistory.length - 1),
              { text: prevHistory[prevHistory.length - 1]?.text + char, user: 'bot', datetime: new Date() },
            ]
          });

          // scroll to bottom and reset
          if (index === replyArray.length - 1) {
            setIsTyping(false);
            setInputValue('');
            scrollToBottom();
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }
        }, index * 10); // control each char typing
      });
    }, 1000); // simulate 1s delay
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleQuickReply = (reply) => {
    if (reply && isTyping === false) {
      setChatHistory([
        ...chatHistory,
        { text: reply, user: 'user', datetime: new Date() },
      ]);
      simulateTyping();
    }
  };

  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '' && isTyping === false) {
      setChatHistory([
        ...chatHistory,
        { text: inputValue, user: 'user', datetime: new Date() },
      ]);

      simulateTyping();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // resize listener to get current viewport width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // auto scroll whenever the chat adds
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // dialog header
  const renderHeader = () => (
    <div className="header">
      <div className='welcome-header'>
        <Avatar src={BOT_IMAGE} size={'small'} style={{ marginRight: 6 }} />
        Hello!
      </div>
      <div className="welcome-message">How can I help you with queries?</div>
      <CloseOutlined className='welcome-close' onClick={onClose} />
    </div>
  );

  // chat history part
  const renderChatHistory = () => (
    <div className="chat-history" ref={chatHistoryRef}>
      {chatHistory.map((message, index) => {
        if (message.user === 'user') {
          return (
            <div key={index} className={`message-user`}>
              <Avatar src={USER_IMAGE} />
              <div className="message-content">
                {message.text}
              </div>
            </div>
          )
        } else {
          return (
            <div key={index} className={`message-bot`}>
              <Avatar src={BOT_IMAGE} />
              {
                message.text === '' ?
                  (
                    <Spin style={{ marginLeft: 20 }} />
                  ) :
                  (
                    <div className="message-content">
                      {message.text}
                    </div>
                  )
              }
            </div>
          )
        }
      })}
    </div>
  );

  // input and send button
  const renderChatInput = () => (
    <div className='chat-input-wrapper'>
      <div className="chat-input">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
          bordered={false}
          ref={inputRef}
          placeholder="Type a message..."
        />
        <SendOutlined onClick={handleSendMessage} />
      </div>
    </div>
  );

  // Auto reply part
  const renderQuickReplies = () => (
    <div className="quick-replies">
      {QuickReplies.map((reply, index) => (
        <span key={index} onClick={() => handleQuickReply(reply)}>
          {reply}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`${isMobile ? 'mobile-chat-dialog' : 'desktop-chat-dialog'}`}>
      {renderHeader()}
      {renderChatHistory()}
      {renderQuickReplies()}
      {renderChatInput()}
    </div>
  );
};

export default ChatbotDialog;
