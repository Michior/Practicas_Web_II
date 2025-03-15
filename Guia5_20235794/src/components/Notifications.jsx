import React from 'react'
import { useNotification } from '../store/notificationsSlice';

export const Notifications = () => {
    const notifications = useNotification((state) => state.notifications);

    return (
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 rounded-lg shadow-lg text-white ${
              notif.type === "error" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {notif.message}
          </div>
        ))}
      </div>
    );
}
