import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

// Normalize helper
const { width } = Dimensions.get('window');
const baseWidth = 375;
const normalize = (size: number) => {
  const scale = width / baseWidth;
  return Math.round(size * scale);
};

export default function ProposalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('detail'); // detail, programs, history
  
  // Mock data for proposal detail based on id
  const proposal = {
    id: id || 'PROP-000000',
    name: `Chương trình ${id?.substring(5, 12) || 'Unknown'}`,
    type: 'Regular',
    submittedBy: 'Nguyễn Văn A',
    department: 'Sales Department',
    submittedDate: '12/03/2025 10:30 AM',
    effectiveFrom: '01/04/2025',
    effectiveTo: '30/06/2025',
    totalValue: '1,200,000,000 VND',
    description: 'Chương trình chiết khấu thường kỳ cho Quý 2/2025.',
    urgent: false,
    programs: [
      {
        id: `PRG-${id?.substring(5, 12) || '000000'}-001`,
        name: `Regular HCM Q2-2025`,
        odCount: 15,
        target: '500,000,000 VND',
        discount: '3.5%',
        value: '17,500,000 VND'
      },
      {
        id: `PRG-${id?.substring(5, 12) || '000000'}-002`,
        name: `Regular Hà Nội Q2-2025`,
        odCount: 12,
        target: '400,000,000 VND',
        discount: '3.2%',
        value: '12,800,000 VND'
      }
    ],
    attachments: [
      { name: 'Chi tiết chương trình.xlsx', size: '2.3 MB' },
      { name: 'Phân tích thị trường.pdf', size: '1.5 MB' }
    ],
    approvals: [
      {
        level: 1,
        name: 'Trần Văn D',
        position: 'Trưởng phòng Tài chính',
        status: 'Approved',
        date: '13/03/2025 09:15 AM',
        comment: 'Đã xác minh dữ liệu, đề xuất này phù hợp với ngân sách.'
      }
    ]
  };

  // Xử lý từ chối đề xuất
  const handleReject = () => {
    // Logic từ chối
    alert('Đã từ chối đề xuất');
    router.back();
  };

  // Xử lý phê duyệt đề xuất
  const handleApprove = () => {
    // Logic phê duyệt
    alert('Đã phê duyệt đề xuất');
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>Chờ phê duyệt</Text>
        </View>
        <Text style={styles.statusLevel}>Cấp phê duyệt: 2/2</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'detail' && styles.activeTab]}
          onPress={() => setActiveTab('detail')}
        >
          <Text style={[styles.tabText, activeTab === 'detail' && styles.activeTabText]}>
            Chi tiết
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'programs' && styles.activeTab]}
          onPress={() => setActiveTab('programs')}
        >
          <Text style={[styles.tabText, activeTab === 'programs' && styles.activeTabText]}>
            CT ({proposal.programs.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            Lịch sử
          </Text>
        </TouchableOpacity>
      </View>

      {/* Wrap ScrollView in a View with flex: 1 to ensure proper layout */}
      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollContainer}>
          {activeTab === 'detail' && (
            <View>
              {/* Basic Info */}
              <View style={styles.infoCard}>
                <View style={styles.cardHeader}>
                  <Feather name="info" size={normalize(16)} color="#2196F3" />
                  <Text style={styles.cardTitle}>Thông tin cơ bản</Text>
                </View>
                
                <View style={styles.infoGrid}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Loại đề xuất</Text>
                    <Text style={styles.infoValue}>{proposal.type}</Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Người gửi</Text>
                    <Text style={styles.infoValue}>{proposal.submittedBy}</Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Phòng ban</Text>
                    <Text style={styles.infoValue}>{proposal.department}</Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Ngày gửi</Text>
                    <Text style={styles.infoValue}>{proposal.submittedDate}</Text>
                  </View>
                  
                  <View style={styles.infoItemFull}>
                    <Text style={styles.infoLabel}>Thời gian hiệu lực</Text>
                    <Text style={styles.infoValue}>
                      {proposal.effectiveFrom} - {proposal.effectiveTo}
                    </Text>
                  </View>
                  
                  <View style={styles.infoItemFull}>
                    <Text style={styles.infoLabel}>Tổng giá trị</Text>
                    <Text style={styles.infoValueHighlight}>{proposal.totalValue}</Text>
                  </View>
                </View>
              </View>
              
              {/* Description */}
              <View style={styles.infoCard}>
                <View style={styles.cardHeader}>
                  <Feather name="file-text" size={normalize(16)} color="#2196F3" />
                  <Text style={styles.cardTitle}>Mô tả</Text>
                </View>
                
                <Text style={styles.description}>{proposal.description}</Text>
              </View>
              
              {/* Attachments */}
              <View style={styles.infoCard}>
                <View style={styles.cardHeader}>
                  <Feather name="paperclip" size={normalize(16)} color="#2196F3" />
                  <Text style={styles.cardTitle}>Tài liệu đính kèm</Text>
                </View>
                
                {proposal.attachments.map((file, index) => (
                  <View key={index} style={styles.attachmentItem}>
                    <View style={styles.attachmentInfo}>
                      <Feather name="file" size={normalize(16)} color="#666" />
                      <View>
                        <Text style={styles.attachmentName}>{file.name}</Text>
                        <Text style={styles.attachmentSize}>{file.size}</Text>
                      </View>
                    </View>
                    <TouchableOpacity>
                      <Feather name="download" size={normalize(16)} color="#2196F3" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          {activeTab === 'programs' && (
            <View style={styles.programsContainer}>
              {proposal.programs.map((program, index) => (
                <View key={index} style={styles.programCard}>
                  <View style={styles.programHeader}>
                    <View>
                      <Text style={styles.programName}>{program.name}</Text>
                      <Text style={styles.programId}>{program.id}</Text>
                    </View>
                    <View style={styles.odCountBadge}>
                      <Text style={styles.odCountText}>{program.odCount} OD</Text>
                    </View>
                  </View>
                  
                  <View style={styles.programDetails}>
                    <View style={styles.programDetailItem}>
                      <Text style={styles.programDetailLabel}>Mục tiêu</Text>
                      <Text style={styles.programDetailValue}>{program.target}</Text>
                    </View>
                    
                    <View style={styles.programDetailItem}>
                      <Text style={styles.programDetailLabel}>Chiết khấu</Text>
                      <Text style={styles.programDetailValue}>{program.discount}</Text>
                    </View>
                    
                    <View style={styles.programDetailItem}>
                      <Text style={styles.programDetailLabel}>Giá trị</Text>
                      <Text style={styles.programDetailValue}>{program.value}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
          
          {activeTab === 'history' && (
            <View style={styles.historyContainer}>
              <View style={styles.historyItem}>
                <View style={styles.historyDot} />
                <View style={styles.historyLine} />
                
                <View style={styles.historyContent}>
                  <View style={styles.historyHeader}>
                    <View>
                      <Text style={styles.historyName}>{proposal.approvals[0].name}</Text>
                      <Text style={styles.historyPosition}>{proposal.approvals[0].position}</Text>
                    </View>
                    <View style={styles.approvedBadge}>
                      <Feather name="check" size={normalize(10)} color="#4CAF50" />
                      <Text style={styles.approvedText}>Đã phê duyệt</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.historyDate}>{proposal.approvals[0].date}</Text>
                  
                  <View style={styles.commentBox}>
                    <Text style={styles.commentText}>{proposal.approvals[0].comment}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.historyItem}>
                <View style={[styles.historyDot, {backgroundColor: '#FF9800'}]} />
                
                <View style={styles.historyContent}>
                  <View style={styles.historyHeader}>
                    <View>
                      <Text style={styles.historyName}>Đang chờ phê duyệt</Text>
                      <Text style={styles.historyPosition}>GD - Ban giám đốc</Text>
                    </View>
                    <View style={styles.pendingBadge}>
                      <Feather name="clock" size={normalize(10)} color="#FF9800" />
                      <Text style={styles.pendingText}>Chờ duyệt</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Action Buttons - Now outside ScrollView but inside contentContainer */}
        <View style={styles.actionBar}>
          <TouchableOpacity 
            style={styles.rejectButton}
            onPress={handleReject}
          >
            <Feather name="x" size={normalize(16)} color="#F44336" />
            <Text style={styles.rejectButtonText}>Từ chối</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.approveButton}
            onPress={handleApprove}
          >
            <Feather name="check" size={normalize(16)} color="#fff" />
            <Text style={styles.approveButtonText}>Phê duyệt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1, // This ensures the content takes remaining space
    display: 'flex',
    flexDirection: 'column',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: normalize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statusBadge: {
    backgroundColor: '#FFF8E1',
    paddingVertical: normalize(4),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(12),
  },
  statusBadgeText: {
    fontSize: normalize(12),
    color: '#FF9800',
  },
  statusLevel: {
    fontSize: normalize(12),
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(15),
    alignItems: 'center',
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
  scrollContainer: {
    flex: 1, // This allows the scroll view to take remaining space above the action bar
  },
  infoCard: {
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
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  attachmentItem: {
    backgroundColor: '#f9f9f9',
    padding: normalize(10),
    borderRadius: normalize(6),
    marginBottom: normalize(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attachmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  attachmentName: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  attachmentSize: {
    fontSize: normalize(10),
    color: '#666',
  },
  programsContainer: {
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
    marginBottom: normalize(10),
  },
  programName: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  programId: {
    fontSize: normalize(10),
    color: '#666',
  },
  odCountBadge: {
    backgroundColor: '#E3F2FD',
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(8),
    borderRadius: normalize(12),
  },
  odCountText: {
    fontSize: normalize(10),
    color: '#2196F3',
  },
  programDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  programDetailItem: {
    flex: 1,
  },
  programDetailLabel: {
    fontSize: normalize(10),
    color: '#666',
  },
  programDetailValue: {
    fontSize: normalize(11),
    fontWeight: 'bold',
  },
  historyContainer: {
    padding: normalize(12),
  },
  historyItem: {
    flexDirection: 'row',
    marginBottom: normalize(15),
  },
  historyDot: {
    width: normalize(10),
    height: normalize(10),
    borderRadius: normalize(5),
    backgroundColor: '#4CAF50',
    marginTop: normalize(5),
    marginRight: normalize(10),
  },
  historyLine: {
    position: 'absolute',
    left: normalize(5),
    top: normalize(15),
    width: normalize(1),
    height: normalize(60),
    backgroundColor: '#ddd',
  },
  historyContent: {
    flex: 1,
    backgroundColor: 'white',
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
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: normalize(5),
  },
  historyName: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  historyPosition: {
    fontSize: normalize(10),
    color: '#666',
  },
  approvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(8),
    borderRadius: normalize(12),
    gap: normalize(4),
  },
  approvedText: {
    fontSize: normalize(10),
    color: '#4CAF50',
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingVertical: normalize(2),
    paddingHorizontal: normalize(8),
    borderRadius: normalize(12),
    gap: normalize(4),
  },
  pendingText: {
    fontSize: normalize(10),
    color: '#FF9800',
  },
  historyDate: {
    fontSize: normalize(10),
    color: '#666',
    marginBottom: normalize(8),
  },
  commentBox: {
    backgroundColor: '#f9f9f9',
    padding: normalize(8),
    borderRadius: normalize(6),
  },
  commentText: {
    fontSize: normalize(11),
  },
  actionBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: normalize(10),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    // Remove any position: absolute if it exists
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(10),
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: normalize(6),
    marginRight: normalize(5),
    gap: normalize(6),
  },
  rejectButtonText: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  approveButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(10),
    backgroundColor: '#4CAF50',
    borderRadius: normalize(6),
    marginLeft: normalize(5),
    gap: normalize(6),
  },
  approveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});