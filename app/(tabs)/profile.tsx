import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Switch } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';

// Normalize helper function
const { width } = Dimensions.get('window');
const baseWidth = 375;
const normalize = (size: number) => {
  const scale = width / baseWidth;
  return Math.round(size * scale);
};

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  
  // User info
  const user = {
    name: 'Nguyễn Văn D',
    title: 'General Director',
    email: 'nguyenvand@fico-ytl.com',
    avatar: 'https://via.placeholder.com/100',
  };

  // Sign out handler
  const handleSignOut = () => {
    // Sign out logic
    router.replace('/auth');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.title}>{user.title}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      
      {/* Account Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Tài khoản</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Feather name="user" size={normalize(16)} color="#333" />
            <Text style={styles.settingLabel}>Thông tin cá nhân</Text>
          </View>
          <Feather name="chevron-right" size={normalize(16)} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Feather name="lock" size={normalize(16)} color="#333" />
            <Text style={styles.settingLabel}>Đổi mật khẩu</Text>
          </View>
          <Feather name="chevron-right" size={normalize(16)} color="#ccc" />
        </TouchableOpacity>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Feather name="bell" size={normalize(16)} color="#333" />
            <Text style={styles.settingLabel}>Thông báo</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#ccc", true: "#2196F3" }}
            thumbColor="#fff"
          />
        </View>
      </View>
      
      {/* App Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Ứng dụng</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Feather name="moon" size={normalize(16)} color="#333" />
            <Text style={styles.settingLabel}>Chế độ tối</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: "#ccc", true: "#2196F3" }}
            thumbColor="#fff"
          />
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Feather name="globe" size={normalize(16)} color="#333" />
            <Text style={styles.settingLabel}>Ngôn ngữ</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>Tiếng Việt</Text>
            <Feather name="chevron-right" size={normalize(16)} color="#ccc" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Feather name="help-circle" size={normalize(16)} color="#333" />
            <Text style={styles.settingLabel}>Trợ giúp & Hỗ trợ</Text>
          </View>
          <Feather name="chevron-right" size={normalize(16)} color="#ccc" />
        </TouchableOpacity>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Feather name="info" size={normalize(16)} color="#333" />
            <Text style={styles.settingLabel}>Phiên bản</Text>
          </View>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>
      </View>
      
      {/* Sign Out Button */}
      <TouchableOpacity 
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Feather name="log-out" size={normalize(16)} color="#F44336" />
        <Text style={styles.signOutText}>Đăng xuất</Text>
      </TouchableOpacity>
      
      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appInfoText}>RDM (Rebate Discount Management)</Text>
        <Text style={styles.appInfoText}>© 2025 Fico-YTL</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: normalize(20),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
    marginBottom: normalize(10),
  },
  name: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginBottom: normalize(5),
  },
  title: {
    fontSize: normalize(14),
    color: '#666',
    marginBottom: normalize(5),
  },
  email: {
    fontSize: normalize(12),
    color: '#999',
  },
  settingsSection: {
    backgroundColor: 'white',
    margin: normalize(10),
    marginBottom: normalize(5),
    borderRadius: normalize(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    padding: normalize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: normalize(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  settingLabel: {
    fontSize: normalize(14),
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(5),
  },
  settingValue: {
    fontSize: normalize(12),
    color: '#666',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(12),
    margin: normalize(10),
    backgroundColor: 'white',
    borderRadius: normalize(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  signOutText: {
    marginLeft: normalize(10),
    color: '#F44336',
    fontWeight: 'bold',
  },
  appInfo: {
    alignItems: 'center',
    padding: normalize(20),
  },
  appInfoText: {
    fontSize: normalize(12),
    color: '#999',
  },
});