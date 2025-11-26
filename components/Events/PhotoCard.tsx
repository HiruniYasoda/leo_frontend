import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Download, X } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface PhotoCardProps {
  id: string;
  imageUrl: string;
  userName: string;
  userAvatar: string;
  visible: boolean;
  onClose: () => void;
}

const COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  goldAccent: '#FFC80A',
  greyText: '#A0A0A0',
};

export default function PhotoCard({
  imageUrl,
  userName,
  userAvatar,
  visible,
  onClose,
}: PhotoCardProps) {
  const handleDownload = () => {
    console.log('Download photo:', imageUrl);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X color={COLORS.black} size={24} />
            </TouchableOpacity>

            <Image source={{ uri: imageUrl }} style={styles.mainImage} />

            <View style={styles.userInfo}>
              <Image
                source={{
                  uri:
                    userAvatar ||
                    'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
                }}
                style={styles.avatar}
              />
              <Text style={styles.userName}>{userName}</Text>
            </View>

            <TouchableOpacity
              style={styles.downloadButton}
              onPress={handleDownload}
            >
              <Download color={COLORS.white} size={20} />
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },

  modalContent: {
    width: width * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },

  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 4,
  },

  mainImage: {
    width: '100%',
    height: width * 0.9, // square image
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover',
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },

  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },

  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.goldAccent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
  },

  downloadText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
