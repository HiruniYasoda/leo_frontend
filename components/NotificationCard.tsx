// components/NotificationCard.tsx
import React from 'react';
import { Pressable, View, Text } from 'react-native';

export interface NotificationItem {
  id: string;
  type: 'success' | 'info' | 'badge' | 'reminder';
  title: string;
  content: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
}

// Metadata for icons/emojis
const getNotificationMetadata = (type: NotificationItem['type']) => {
  switch (type) {
    case 'success': return { emoji: '✅' };
    case 'info': return { emoji: '🔒' };
    case 'badge': return { emoji: '🏆' };
    case 'reminder': return { emoji: '🔔' };
    default: return { emoji: 'ℹ️' };
  }
};

interface NotificationCardProps {
  notification: NotificationItem | undefined;
  onPress: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onPress }) => {
  console.log('NotificationCard received notification:', notification);  // Debugging log (remove after fixing)

  // Robust check: Ensure notification is a valid object with an 'id'
  if (!notification || typeof notification !== 'object' || !notification.id) {
    console.warn("⚠️ NotificationCard received invalid or incomplete notification:", notification);
    return null;
  }

  // Safe to destructure now
  const { id, title, content, type, isRead, timestamp } = notification;
  const { emoji } = getNotificationMetadata(type);

  const ACCENT_YELLOW = '#FFC72C';
  const PRIMARY_TEXT = '#1F2937';
  const SECONDARY_TEXT = '#4B5563';

  // Time formatting
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "just now";
  };

  return (
    <Pressable
      onPress={() => onPress(id)}
      style={{
        width: "100%",
        transform: [{ scale: 1 }],
      }}
      android_ripple={{ color: "#ddd" }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 16,
          marginVertical: 12,
          marginHorizontal: "auto",
          borderWidth: 2,
          borderColor: ACCENT_YELLOW,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          maxWidth: 450,
          opacity: isRead ? 0.8 : 1,
        }}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1, minWidth: 0 }}>
            <Text style={{ fontSize: 20, marginRight: 8 }}>{emoji}</Text>

            <Text
              numberOfLines={1}
              style={{ fontSize: 16, fontWeight: "bold", color: PRIMARY_TEXT }}
            >
              {title}
            </Text>
          </View>

          {!isRead && (
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "red",
              }}
            />
          )}
        </View>

        {/* Content Preview */}
        <Text style={{ fontSize: 14, marginTop: 4, color: SECONDARY_TEXT }}>
          {content}
        </Text>

        {/* Timestamp */}
        <Text style={{ fontSize: 12, marginTop: 8, color: SECONDARY_TEXT }}>
          {formatTimeAgo(timestamp)}
        </Text>
      </View>
    </Pressable>
  );
};

export default NotificationCard;