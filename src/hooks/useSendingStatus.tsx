import { useState } from 'react';

const useSendingStatus = () => {
  const [isSending, setSendingStatus] = useState(false);
  const toggleSendingStatus = () => {
    setSendingStatus((status) => !status);
  };

  return { isSending, toggleSendingStatus };
};

export { useSendingStatus };
