import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';

// Normalize helper
const { width } = Dimensions.get('window');
const baseWidth = 375;
const normalize = (size: number) => {
  const scale = width / baseWidth;
  return Math.round(size * scale);
};

export default function ProgramTypeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Program type mapping
  const programTypes = {
    '1': {
      name: 'Regular Program',
      description: 'Chương trình chiết khấu thường kỳ',
      color: '#2196F3',
      icon: 'repeat'
    },
    '2': {
      name: 'Ad-hoc Program',
      description: 'Chương trình chiết khấu đặc biệt',
      color: '#FF9800',
      icon: 'stars'
    },
    '3': {
      name: 'Free Goods Program',
      description: 'Chương trình hàng miễn phí',
      color: '#9C27B0',
      icon: 'card-giftcard'
    },
    '4': {
      name: 'RTL Program',
      description: 'Chương trình xi măng bao bán lẻ',
      color: '#4CAF50',
      icon: 'store'
    }
  };
  
  // Get current program type
  const currentType = programTypes[id as keyof typeof programTypes] || {
    name: 'Unknown Program',
    description: 'Program type not found',
    color: '#666',
    icon: 'help-outline'
  };
  
  // Mock data for programs of this type
  const programs = [
    {
      id: `PRG-250101-${id}1`,
      name: `${currentType.name} Q1-2025`,
      dateRange: '01/01/2025 - 31/03/2025',
      odCount: 15,
      status: 'Active',
      value: '52,500,000 VND'
    },
    {
      id: `PRG-250102-${id}2`,
      name: `${currentType.name} Q4-2024`,
      dateRange: '01/10/2024 - 31/12/2024',
      odCount: 12,
      status: 'Inactive',
      value: '48,600,000 VND'
    },
    {
      id: `PRG-250103-${id}3`,
      name: `${currentType.name} Q3-2024`,
      dateRange: '01/07/2024 - 30/09/2024',
      odCount: 10,
      status: 'Inactive',
      value: '42,000,000 VND'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <View style={[styles.banner, { backgroundColor: `${currentType.color}20` }]}>
        <MaterialIcons name={currentType.icon as any} size={normalize(28)} color={currentType.color} />
        <View>
          <Text style={styles.bannerTitle}>{currentType.name}</Text>
          <Text style={styles.bannerDescription}>{currentType.description}</Text>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={normalize(16)} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm chương trình"
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterLabel}>Trạng thái</Text>
            <Text style={styles.filterValue}>Tất cả</Text>
            <Feather name="chevron-down" size={normalize(14)} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterLabel}>Sắp xếp</Text>
            <Text style={styles.filterValue}>Mới nhất</Text>
            <Feather name="chevron-down" size={normalize(14)} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Program List */}
      <ScrollView>
        <View style={styles.programListHeader}>
          <Text style={styles.programCountText}>Tìm thấy {programs.length} chương trình</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => router.push('/program/create')}
          >
            <Feather name="plus" size={normalize(14)} color="#2196F3" />
            <Text style={styles.createButtonText}>Tạo mới</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.programList}>
          {programs.map((program, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.programCard}
              onPress={() => router.push(`/program/${program.id}`)}
            >
              <View style={styles.programHeader}>
                <View>
                  <Text style={styles.programName}>{program.name}</Text>
                  <Text style={styles.programId}>{program.id}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  program.status === 'Active' ? styles.statusActive : styles.statusInactive
                ]}>
                  <Text style={[
                    styles.statusText,
                    program.status === 'Active' ? styles.statusTextActive : styles.statusTextInactive
                  ]}>
                    {program.status === 'Active' ? 'Hoạt động' : 'Kết thúc'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.programInfo}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Thời gian</Text>
                  <Text style={styles.infoValue}>{program.dateRange}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Số đại lý</Text>
                  <Text style={styles.infoValue}>{program.odCount} OD</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Giá trị</Text>
                  <Text style={styles.infoValue}>{program.value}</Text>
                </View>
              </View>
              
              <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Xem chi tiết</Text>
                  <Feather name="arrow-right" size={normalize(14)} color="#2196F3" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
  banner: {
    flexDirection: 'row',
    padding: normalize(15),
    alignItems: 'center',
    gap: normalize(12),
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  bannerTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  bannerDescription: {
    fontSize: normalize(12),
    color: '#666',
  },
  searchContainer: {
    padding: normalize(10),
    backgroundColor: 'white',
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
    justifyContent: 'space-between',
    marginTop: normalize(10),
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: normalize(6),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(6),
    width: '48%',
    justifyContent: 'center',
    gap: normalize(5),
  },
  filterLabel: {
    fontSize: normalize(12),
    color: '#666',
  },
  filterValue: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  programListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(10),
  },
  programCountText: {
    fontSize: normalize(12),
    color: '#666',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(5),
  },
  createButtonText: {
    fontSize: normalize(12),
    color: '#2196F3',
    fontWeight: 'bold',
  },
  programList: {
    padding: normalize(10),
  },
  programCard: {
    backgroundColor: 'white',
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
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: normalize(10),
  },
  programName: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  programId: {
    fontSize: normalize(12),
    color: '#666',
  },
  statusBadge: {
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(8),
    borderRadius: normalize(12),
  },
  statusActive: {
    backgroundColor: '#E8F5E9',
  },
  statusInactive: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: normalize(10),
  },
  statusTextActive: {
    color: '#4CAF50',
  },
  statusTextInactive: {
    color: '#F44336',
  },
  programInfo: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: normalize(10),
    marginBottom: normalize(10),
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: normalize(10),
    color: '#666',
  },
  infoValue: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(5),
  },
  detailsButtonText: {
    fontSize: normalize(12),
    color: '#2196F3',
    fontWeight: 'bold',
  },
});