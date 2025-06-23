import React, { useEffect } from 'react';

const MessageBanner = ({ message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Clear message after 3 seconds
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [message]);
  
  return (
    <div className="message-banner">
      {message}
    </div>
  );
};

export default MessageBanner;