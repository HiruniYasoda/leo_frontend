import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  StatusBar,
  TextInput,
  Modal, 
  ViewStyle, 
  TextStyle,
  ImageStyle,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; 

// Asset Imports
const profilePlaceholder = require('../../assets/profile_placeholder.png'); 

// --- Color Constants ---
const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldMid: '#FFC72C', // Primary Yellow/Gold
  goldDark: '#DAA520',
  darkOverlay: 'rgba(0, 0, 0, 0.7)', 
  inputBackground: '#F0F0F0',
  inputBorder: '#DDDDDD',
  darkText: '#333333',
  lightText: '#EEEEEE',
  labelDark: '#555555',
  greyText: '#AAAAAA',
};

// --- Type Definitions ---
interface Style {
  container: ViewStyle;
  headerContainer: ViewStyle;
  headerTitle: TextStyle;
  
  whiteCard: ViewStyle;
  
  profileSection: ViewStyle;
  avatarContainer: ViewStyle;
  avatarImage: ImageStyle;
  editIconContainer: ViewStyle;
  
  formContent: ViewStyle;
  inputGroup: ViewStyle;
  label: TextStyle;
  textInput: TextStyle;
  pickerContainer: ViewStyle;
  picker: ViewStyle;
  
  buttonContainer: ViewStyle;
  saveButton: ViewStyle;
  saveButtonText: TextStyle;
  clearButton: ViewStyle;
  clearButtonText: TextStyle;
  
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalOption: ViewStyle;
  modalOptionText: TextStyle;
  modalDeleteText: TextStyle;
}

const CustomizeProfileScreen = (): React.JSX.Element => {
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [fullName, setFullName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleSave = () => {
    console.log('Profile Saved:', { fullName, displayName, selectedClub, selectedDistrict });
  };

  const handleClear = () => {
    setFullName('');
    setDisplayName('');
    setSelectedClub('');
    setSelectedDistrict('');
  };

  const handleEditPhoto = () => {
    setShowPhotoOptions(true);
  };

  const handleModalAction = (action: 'take' | 'upload' | 'delete') => {
    console.log(`Action selected: ${action}`);
    setShowPhotoOptions(false);
  };

  const renderPhotoOptions = () => (
    <Modal
      transparent={true}
      visible={showPhotoOptions}
      onRequestClose={() => setShowPhotoOptions(false)}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalOption} onPress={() => handleModalAction('take')}>
            <MaterialCommunityIcons name="camera" size={24} color={COLORS.darkText} />
            <Text style={styles.modalOptionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={() => handleModalAction('upload')}>
            <MaterialCommunityIcons name="upload" size={24} color={COLORS.darkText} />
            <Text style={styles.modalOptionText}>Upload From Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalOption, { borderBottomWidth: 0 }]} onPress={() => handleModalAction('delete')}>
            <MaterialCommunityIcons name="trash-can-outline" size={24} color="red" />
            <Text style={styles.modalDeleteText}>Delete Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <LinearGradient
      colors={[COLORS.black, '#2C2B29', COLORS.goldMid]} 
      // Adjusted locations for a smoother, higher gold transition
      locations={[0.0, 0.35, 0.6]} 
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => console.log('Go back pressed')}>
          <Ionicons name="arrow-back" size={30} color={COLORS.lightText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customize Your Profile</Text>
      </View>

      {/* White Card Container (Stretches from top position to bottom) */}
      <View style={styles.whiteCard}>
        
        {/* Form Fields */}
        <View style={styles.formContent}>
          
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setFullName}
              value={fullName}
              placeholder="e.g., Amaala Fernando"
              placeholderTextColor={COLORS.greyText}
            />
          </View>

          {/* Display Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setDisplayName}
              value={displayName}
              placeholder="e.g., Ami"
              placeholderTextColor={COLORS.greyText}
            />
          </View>

          {/* Home Club Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Home Club</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedClub}
                onValueChange={(itemValue) => setSelectedClub(itemValue)}
                // FINAL FIX: Cast the style to 'any' to bypass strict type checking issues 
                // stemming from the library's type definitions conflicting with ViewStyle.
                style={styles.picker as any} 
                itemStyle={Platform.OS === 'ios' ? { height: 50, fontSize: 16 } : {}} 
              >
                <Picker.Item label="Select your club" value="" color={COLORS.greyText} />
                <Picker.Item label="Leo Club of Colombo" value="colombo" />
                <Picker.Item label="Leo Club of Kandy" value="kandy" />
              </Picker>
            </View>
          </View>

          {/* District Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>District</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedDistrict}
                onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
                // FINAL FIX: Cast the style to 'any' here as well.
                style={styles.picker as any} 
                itemStyle={Platform.OS === 'ios' ? { height: 50, fontSize: 16 } : {}} 
              >
                <Picker.Item label="Select your district" value="" color={COLORS.greyText} />
                <Picker.Item label="306 A2" value="A2" />
                <Picker.Item label="306 B1" value="B1" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Buttons (Moved higher) */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save & Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClear}
            activeOpacity={0.8}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Section - Positioned absolutely to overlap the card */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image 
            source={profilePlaceholder} 
            style={styles.avatarImage} 
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.editIconContainer} 
            onPress={handleEditPhoto}
          >
            <MaterialCommunityIcons name="pencil" size={18} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Photo Options Modal */}
      {renderPhotoOptions()}
    </LinearGradient>
  );
};

// --- Styles ---
const AVATAR_SIZE = 120;
const CARD_TOP_PADDING = AVATAR_SIZE / 2 + 30; // Vertical padding inside the card for avatar overlap

// ADJUSTED VALUES:
const CARD_TOP_POSITION = 280; // Adjusted lower to reveal more of the upper gradient/gold section
const BUTTON_PADDING_BOTTOM = 20; // Reduced padding for higher button placement

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  
  // --- Header Styles ---
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: COLORS.lightText,
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 15,
  },

  // --- White Card Styles ---
  whiteCard: {
    position: 'absolute',
    top: CARD_TOP_POSITION, // Card starts lower
    left: 0,
    right: 0,
    bottom: 0, // Stretches to the bottom edge of the screen
    
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    zIndex: 5,
  },
  
  // --- Profile Section Styles ---
  profileSection: {
    position: 'absolute',
    // Positioned relative to the card's new top edge
    top: CARD_TOP_POSITION - (AVATAR_SIZE / 2), 
    right: 50,
    zIndex: 10,
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: COLORS.white,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: AVATAR_SIZE / 2,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.goldMid,
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.black,
    elevation: 3,
  },

  // --- Form Styles ---
  formContent: {
    paddingTop: CARD_TOP_PADDING, 
    flex: 1, // Allows the form fields to push the button section down
    // No more fixed height necessary, flex handles spacing
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.labelDark,
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: COLORS.darkText,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  // --- Picker/Dropdown Styles ---
  pickerContainer: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: '100%',
  },

  // --- Button Styles (Adjusted to be higher) ---
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5, 
    paddingBottom: BUTTON_PADDING_BOTTOM + (Platform.OS === 'ios' ? 10 : 0), // Base padding + safe area adjustment
  },
  saveButton: {
    flex: 2,
    backgroundColor: COLORS.goldMid,
    paddingVertical: 15,
    borderRadius: 50,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  saveButtonText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '700',
  },
  clearButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    borderRadius: 50,
    marginLeft: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.goldMid,
  },
  clearButtonText: {
    color: COLORS.goldMid,
    fontSize: 18,
    fontWeight: '700',
  },

  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.darkOverlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
  },
  modalOptionText: {
    fontSize: 18,
    color: COLORS.darkText,
    marginLeft: 15,
  },
  modalDeleteText: {
    fontSize: 18,
    color: 'red',
    marginLeft: 15,
  },
} as const);

export default CustomizeProfileScreen;