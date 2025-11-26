import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CommunityCardProps {
  districtName: string;
  tagline: string;
  description: string;
  logoUrl: string;
  gradientFrom: string; // Kept for compatibility, but overridden with yellow-black
  gradientTo: string;   // Kept for compatibility, but overridden with yellow-black
}

export default function CommunityCard({
  districtName,
  tagline,
  description,
  logoUrl,
}: CommunityCardProps) {
  return (
    <LinearGradient
      colors={['#FFD700', '#000000']} // Simple yellow-to-black gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.textSection}>
          <Text style={styles.mainTitle}>Leo District</Text>
          <Text style={styles.districtName}>{districtName}</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>{tagline}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.logoSection}>
          <Image source={{ uri: logoUrl }} style={styles.logo} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textSection: {
    flex: 1,
    marginRight: 12,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  districtName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 10,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  description: {
    fontSize: 11,
    color: '#FFFFFF',
    lineHeight: 16,
  },
  logoSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});