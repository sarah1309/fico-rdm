import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';

// Normalize helper function
const { width } = Dimensions.get('window');
const baseWidth = 375;
const normalize = (size: number) => {
  const scale = width / baseWidth;
  return Math.round(size * scale);
};

export default function ApproveScreen() {
  const [activeTab, setActiveTab] = useState('pending'); // pending, approved, rejected
  
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
    },
    { 
      id: 'PROP-250310-003', 
      name: 'Free Bag Q2-2025', 
      type: 'Free Goods',
      submitter: 'Phạm Văn C',
      date: '10/03/2025',
      urgent: false
    }
  ];

  // Navigate to proposal detail
  const goToProposalDetail = (id: string) => {
    router.push(`/proposal/${id}`);
  };

  return (
    <View style={styles.container}>
      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={normalize(16)} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm theo ID hoặc tên đề xuất"
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="filter" size={normalize(14)} color="#333" />
            <Text style={styles.filterButtonText}>Bộ lọc</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="calendar" size={normalize(14)} color="#333" />
            <Text style={styles.filterButtonText}>Ngày</Text>
            <Feather name="chevron-down" size={normalize(14)} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'pending' && styles.activeTabText
          ]}>
            Chờ duyệt ({pendingApprovals.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'approved' && styles.activeTab]}
          onPress={() => setActiveTab('approved')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'approved' && styles.activeTabText
          ]}>
            Đã duyệt
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'rejected' && styles.activeTab]}
          onPress={() => setActiveTab('rejected')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'rejected' && styles.activeTabText
          ]}>
            Từ chối
          </Text>
        </TouchableOpacity>
      </View>

      {/* Proposal List */}
      <ScrollView style={styles.listContainer}>
        <View style={styles.proposalsContainer}>
          {pendingApprovals.map((item, index) => (
            <View key={index} style={styles.proposalCard}>
              <View style={styles.proposalHeader}>
                <View>
                  <Text style={styles.proposalName}>{item.name}</Text>
                  <Text style={styles.proposalId}>{item.id}</Text>
                </View>
                {item.urgent && (
                  <View style={styles.urgentTag}>
                    <Text style={styles.urgentText}>Khẩn</Text>
                  </View>
                )}
              </View>
              
              {/* Details Grid */}
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Loại đề xuất</Text>
                  <Text style={styles.detailValue}>{item.type}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Người gửi</Text>
                  <Text style={styles.detailValue}>{item.submitter}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Ngày gửi</Text>
                  <Text style={styles.detailValue}>{item.date}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Trạng thái</Text>
                  <Text style={styles.statusPending}>Chờ duyệt</Text>
                </View>
              </View>
              
              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.rejectButton}>
                  <Text style={styles.rejectButtonText}>Từ chối</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.viewButton}
                  onPress={() => goToProposalDetail(item.id)}
                >
                  <Text style={styles.viewButtonText}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: '#fff',
    padding: normalize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: normalize(6),
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    marginLeft: normalize(10),
    marginRight: normalize(5),
  },
  searchInput: {
    flex: 1,
    height: normalize(36),
    fontSize: normalize(12),
    color: '#333',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: normalize(10),
    gap: normalize(10),
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(5),
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
    borderRadius: normalize(6),
  },
  filterButtonText: {
    fontSize: normalize(12),
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    fontSize: normalize(12),
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  proposalsContainer: {
    padding: normalize(10),
  },
  proposalCard: {
    backgroundColor: '#fff',
    borderRadius: normalize(8),
    padding: normalize(12),
    marginBottom: normalize(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  proposalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  proposalName: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  proposalId: {
    fontSize: normalize(10),
    color: '#666',
    marginTop: normalize(2),
  },
  urgentTag: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(2),
  },
  urgentText: {
    fontSize: normalize(10),
    color: '#F44336',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: normalize(10),
  },
  detailItem: {
    width: '50%',
    marginBottom: normalize(8),
  },
  detailLabel: {
    fontSize: normalize(10),
    color: '#666',
  },
  detailValue: {
    fontSize: normalize(11),
    fontWeight: 'bold',
  },
  statusPending: {
    fontSize: normalize(11),
    fontWeight: 'bold',
    color: '#FF9800',
  },
  actionButtons: {
    marginTop: normalize(8),
    paddingTop: normalize(8),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: normalize(10),
  },
  rejectButton: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: normalize(6),
  },
  rejectButtonText: {
    fontSize: normalize(11),
    color: '#666',
  },
  viewButton: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    backgroundColor: '#2196F3',
    borderRadius: normalize(6),
  },
  viewButtonText: {
    fontSize: normalize(11),
    color: 'white',
  },
});