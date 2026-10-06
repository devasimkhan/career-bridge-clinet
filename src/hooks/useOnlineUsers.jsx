import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5050';

// Realtime online presence — socket se live online users ki list.
// Counselor online aaye/jaaye to turant update (initial list + live events).
export default function useOnlineUsers(token) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!token) return;
    const socket = io(SOCKET_URL, { auth: { token } });

    socket.on('online_list', ({ onlineUsers: list }) => {
      if (Array.isArray(list)) setOnlineUsers(list.map(String));
    });
    socket.on('user_online', ({ userId: online }) =>
      setOnlineUsers((prev) => (prev.includes(String(online)) ? prev : [...prev, String(online)]))
    );
    socket.on('user_offline', ({ userId: offline }) =>
      setOnlineUsers((prev) => prev.filter((id) => id !== String(offline)))
    );

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return onlineUsers;
}
