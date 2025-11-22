import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  StatusBar,
  ScrollView,
  ViewStyle, 
  TextStyle,
  ImageStyle,
  Dimensions,
  Modal, 
  TextInput, 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// ====================================================================
// START ROUTER IMPLEMENTATION (For file-based routing like Expo Router)
const MOCK_ROUTER = {
    replace: (path: string) => console.log(`[ROUTER.REPLACE] Navigating to: ${path}`),
    push: (path: string) => console.log(`[ROUTER.PUSH] Navigating to: ${path}`),
};
const useRouter = () => MOCK_ROUTER;
// END ROUTER IMPLEMENTATION
// ====================================================================

// Dimensions for responsive badge grid
const { width } = Dimensions.get('window');

// Placeholder assets and data
const AVATAR_URL = 'https://placehold.co/120x120/A088C3/000?text=USER'; 
const avatarPlaceholder = { uri: AVATAR_URL };

// Flag asset (example, usually loaded from a library or local asset)
const ENGLISH_FLAG_URI = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png';

// --- Color Constants (Consistent Styling) ---
const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldMid: '#FFC72C', // Primary Yellow/Gold
  goldDark: '#DAA520',
  darkText: '#333333',
  lightText: '#FFFFFF', // Text on dark background
  greyText: '#AAAAAA',
  lightGrey: '#F5F5F5', // For input/toggle background
  borderGrey: '#E0E0E0',
  radioActive: '#000000', // Black for active radio
};

// --- Type Definitions (Updated for radio button styles) ---
interface Style {
  // ... (existing styles)
  
  // New Styles for Radio Button
  radioContainer: ViewStyle;
  radioCircle: ViewStyle;
  radioInnerCircle: ViewStyle;
  
  container: ViewStyle;
  headerBackground: ViewStyle;
  headerContainer: ViewStyle;
  headerTitle: TextStyle;
  contentWrapper: ViewStyle;
  profileCardContainer: ViewStyle;
  profileCardGradient: ViewStyle;
  userInfoContainer: ViewStyle;
  nameBlock: ViewStyle;
  nameTextPrimary: TextStyle;
  nameTextSecondary: TextStyle;
  separatorLine: ViewStyle;
  positionText: TextStyle;
  editIcon: TextStyle;
  avatarWrapper: ViewStyle;
  avatarImage: ImageStyle;
  displayNameText: TextStyle;
  badgesSection: ViewStyle;
  sectionTitle: TextStyle;
  badgesGrid: ViewStyle;
  badgeItem: ViewStyle;
  badgeImage: ImageStyle;
  badgeCode: TextStyle;
  badgeDescription: TextStyle;
  infoSection: ViewStyle;
  infoRow: ViewStyle;
  infoText: TextStyle;
  infoEditIcon: TextStyle;
  infoSeparator: ViewStyle;
  settingsSection: ViewStyle;
  settingItem: ViewStyle;
  settingText: TextStyle;
  settingDescription: TextStyle;
  settingRightContent: ViewStyle;
  languageFlag: ImageStyle;
  notificationDot: ViewStyle;
  notificationRow: ViewStyle;
  notificationText: TextStyle;
  legalSection: ViewStyle;
  legalText: TextStyle;
  logoutButton: ViewStyle;
  logoutButtonText: TextStyle;
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalTitle: TextStyle;
  modalTextInput: TextStyle;
  modalSaveButton: ViewStyle;
  modalSaveButtonText: TextStyle;
  modalCancelButton: ViewStyle;
  modalCancelButtonText: TextStyle;
}


// --- Hardcoded Data ---
const USER_DATA = {
    firstName: 'Leo Amaala',
    lastName: 'Fernando',
    displayName: '@Ami',
    position: 'Club President',
    district: 'Leo District 306 D1',
    email: 'amaalafernando@gmail.com',
    contact: '0711234567',
};

// Notification Keys for Radio Selection
type NotificationKey = 'newPosts' | 'districtAnnouncements' | 'eventReminders';

const BADGES_DATA: any[] = [
  { id: '1', code: 'L258Y', description: 'COUNCIL CHAIRPERSON', imageUri: 'https://placehold.co/100x100/FFC72C/000?text=L1' },
  { id: '2', code: 'A150', description: 'DISTRICT OFFICER CREST', imageUri: 'https://placehold.co/100x100/DAA520/000?text=A2' },
  { id: '3', code: 'B6PP', description: 'PAST PRESIDENT DELUXE LAPEL TACK', imageUri: 'https://placehold.co/100x100/FFC72C/000?text=B3' },
  { id: '4', code: 'L23Y11G', description: 'PAST INTERNATIONAL DIRECTOR BADGE, MISSION TO GROW', imageUri: 'https://placehold.co/100x100/DAA520/000?text=L4' },
  { id: '5', code: 'W900', description: 'WORLDWIDE SERVICE AWARD', imageUri: 'https://placehold.co/100x100/FFC72C/000?text=W5' },
  { id: '6', code: 'I10A', description: 'INTERNATIONAL ACTIVITY AWARD', imageUri: 'https://placehold.co/100x100/DAA520/000?text=I6' },
];

const ProfileScreen = (): React.JSX.Element => {
    
    const router = useRouter(); 

    // State for email and contact editing
    const [email, setEmail] = useState(USER_DATA.email);
    const [contact, setContact] = useState(USER_DATA.contact);
    const [showEditEmailModal, setShowEditEmailModal] = useState(false);
    const [showEditContactModal, setShowEditContactModal] = useState(false);
    const [tempEmail, setTempEmail] = useState(email);
    const [tempContact, setTempContact] = useState(contact);

    // State for Notification Radio Buttons: Only ONE option can be selected
    const [selectedNotification, setSelectedNotification] = useState<NotificationKey>('newPosts');

    const handleSelectNotification = (key: NotificationKey) => {
        setSelectedNotification(key);
        console.log("Selected notification preference:", key);
    };

    const handleEditProfilePress = () => {
        router.replace('ProfileCustermization'); 
    };

    const handleSaveEmail = () => {
        setEmail(tempEmail);
        setShowEditEmailModal(false);
        console.log("Email updated to:", tempEmail);
    };

    const handleSaveContact = () => {
        setContact(tempContact);
        setShowEditContactModal(false);
        console.log("Contact updated to:", tempContact);
    };

    const handleLogout = () => {
        console.log("User logged out!");
        // Typically, this would involve clearing user session and navigating to login
    };

    const renderBadge = (badge: any) => (
        <View style={styles.badgeItem} key={badge.id}>
            <Image 
                source={{ uri: badge.imageUri }} 
                style={styles.badgeImage} 
                resizeMode="contain"
            />
            <Text style={styles.badgeCode}>{badge.code}</Text>
            <Text style={styles.badgeDescription}>{badge.description}</Text>
        </View>
    );

    const renderEditModal = (
      isVisible: boolean, 
      title: string, 
      currentValue: string, 
      setTemp: (text: string) => void, 
      onSave: () => void, 
      onCancel: () => void
    ) => (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TextInput
              style={styles.modalTextInput}
              onChangeText={setTemp}
              value={currentValue}
              placeholder={`Enter new ${title.toLowerCase()}`}
              placeholderTextColor={COLORS.greyText}
              keyboardType={title === "Edit Contact" ? "phone-pad" : "email-address"}
            />
            {/* Save Button (Yellow background, White text) */}
            <TouchableOpacity style={styles.modalSaveButton} onPress={onSave}>
              <Text style={styles.modalSaveButtonText}>Save</Text>
            </TouchableOpacity>
            {/* Cancel Button */}
            <TouchableOpacity style={styles.modalCancelButton} onPress={onCancel}>
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );

    // Custom Component for Radio Button
    const RadioButton = ({ label, isSelected, onSelect }: { label: string, isSelected: boolean, onSelect: () => void }) => (
        <TouchableOpacity style={styles.radioContainer} onPress={onSelect}>
            <Text style={styles.notificationText}>{label}</Text>
            <View style={styles.radioCircle}>
                {isSelected && <View style={styles.radioInnerCircle} />}
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} translucent={false} />
            
            {/* Header Area (White Background) */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => console.log('Go back pressed')}>
                    <Ionicons name="arrow-back" size={30} color={COLORS.darkText} /> 
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: COLORS.darkText }]}>Profile</Text>
            </View>
            
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={styles.contentWrapper}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                {/* Profile Card */}
                <View style={styles.profileCardContainer}>
                    <LinearGradient
                        colors={[COLORS.black, COLORS.goldDark]}
                        start={{ x: 0, y: 0.5 }} 
                        end={{ x: 1, y: 0.5 }}
                        style={styles.profileCardGradient}
                    >
                        <View style={styles.userInfoContainer}>
                            <View style={styles.nameBlock}>
                                <Text style={styles.nameTextPrimary}>{USER_DATA.firstName}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.nameTextSecondary}>{USER_DATA.lastName}</Text>
                                    <TouchableOpacity onPress={handleEditProfilePress}> 
                                        <MaterialCommunityIcons name="pencil" size={16} color={COLORS.lightText} style={styles.editIcon} onPress={() => router.replace('/Profile/ProfileCustermization')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.separatorLine} />
                            
                            <Text style={styles.positionText}>{USER_DATA.district}</Text>
                            <Text style={styles.positionText}>{USER_DATA.position}</Text>
                        </View>

                        <View style={styles.avatarWrapper}>
                            <Image 
                                source={avatarPlaceholder} 
                                style={styles.avatarImage} 
                                resizeMode="cover"
                            />
                            <Text style={styles.displayNameText}>{USER_DATA.displayName}</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Badges Section */}
                <View style={styles.badgesSection}>
                    <Text style={styles.sectionTitle}>Badges</Text>
                    
                    <View style={styles.badgesGrid}>
                        {BADGES_DATA.map(renderBadge)}
                    </View>
                </View>

                {/* Email Section */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Email</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoText}>{email}</Text>
                        <TouchableOpacity onPress={() => { setTempEmail(email); setShowEditEmailModal(true); }}>
                            <MaterialCommunityIcons name="pencil" size={20} color={COLORS.darkText} style={styles.infoEditIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoSeparator} />
                </View>

                {/* Contact Section */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Contact</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoText}>{contact}</Text>
                        <TouchableOpacity onPress={() => { setTempContact(contact); setShowEditContactModal(true); }}>
                            <MaterialCommunityIcons name="pencil" size={20} color={COLORS.darkText} style={styles.infoEditIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoSeparator} />
                </View>

                {/* Settings Section */}
                <View style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>Settings Section</Text>
                    
                    {/* App Language */}
                    <TouchableOpacity style={styles.settingItem} onPress={() => console.log('App Language')}>
                        <MaterialCommunityIcons name="web" size={24} color={COLORS.darkText} />
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <Text style={styles.settingText}>App Language</Text>
                            <Text style={styles.settingDescription}>Select your preferred language for the LeoConnect app.</Text>
                        </View>
                        <View style={styles.settingRightContent}>
                            <Text style={styles.settingText}>English</Text>
                            <Image source={{ uri: ENGLISH_FLAG_URI }} style={styles.languageFlag} />
                            <Ionicons name="chevron-forward" size={22} color={COLORS.greyText} />
                        </View>
                    </TouchableOpacity>

                    {/* Notifications (Updated to use Radio Buttons) */}
                    <View style={[styles.settingItem, { borderBottomWidth: 0, alignItems: 'flex-start' }]}>
                        <Ionicons name="notifications-outline" size={24} color={COLORS.darkText} style={{ marginTop: 2 }} />
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <Text style={styles.settingText}>Notifications</Text>
                            <Text style={styles.settingDescription}>Control what updates you receive (Select One Priority)</Text>
                            <View style={{ marginTop: 10 }}>
                                <RadioButton 
                                    label="New posts and comments" 
                                    isSelected={selectedNotification === 'newPosts'} 
                                    onSelect={() => handleSelectNotification('newPosts')} 
                                />
                                <RadioButton 
                                    label="District announcements" 
                                    isSelected={selectedNotification === 'districtAnnouncements'} 
                                    onSelect={() => handleSelectNotification('districtAnnouncements')} 
                                />
                                <RadioButton 
                                    label="Event reminders" 
                                    isSelected={selectedNotification === 'eventReminders'} 
                                    onSelect={() => handleSelectNotification('eventReminders')} 
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Legal and Logout */}
                <View style={styles.legalSection}>
                    <TouchableOpacity onPress={() => console.log('Terms & Conditions')}>
                        <Text style={styles.legalText}>Terms & Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Privacy Policy')}>
                        <Text style={styles.legalText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    {/* Log Out Button */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Log Out</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Email Edit Modal */}
            {renderEditModal(
                showEditEmailModal, 
                "Edit Email", 
                tempEmail, 
                setTempEmail, 
                handleSaveEmail, 
                () => setShowEditEmailModal(false)
            )}

            {/* Contact Edit Modal */}
            {renderEditModal(
                showEditContactModal, 
                "Edit Contact", 
                tempContact, 
                setTempContact, 
                handleSaveContact, 
                () => setShowEditContactModal(false)
            )}
        </View>
    );
};

// --- Styles ---
const HEADER_HEIGHT = 80;
const CARD_MARGIN_HORIZONTAL = 20;
const AVATAR_SIZE = 120;
const BADGE_ITEM_WIDTH = (width - CARD_MARGIN_HORIZONTAL * 2 - 30) / 2; 

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  
  headerBackground: {
    zIndex: 1, 
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    height: HEADER_HEIGHT,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0', 
  },

  headerTitle: {
    color: COLORS.darkText,
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 15,
  },
  
  contentWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  profileCardContainer: {
    paddingHorizontal: CARD_MARGIN_HORIZONTAL,
    marginTop: 20,
    marginBottom: 30,
  },
  profileCardGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  userInfoContainer: {
    flex: 1,
    paddingRight: 15,
  },
  nameBlock: {
    marginBottom: 10,
  },
  nameTextPrimary: {
    color: COLORS.lightText,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 28,
  },
  nameTextSecondary: {
    color: COLORS.lightText,
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 28,
  },
  editIcon: {
    marginLeft: 8,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  
  separatorLine: {
    height: 1.5,
    width: '70%',
    backgroundColor: COLORS.lightText,
    opacity: 0.7,
    marginVertical: 10,
  },

  positionText: {
    color: COLORS.lightText,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },

  avatarWrapper: {
    alignItems: 'center',
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  displayNameText: {
    color: COLORS.lightText,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },

  badgesSection: {
    paddingHorizontal: CARD_MARGIN_HORIZONTAL,
    paddingTop: 0,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkText,
    marginBottom: 20,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: BADGE_ITEM_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0', 
    elevation: 1,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  badgeImage: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  badgeCode: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.darkText,
    textAlign: 'center',
    marginTop: 5,
  },
  badgeDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.darkText,
    textAlign: 'center',
    marginTop: 2,
  },

  infoSection: {
    paddingHorizontal: CARD_MARGIN_HORIZONTAL,
    marginBottom: 25,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: COLORS.darkText,
    fontWeight: '500',
  },
  infoEditIcon: {
    // Styling for the pencil icon next to email/contact
  },
  infoSeparator: {
    height: 1,
    backgroundColor: COLORS.borderGrey,
    marginVertical: 15,
  },

  settingsSection: {
    paddingHorizontal: CARD_MARGIN_HORIZONTAL,
    marginBottom: 25,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGrey,
  },
  settingText: {
    fontSize: 16,
    color: COLORS.darkText,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 12,
    color: COLORS.greyText,
    marginTop: 3,
  },
  settingRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  languageFlag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    marginLeft: 8,
    borderWidth: 0.5,
    borderColor: COLORS.borderGrey,
  },

  // --- Notification Radio Button Styles ---
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    width: '100%',
  },
  notificationText: {
    fontSize: 14,
    color: COLORS.darkText,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.goldDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.goldDark,
  },
  notificationRow: {
    // Kept for type compatibility but unused in radio buttons
  },
  notificationDot: {
    // Kept for type compatibility but unused in radio buttons
  },


  legalSection: {
    paddingHorizontal: CARD_MARGIN_HORIZONTAL,
    marginTop: 10,
  },
  legalText: {
    fontSize: 14,
    color: COLORS.darkText,
    fontWeight: '500',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: COLORS.goldMid,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },

  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 25,
    width: '85%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkText,
    marginBottom: 20,
  },
  modalTextInput: {
    width: '100%',
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.darkText,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.borderGrey,
  },
  modalSaveButton: {
    backgroundColor: COLORS.goldMid,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalSaveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  modalCancelButton: {
    backgroundColor: COLORS.white,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderGrey,
  },
  modalCancelButtonText: {
    color: COLORS.darkText,
    fontSize: 16,
    fontWeight: '500',
  },
} as const);

export default ProfileScreen;