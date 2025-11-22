import React from 'react';
import { router } from 'expo-router';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Dimensions for responsive badge grid
const { width } = Dimensions.get('window');

// Placeholder assets and data
// NOTE: Using a generic placeholder URL since local assets are not provided
const AVATAR_URL = 'https://placehold.co/120x120/A088C3/000?text=USER'; 
const avatarPlaceholder = { uri: AVATAR_URL }; // Replacing require('../../assets/profile_placeholder.png'); 

// --- Color Constants (Consistent Styling) ---
const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  goldMid: '#FFC72C', // Primary Yellow/Gold
  goldDark: '#DAA520',
  darkText: '#333333',
  lightText: '#FFFFFF', // Text on dark background
  goldHeaderStart: '#2C2B29', // Dark gradient start for previous background, now unused for main screen
};

// --- Type Definitions ---
interface Badge {
  id: string;
  imageUri: string;
  code: string;
  description: string;
}

interface Style {
  container: ViewStyle;
  headerBackground: ViewStyle; 
  headerContainer: ViewStyle;
  headerTitle: TextStyle;
  
  contentWrapper: ViewStyle;
  
  // Profile Card Styles
  profileCardContainer: ViewStyle;
  profileCardGradient: ViewStyle;
  userInfoContainer: ViewStyle;
  nameBlock: ViewStyle;
  nameTextPrimary: TextStyle; // 'Leo Amaala'
  nameTextSecondary: TextStyle; // 'Fernando'
  separatorLine: ViewStyle;
  positionText: TextStyle;
  editIcon: TextStyle;
  
  avatarWrapper: ViewStyle;
  avatarImage: ImageStyle;
  displayNameText: TextStyle;
  
  // Badges Section Styles
  badgesSection: ViewStyle;
  sectionTitle: TextStyle;
  badgesGrid: ViewStyle;
  badgeItem: ViewStyle;
  badgeImage: ImageStyle;
  badgeCode: TextStyle;
  badgeDescription: TextStyle;
}

// --- Hardcoded Data (as requested) ---
const USER_DATA = {
    firstName: 'Leo Amaala',
    lastName: 'Fernando',
    displayName: '@Ami',
    position: 'Club President',
    district: 'Leo District 306 D1',
};

const BADGES_DATA: Badge[] = [
  { id: '1', code: 'L258Y', description: 'COUNCIL CHAIRPERSON', imageUri: 'https://placehold.co/100x100/FFC72C/000?text=L1' },
  { id: '2', code: 'A150', description: 'DISTRICT OFFICER CREST', imageUri: 'https://placehold.co/100x100/DAA520/000?text=A2' },
  { id: '3', code: 'B6PP', description: 'PAST PRESIDENT DELUXE LAPEL TACK', imageUri: 'https://placehold.co/100x100/FFC72C/000?text=B3' },
  { id: '4', code: 'L23Y11G', description: 'PAST INTERNATIONAL DIRECTOR BADGE, MISSION TO GROW', imageUri: 'https://placehold.co/100x100/DAA520/000?text=L4' },
  { id: '5', code: 'W900', description: 'WORLDWIDE SERVICE AWARD', imageUri: 'https://placehold.co/100x100/FFC72C/000?text=W5' },
  { id: '6', code: 'I10A', description: 'INTERNATIONAL ACTIVITY AWARD', imageUri: 'https://placehold.co/100x100/DAA520/000?text=I6' },
];

const ProfileScreen = (): React.JSX.Element => {
    
    // Function to handle the navigation to the customization screen
    // The route name is now a placeholder for 'EditProfile'
    const handleEditPress = () => {
        console.log('Navigating to EditProfile screen.');
       
        // In a real application with React Navigation, this would look like:
        // navigation.navigate('EditProfile'); 
    };

    const renderBadge = (badge: Badge) => (
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

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} translucent={false} />
            
            {/* Header Area (White Background) */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => console.log('Go back pressed')}>
                    {/* Back arrow color changed to darkText */}
                    <Ionicons name="arrow-back" size={30} color={COLORS.darkText} /> 
                </TouchableOpacity>
                {/* Header Title color changed to darkText */}
                <Text style={[styles.headerTitle, { color: COLORS.darkText }]}>Profile</Text>
            </View>
            
            {/* Scrollable Content Area (White Scrollable Area) */}
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={styles.contentWrapper}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                {/* Profile Card */}
                <View style={styles.profileCardContainer}>
                    <LinearGradient
                        // Black to Gold Horizontal Gradient
                        colors={[COLORS.black, COLORS.goldDark]}
                        start={{ x: 0, y: 0.5 }} 
                        end={{ x: 1, y: 0.5 }}
                        style={styles.profileCardGradient}
                    >
                        <View style={styles.userInfoContainer}>
                            <View style={styles.nameBlock}>
                                {/* First Line Name (Bold) */}
                                <Text style={styles.nameTextPrimary}>{USER_DATA.firstName}</Text>
                                {/* Second Line Name (Lighter Weight) */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.nameTextSecondary}>{USER_DATA.lastName}</Text>
                                    {/* Edit Icon wrapped in TouchableOpacity for navigation */}
                                    <TouchableOpacity onPress={handleEditPress}> 
                                        <MaterialCommunityIcons name="pencil" size={16} color={COLORS.lightText} style={styles.editIcon} 
                                         onPress={() => router.replace('/Profile/ProfileCustermization')}/>
                                        
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Horizontal Separator Line */}
                            <View style={styles.separatorLine} />
                            
                            {/* District and Position */}
                            <Text style={styles.positionText}>{USER_DATA.district}</Text>
                            <Text style={styles.positionText}>{USER_DATA.position}</Text>
                        </View>

                        {/* Avatar */}
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

            </ScrollView>
        </View>
    );
};

// --- Styles ---
const HEADER_HEIGHT = 80;
const CARD_MARGIN_HORIZONTAL = 20;
const AVATAR_SIZE = 120;

const BADGE_ITEM_WIDTH = (width - CARD_MARGIN_HORIZONTAL * 2 - 30) / 2; // Screen width - margins - spacing / 2 items per row

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: COLORS.white, // Main screen background is white
  },
  
  // --- Header Styles (Plain White) ---
  headerBackground: {
    // This style is effectively unused now as we use headerContainer for the title bar
    // but kept for type compatibility
    zIndex: 1, 
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40, // Adjust for status bar space
    height: HEADER_HEIGHT,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white, // Ensure white background for the header area
    // Optional: Add a subtle shadow if needed to separate header
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0', 
  },

  headerTitle: {
    color: COLORS.darkText, // Dark text on white header
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 15,
  },
  
  // --- Content Wrapper (White Scrollable Area) ---
  contentWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // --- Profile Card Styles ---
  profileCardContainer: {
    paddingHorizontal: CARD_MARGIN_HORIZONTAL,
    marginTop: 20, // Space below the header
    marginBottom: 30,
  },
  profileCardGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 15,
    overflow: 'hidden', // Ensures shadow doesn't escape rounded corners
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
    fontWeight: '800', // Bold weight for the first line
    lineHeight: 28,
  },
  nameTextSecondary: {
    color: COLORS.lightText,
    fontSize: 24,
    fontWeight: '500', // Lighter weight for the second name (as requested)
    lineHeight: 28,
  },
  editIcon: {
    marginLeft: 8,
    alignSelf: 'flex-start',
    marginTop: 5, // Vertically align with the second name
  },
  
  separatorLine: {
    height: 1.5,
    width: '70%', // Width matching the visual
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
    // No border/stroke
  },
  displayNameText: {
    color: COLORS.lightText, // White text for display name below avatar
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },

  // --- Badges Section Styles (On White Background) ---
  badgesSection: {
    paddingHorizontal: CARD_MARGIN_HORIZONTAL,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.darkText, // Dark text on white background
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
} as const);

export default ProfileScreen;