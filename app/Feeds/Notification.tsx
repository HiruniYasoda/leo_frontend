// Feeds/Notification.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import NotificationCard from '../../components/NotificationCard';  // Import the external NotificationCard
import { NotificationItem } from '../../components/NotificationCard';  // Import the interface

const NotificationScreen: React.FC = () => {
  const router = useRouter();

  // Placeholder: Replace with your actual data source (e.g., API call, props, or another hook)
  // Example: const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    // Mock data for testing (remove or replace with real data)
    {
      id: '1',
      type: 'success',
      title: 'Welcome!',
      content: 'You have successfully logged in.',
      description: 'Welcome message',
      timestamp: new Date(),
      isRead: false,
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Reminder',
      content: 'Don\'t forget your meeting.',
      description: 'Meeting reminder',
      timestamp: new Date(Date.now() - 3600000),  // 1 hour ago
      isRead: true,
    },
    // Add more mock items or load from API
  ]);

  const handleNotificationPress = (id: string) => {
    // Customize this: e.g., mark as read, navigate, or update state
    console.log('Pressed notification with id:', id);
    // Example: Navigate or update isRead status
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
    // router.push('/some-route');  // If using navigation
  };

  return (
    <View style={styles.container}>
      {notifications
        .filter(n => n && n.id)  // Filter out invalid items (undefined, null, or missing id)
        .map(notification => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onPress={handleNotificationPress}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',  // Optional background
  },
});

export default NotificationScreen;