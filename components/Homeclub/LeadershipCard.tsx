import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface LeadershipCardProps {
  name: string;
  position: string;
  imageUrl: string;
  gradientFrom: string; // Kept for compatibility, but overridden with yellow-black
  gradientTo: string;   // Kept for compatibility, but overridden with yellow-black
}

export default function LeadershipCard({
  name,
  position,
  imageUrl,
}: LeadershipCardProps) {
  return (
    <LinearGradient
      colors={['#FFD700', '#000000']} // Simple yellow-to-black gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.position}>{position}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: 160,
    minHeight: 200,
    marginRight: 8,
  },
  imageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  position: {
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});