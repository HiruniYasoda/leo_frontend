import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ClubCardProps {
  clubName: string;
  gradientFrom: string; // Kept for compatibility, but overridden with yellow-black
  gradientTo: string;   // Kept for compatibility, but overridden with yellow-black
}

export default function ClubCard({
  clubName,
}: ClubCardProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFD700', '#000000']} // Simple yellow-to-black gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.border}
      >
        <View style={styles.innerContent}>
          <Text style={styles.clubName}>{clubName}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    minWidth: 200,
  },
  border: {
    padding: 2,
    borderRadius: 8,
  },
  innerContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
});