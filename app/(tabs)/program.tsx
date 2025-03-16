import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

// Normalize helper function
const { width } = Dimensions.get('window');
const baseWidth = 375;
const normalize = (size: number) => {
  const scale = width / baseWidth;
  return Math.round(size * scale);
};

export default function ProgramScreen() {
  // Program types
  const programTypes = [
    {
      id: 1,
      name: 'Regular Program',
      description: 'Chương trình chiết khấu thường kỳ',
      color: '#2196F3',
      icon: 'repeat'
    },
    {
      id: 2,
      name: 'Ad-hoc Program',
      description: 'Chương trình chiết khấu đặc biệt',
      color: '#FF9800',
      icon: 'stars'
    },
    {
      id: 3,
      name: 'Free Goods Program',
      description: 'Chương trình hàng miễn phí',
      color: '#9C27B0',
      icon: 'card-giftcard'
    },
    {
      id: 4,
      name: 'RTL Program',
      description: 'Chương trình xi măng bao bán lẻ',
      color: '#4CAF50',
      icon: 'store'
    }
  ];

  // Active programs
  const activePrograms = [
    {
      id: 'PRG-250101-001',
      name: 'Regular Q1-2025',
      dateRange: '01/01/2025 - 31/03/2025',
      odCount: 15
    },
    {
      id: 'PRG-250102-002',
      name: 'RTL Program HCM',
      dateRange: '01/01/2025 - 31/03/2025',
      odCount: 12
    },
    {
      id: 'PRG-250205-003',
      name: 'Free Bag Q1-2025',
      dateRange: '01/02/2025 - 31/03/2025',
      odCount: 8
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Program Types */}
      <View style={styles.typesContainer}>
        {programTypes.map((type) => (
          <TouchableOpacity 
            key={type.id} 
            style={[styles.typeCard, {borderLeftColor: type.color}]}
            onPress={() => router.push(`/program/type/${type.id}`)}
          >
            <Text style={styles.typeName}>{type.name}</Text>
            <Text style={styles.typeDescription}>{type.description}</Text>
            <View style={styles.typeAction}>
              <Text style={[styles.typeActionText, {color: type.color}]}>Xem danh sách</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Active Programs */}
      <View style={styles.activeProgramsContainer}>
        <Text style={styles.sectionTitle}>Chương trình đang hoạt động</Text>
        
        {activePrograms.map((program, index) => (
          <TouchableOpacity 
            key={program.id} 
            style={styles.programItem}
            onPress={() => router.push(`/program/${program.id}`)}
          >
            <View style={styles.programInfo}>
              <View>
                <Text style={styles.programName}>{program.name}</Text>
                <Text style={styles.programDate}>{program.dateRange}</Text>
              </View>
              <View style={styles.activeTag}>
                <Text style={styles.activeTagText}>Hoạt động</Text>
              </View>
            </View>
            <View style={styles.programFooter}>
              <Text style={styles.odCount}>{program.odCount} OD</Text>
              <Text style={styles.detailLink}>Chi tiết</Text>
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
  typesContainer: {
    padding: normalize(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  typeCard: {
    backgroundColor: 'white',
    borderRadius: normalize(8),
    padding: normalize(10),
    marginBottom: normalize(10),
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    width: '48%',
  },
  typeName: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  typeDescription: {
    fontSize: normalize(10),
    color: '#666',
    marginTop: normalize(2),
    marginBottom: normalize(6),
  },
  typeAction: {
    alignItems: 'flex-end',
    marginTop: normalize(5),
  },
  typeActionText: {
    fontSize: normalize(10),
    fontWeight: 'bold',
  },
  activeProgramsContainer: {
    backgroundColor: 'white',
    margin: normalize(10),
    marginTop: normalize(5),
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
  sectionTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    marginBottom: normalize(10),
  },
  programItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: normalize(8),
  },
  programInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  programName: {
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  programDate: {
    fontSize: normalize(10),
    color: '#666',
  },
  activeTag: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(2),
    borderRadius: normalize(10),
  },
  activeTagText: {
    fontSize: normalize(10),
    color: '#4CAF50',
  },
  programFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(5),
  },
  odCount: {
    fontSize: normalize(10),
    color: '#666',
  },
  detailLink: {
    fontSize: normalize(10),
    color: '#2196F3',
  }
});