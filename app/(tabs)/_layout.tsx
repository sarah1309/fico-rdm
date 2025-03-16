import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Thay thế hàm normalize
const { width, height } = Dimensions.get('window');
const baseWidth = 375;
const normalize = (size:any) => {
  const scale = width / baseWidth;
  return Math.round(size * scale);
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  
  // Get the current active tab
  const getCurrentTab = () => {
    if (pathname === '/') return 'index';
    if (pathname.startsWith('/approve')) return 'approve';
    if (pathname.startsWith('/program')) return 'program';
    if (pathname.startsWith('/report')) return 'report';
    if (pathname.startsWith('/profile')) return 'profile';
    return 'index';
  };
  
  const activeTab = getCurrentTab();
  
  // Function to get page title based on active tab
  const getPageTitle = () => {
    switch (activeTab) {
      case 'index': return 'RDM Fico-YTL';
      case 'approve': return 'Phê duyệt đề xuất';
      case 'program': return 'Quản lý chương trình';
      case 'report': return 'Báo cáo & Thống kê';
      case 'profile': return 'Cá nhân';
      default: return 'RDM Fico-YTL';
    }
  };
  
  // Custom tab bar icons
  const getTabBarIcon = (name:any, focused:any) => {
    const color = focused ? Colors[colorScheme ?? 'light'].tint : '#666';
    const size = normalize(22);
    
    switch (name) {
      case 'index':
        return <MaterialIcons name="home" size={size} color={color} />;
      case 'approve':
        return <MaterialIcons name="description" size={size} color={color} />;
      case 'program':
        return <MaterialIcons name="inventory" size={size} color={color} />;
      case 'report':
        return <MaterialIcons name="bar-chart" size={size} color={color} />;
      case 'profile':
        return <MaterialIcons name="person" size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Custom Header */}
      <View style={activeTab === 'index' ? styles.homeHeader : styles.header}>
        <StatusBar style={activeTab === 'index' ? "light" : "dark"} />
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            {activeTab === 'index' && (
              <Image
                source={{
                  uri: "https://via.placeholder.com/40",
                }}
                style={styles.profileImage}
              />
            )}
            
            <View>
              <Text style={[
                styles.pageTitle,
                {color: activeTab === 'index' ? "#fff" : "#333"}
              ]}>
                {getPageTitle()}
              </Text>
              {activeTab === 'index' && (
                <Text style={styles.dateText}>
                  Thứ bảy, 15/03/2025
                </Text>
              )}
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {}}
          >
            <Fontisto 
              name="bell" 
              size={normalize(18)} 
              color={activeTab === 'index' ? "#fff" : "#333"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs Navigation */}
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
          tabBarStyle: {
            ...Platform.select({
              ios: {
                position: 'absolute',
                height: normalize(56),
                paddingBottom: normalize(6),
              },
              default: {
                height: normalize(56),
                paddingBottom: normalize(6),
              },
            }),
            ...styles.tabBar
          },
          tabBarLabelStyle: {
            fontSize: normalize(10),
            marginTop: normalize(-2),
          },
        })}>
        <Tabs.Screen name="index" options={{ title: "Trang chủ" }} />
        <Tabs.Screen name="approve" options={{ title: "Phê duyệt" }} />
        <Tabs.Screen name="program" options={{ title: "Chương trình" }} />
        <Tabs.Screen name="report" options={{ title: "Báo cáo" }} />
        <Tabs.Screen name="profile" options={{ title: "Cá nhân" }} />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    backgroundColor: '#2196F3',
    paddingTop: Platform.OS === 'ios' ? normalize(10) : normalize(40),
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: Platform.OS === 'ios' ? normalize(10) : normalize(40),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(12),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  profileImage: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
  },
  pageTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: normalize(12),
    color: 'rgba(255,255,255,0.8)',
  },
  iconButton: {
    padding: normalize(8),
  },
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});