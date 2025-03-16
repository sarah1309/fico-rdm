import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// Normalize helper function
const { width } = Dimensions.get('window');
const baseWidth = 375;
const normalize = (size: number) => {
  const scale = width / baseWidth;
  return Math.round(size * scale);
};

export default function HomeScreen() {
  // Mock data
  const pendingApprovals = [
    { 
      id: 'PROP-250314-001', 
      name: 'Chương trình Q2-2025', 
      type: 'Regular',
      submitter: 'Nguyễn Văn A',
      date: '14/03/2025',
      urgent: false
    },
    { 
      id: 'PROP-250312-002', 
      name: 'Chiết khấu đặc biệt HCM', 
      type: 'Ad-hoc',
      submitter: 'Trần Thị B',
      date: '12/03/2025',
      urgent: true
    }
  ];
  
  const recentApprovals = [
    { 
      id: 'PROP-250308-001', 
      name: 'RTL Program Quận 2', 
      type: 'RTL Program',
      status: 'Approved',
      date: '09/03/2025'
    },
    { 
      id: 'PROP-250305-002', 
      name: 'Positive Growth Q1-2025', 
      type: 'Positive Growth',
      status: 'Rejected',
      date: '07/03/2025'
    }
  ];
  
  const dashboardItems = [
    {
      title: 'Tổng quan doanh số',
      type: 'Sales Overview',
      updated: '15/03/2025'
    },
    {
      title: 'NSP theo khu vực',
      type: 'NSP Analysis',
      updated: '14/03/2025'
    },
    {
      title: 'Tỷ lệ chiết khấu theo OD',
      type: 'Discount Rate',
      updated: '13/03/2025'
    }
  ];

  // Navigate to proposal detail
  const goToProposalDetail = (id: string) => {
    router.push({
      pathname: "/proposal/[id]",
      params: { id }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Status Cards */}
      <View style={styles.statusCardsContainer}>
        <TouchableOpacity 
          style={styles.statusCard}
          onPress={() => router.push('/(tabs)/approve')}
        >
          <View style={styles.statusCardInner}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 165, 0, 0.2)' }]}>
              <MaterialIcons name="access-time" size={normalize(18)} color="orange" />
            </View>
            <View>
              <Text style={styles.statNumber}>{pendingApprovals.length}</Text>
              <Text style={styles.statLabel}>Chờ duyệt</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.statusCard}
          onPress={() => {
            router.push('/(tabs)/approve');
            // Note: You'll need to implement the tab switching logic in the approve screen
            // by setting the activeTab state to 'approved'
          }}
        >
          <View style={styles.statusCardInner}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 200, 83, 0.2)' }]}>
              <MaterialIcons name="check-circle" size={normalize(18)} color="green" />
            </View>
            <View>
              <Text style={styles.statNumber}>28</Text>
              <Text style={styles.statLabel}>Đã duyệt</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.statusCard}
          onPress={() => router.push('/(tabs)/report')}
        >
          <View style={styles.statusCardInner}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(33, 150, 243, 0.2)' }]}>
              <MaterialIcons name="trending-up" size={normalize(18)} color="#2196F3" />
            </View>
            <View>
              <Text style={styles.statNumber}>4.8%</Text>
              <Text style={styles.statLabel}>Báo cáo</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Pending Approvals */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Đề xuất chờ phê duyệt</Text>
          <TouchableOpacity onPress={() => router.push('/approve')}>
            <Text style={styles.sectionAction}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        
        {pendingApprovals.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.approvalItem}
            onPress={() => goToProposalDetail(item.id)}
          >
            <View style={styles.approvalItemContent}>
              <View>
                <View style={styles.approvalItemTitle}>
                  <Text style={styles.approvalItemName}>{item.name}</Text>
                  {item.urgent && (
                    <View style={styles.urgentTag}>
                      <Text style={styles.urgentText}>Khẩn</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.approvalItemId}>{item.id} • {item.type}</Text>
              </View>
              <TouchableOpacity 
                style={styles.viewButton}
                onPress={() => goToProposalDetail(item.id)}
              >
                <Text style={styles.viewButtonText}>Xem</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Recent Approvals */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Phê duyệt gần đây</Text>
          <TouchableOpacity onPress={() => router.push('/approve')}>
            <Text style={styles.sectionAction}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        
        {recentApprovals.map((item, index) => (
          <View key={index} style={styles.recentItem}>
            <View style={styles.recentItemContent}>
              <View>
                <Text style={styles.recentItemName}>{item.name}</Text>
                <Text style={styles.recentItemType}>{item.type} • {item.date}</Text>
              </View>
              <View style={[
                styles.statusTag, 
                item.status === 'Approved' ? styles.approvedTag : styles.rejectedTag
              ]}>
                <Text style={[
                  styles.statusText,
                  item.status === 'Approved' ? styles.approvedText : styles.rejectedText
                ]}>
                  {item.status === 'Approved' ? 'Đồng ý' : 'Từ chối'}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Reports */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Báo cáo gần đây</Text>
          <TouchableOpacity onPress={() => router.push('/report')}>
            <Text style={styles.sectionAction}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        
        {dashboardItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.reportItem}>
            <View style={styles.reportItemContent}>
              <View>
                <Text style={styles.reportItemName}>{item.title}</Text>
                <Text style={styles.reportItemType}>{item.updated}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={normalize(16)} color="#ccc" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statusCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: normalize(10),
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: normalize(8),
    padding: normalize(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    width: '31%',
  },
  statusCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  iconContainer: {
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: normalize(12),
    color: '#666',
  },
  sectionContainer: {
    backgroundColor: 'white',
    margin: normalize(10),
    marginTop: normalize(5),
    marginBottom: normalize(5),
    borderRadius: normalize(8),
    padding: normalize(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  sectionTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  sectionAction: {
    fontSize: normalize(12),
    color: '#2196F3',
    fontWeight: 'bold',
  },
  approvalItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: normalize(8),
    padding: normalize(8),
    marginBottom: normalize(8),
  },
  approvalItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  approvalItemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(5),
  },
  approvalItemName: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  approvalItemId: {
    fontSize: normalize(10),
    color: '#666',
    marginTop: normalize(2),
  },
  urgentTag: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: normalize(4),
    paddingHorizontal: normalize(4),
    paddingVertical: normalize(2),
  },
  urgentText: {
    fontSize: normalize(10),
    color: '#F44336',
  },
  viewButton: {
    backgroundColor: '#2196F3',
    borderRadius: normalize(4),
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(4),
  },
  viewButtonText: {
    fontSize: normalize(10),
    color: 'white',
  },
  recentItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: normalize(8),
  },
  recentItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentItemName: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  recentItemType: {
    fontSize: normalize(10),
    color: '#666',
  },
  statusTag: {
    borderRadius: normalize(10),
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(2),
  },
  approvedTag: {
    backgroundColor: 'rgba(0, 200, 83, 0.2)',
  },
  rejectedTag: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  statusText: {
    fontSize: normalize(10),
  },
  approvedText: {
    color: 'green',
  },
  rejectedText: {
    color: '#F44336',
  },
  reportItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: normalize(8),
  },
  reportItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportItemName: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  reportItemType: {
    fontSize: normalize(10),
    color: '#666',
  },
});