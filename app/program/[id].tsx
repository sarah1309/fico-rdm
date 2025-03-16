import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';

// Normalize helper
const { width } = Dimensions.get('window');
const baseWidth = 375;
const normalize = (size: number) => {
  const scale = width / baseWidth;
  return Math.round(size * scale);
};

export default function ProgramDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Mock data for specific program
  const program = {
    id: id || 'PRG-000000',
    name: `Program ${id?.substring(4, 10) || 'Unknown'}`,
    type: 'Regular Program',
    status: 'Active',
    dateRange: '01/01/2025 - 31/03/2025',
    description: 'Chương trình chiết khấu thường kỳ áp dụng cho các đại lý khu vực Hồ Chí Minh.',
    target: '1,500,000,000 VND',
    discount: '3.5%',
    totalValue: '52,500,000 VND',
    odCount: 15,
    outlets: [
      { id: 'OD001', name: 'Đại lý Quận 1', address: '123 Nguyễn Huệ, Quận 1, TP.HCM' },
      { id: 'OD002', name: 'Đại lý Quận 2', address: '456 Trần Não, Quận 2, TP.HCM' },
      { id: 'OD003', name: 'Đại lý Quận 3', address: '789 Võ Văn Tần, Quận 3, TP.HCM' }
    ],
    conditions: [
      'Áp dụng cho đơn hàng tối thiểu 50 triệu VND',
      'Thời hạn thanh toán trong vòng 30 ngày',
      'Không áp dụng đồng thời với các chương trình khuyến mãi khác'
    ],
    createdBy: 'Nguyễn Văn A',
    createdDate: '15/12/2024',
    approvedBy: 'Trần Văn B',
    approvedDate: '20/12/2024'
  };

  return (
    <ScrollView style={styles.container}>
      {/* Status Badge */}
      <View style={styles.statusContainer}>
        <View style={[
          styles.statusBadge,
          program.status === 'Active' ? styles.statusActive : styles.statusInactive
        ]}>
          <Text style={[
            styles.statusText, 
            program.status === 'Active' ? styles.statusTextActive : styles.statusTextInactive
          ]}>
            {program.status === 'Active' ? 'Đang hoạt động' : 'Không hoạt động'}
          </Text>
        </View>
      </View>

      {/* Program Info Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather name="info" size={normalize(16)} color="#2196F3" />
          <Text style={styles.cardTitle}>Thông tin cơ bản</Text>
        </View>
        
        <View style={styles.infoGridDoubleCol}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Loại chương trình</Text>
            <Text style={styles.infoValue}>{program.type}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Thời gian</Text>
            <Text style={styles.infoValue}>{program.dateRange}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Số lượng OD</Text>
            <Text style={styles.infoValue}>{program.odCount} đại lý</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Chiết khấu</Text>
            <Text style={styles.infoValue}>{program.discount}</Text>
          </View>
        </View>
        
        <View style={styles.infoGridFullCol}>
          <View style={styles.infoItemFull}>
            <Text style={styles.infoLabel}>Mục tiêu</Text>
            <Text style={styles.infoValue}>{program.target}</Text>
          </View>
          
          <View style={styles.infoItemFull}>
            <Text style={styles.infoLabel}>Tổng giá trị chiết khấu</Text>
            <Text style={styles.infoValueHighlight}>{program.totalValue}</Text>
          </View>
        </View>
      </View>

      {/* Description Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather name="file-text" size={normalize(16)} color="#2196F3" />
          <Text style={styles.cardTitle}>Mô tả</Text>
        </View>
        
        <Text style={styles.description}>{program.description}</Text>
      </View>

      {/* Conditions Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather name="list" size={normalize(16)} color="#2196F3" />
          <Text style={styles.cardTitle}>Điều kiện áp dụng</Text>
        </View>
        
        {program.conditions.map((condition, index) => (
          <View key={index} style={styles.conditionItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.conditionText}>{condition}</Text>
          </View>
        ))}
      </View>

      {/* Outlets Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather name="users" size={normalize(16)} color="#2196F3" />
          <Text style={styles.cardTitle}>Danh sách đại lý ({program.outlets.length})</Text>
        </View>
        
        {program.outlets.map((outlet, index) => (
          <View key={index} style={styles.outletItem}>
            <View>
              <Text style={styles.outletName}>{outlet.name}</Text>
              <Text style={styles.outletAddress}>{outlet.address}</Text>
            </View>
            <Text style={styles.outletId}>{outlet.id}</Text>
          </View>
        ))}
        
        {program.odCount > 3 && (
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>Xem tất cả {program.odCount} đại lý</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Approval Info */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather name="check-circle" size={normalize(16)} color="#2196F3" />
          <Text style={styles.cardTitle}>Thông tin phê duyệt</Text>
        </View>
        
        <View style={styles.infoGridDoubleCol}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Người tạo</Text>
            <Text style={styles.infoValue}>{program.createdBy}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ngày tạo</Text>
            <Text style={styles.infoValue}>{program.createdDate}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Người phê duyệt</Text>
            <Text style={styles.infoValue}>{program.approvedBy}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ngày phê duyệt</Text>
            <Text style={styles.infoValue}>{program.approvedDate}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => router.push(`/program/edit/${id}`)}
        >
          <Feather name="edit-2" size={normalize(16)} color="#2196F3" />
          <Text style={styles.editButtonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.reportButton}>
          <Feather name="bar-chart-2" size={normalize(16)} color="#FF9800" />
          <Text style={styles.reportButtonText}>Báo cáo kết quả</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statusContainer: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(15),
  },
  statusBadge: {
    paddingVertical: normalize(4),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(12),
    alignSelf: 'flex-start',
  },
  statusActive: {
    backgroundColor: '#E8F5E9',
  },
  statusInactive: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: normalize(12),
  },
  statusTextActive: {
    color: '#4CAF50',
  },
  statusTextInactive: {
    color: '#F44336',
  },
  card: {
    backgroundColor: 'white',
    margin: normalize(10),
    marginBottom: normalize(5),
    borderRadius: normalize(8),
    padding: normalize(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(10),
    gap: normalize(6),
  },
  cardTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  infoGridDoubleCol: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoGridFullCol: {
    marginTop: normalize(5),
  },
  infoItem: {
    width: '50%',
    marginBottom: normalize(12),
  },
  infoItemFull: {
    width: '100%',
    marginBottom: normalize(12),
  },
  infoLabel: {
    fontSize: normalize(12),
    color: '#666',
  },
  infoValue: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  infoValueHighlight: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: '#2196F3',
  },
  description: {
    fontSize: normalize(12),
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: normalize(8),
  },
  bulletPoint: {
    width: normalize(6),
    height: normalize(6),
    borderRadius: normalize(3),
    backgroundColor: '#2196F3',
    marginTop: normalize(5),
    marginRight: normalize(8),
  },
  conditionText: {
    fontSize: normalize(12),
    flex: 1,
  },
  outletItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: normalize(8),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  outletName: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  outletAddress: {
    fontSize: normalize(10),
    color: '#666',
  },
  outletId: {
    fontSize: normalize(10),
    color: '#666',
  },
  viewMoreButton: {
    alignItems: 'center',
    marginTop: normalize(10),
  },
  viewMoreText: {
    fontSize: normalize(12),
    color: '#2196F3',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(15),
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: normalize(8),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    width: '48%',
    justifyContent: 'center',
    gap: normalize(8),
  },
  editButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF9800',
    borderRadius: normalize(8),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    width: '48%',
    justifyContent: 'center',
    gap: normalize(8),
  },
  reportButtonText: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
});