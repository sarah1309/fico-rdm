import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

// Normalize helper function
const { width } = Dimensions.get('window');
const baseWidth = 375;
const normalize = (size: number) => {
  const scale = width / baseWidth;
  return Math.round(size * scale);
};

// Chart configuration
const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

// Sales Overview Chart Data
const salesData = {
  labels: ['T1', 'T2', 'T3'],
  datasets: [{
    data: [58.7, 62.3, 55.9],
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  }],
};

// NSP Analysis Data
const nspData = {
  labels: ['HCM', 'HN', 'DN', 'CT'],
  datasets: [{
    data: [1.85, 1.76, 1.92, 1.68],
  }],
};

// Free Goods Program Data
const freeGoodsData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [{
    data: [250, 320, 280, 300],
  }],
};

// Market Share Data
const marketShareData = [
  {
    name: 'Fico-YTL',
    population: 32.4,
    color: '#2196F3',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Brand A',
    population: 28.7,
    color: '#4CAF50',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Brand B',
    population: 21.5,
    color: '#FFC107',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Others',
    population: 17.4,
    color: '#FF5722',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
];

export default function ReportScreen() {
  // Report categories
  const reports = [
    {
      id: 1,
      title: 'Tổng quan doanh số',
      type: 'Sales Overview',
      icon: 'bar-chart',
      color: '#2196F3',
      description: 'Biểu đồ doanh số theo thời gian'
    },
    {
      id: 2,
      title: 'Phân tích NSP',
      type: 'Net Selling Price Analysis',
      icon: 'trending-up',
      color: '#4CAF50',
      description: 'Biểu đồ phân tích NSP theo khu vực'
    },
    {
      id: 3,
      title: 'Chương trình Free Bag',
      type: 'Free Goods Program Analysis',
      icon: 'package',
      color: '#9C27B0',
      description: 'Phân tích chương trình hàng miễn phí'
    },
    {
      id: 4,
      title: 'Phân tích thị phần',
      type: 'Market Share Analysis',
      icon: 'pie-chart',
      color: '#FF9800',
      description: 'Thông tin thị phần theo sản phẩm'
    }
  ];

  // Featured metrics
  const metrics = [
    { label: 'Tổng doanh số Q1', value: '58.7 tỷ VND', change: '+5.2%', up: true },
    { label: 'NSP trung bình', value: '1.85M VND/tấn', change: '-2.1%', up: false },
    { label: 'Thị phần khu vực HCM', value: '32.4%', change: '+1.8%', up: true }
  ];

  const renderChart = (report: any) => {
    switch (report.id) {
      case 1: // Sales Overview
        return (
          <LineChart
            data={salesData}
            width={width - normalize(40)}
            height={normalize(220)}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: normalize(8),
              borderRadius: normalize(8),
            }}
            yAxisLabel="tỷ "
            yAxisSuffix=" VND"
          />
        );

      case 2: // NSP Analysis
        return (
          <BarChart
            data={nspData}
            width={width - normalize(40)}
            height={normalize(220)}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            }}
            style={{
              marginVertical: normalize(8),
              borderRadius: normalize(8),
            }}
            yAxisLabel=""
            yAxisSuffix="M"
          />
        );

      case 3: // Free Goods Program
        return (
          <BarChart
            data={freeGoodsData}
            width={width - normalize(40)}
            height={normalize(220)}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
            }}
            style={{
              marginVertical: normalize(8),
              borderRadius: normalize(8),
            }}
            yAxisLabel=""
            yAxisSuffix=" tấn"
          />
        );

      case 4: // Market Share
        return (
          <PieChart
            data={marketShareData}
            width={width - normalize(40)}
            height={normalize(220)}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={{
              marginVertical: normalize(8),
              borderRadius: normalize(8),
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <View key={index} style={styles.metricCard}>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
            <View style={styles.metricChange}>
              <Feather 
                name={metric.up ? "trending-up" : "trending-down"} 
                size={normalize(12)} 
                color={metric.up ? "#4CAF50" : "#F44336"} 
              />
              <Text style={[
                styles.metricChangeText,
                {color: metric.up ? "#4CAF50" : "#F44336"}
              ]}>
                {metric.change}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Reports */}
      <View style={styles.reportsContainer}>
        {reports.map((report) => (
          <TouchableOpacity 
            key={report.id} 
            style={styles.reportCard}
            onPress={() => router.push(`/report/${report.id}`)}
          >
            <View style={styles.reportHeader}>
              <View style={[styles.reportIconContainer, {backgroundColor: `${report.color}20`}]}>
                <Feather name={report.icon as any} size={normalize(20)} color={report.color} />
              </View>
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportType}>{report.type}</Text>
              </View>
            </View>
            
            <View style={styles.reportPreview}>
              {renderChart(report)}
            </View>
            
            <View style={styles.reportFooter}>
              <TouchableOpacity 
                style={styles.viewDetailButton}
                onPress={() => router.push(`/report/${report.id}`)}
              >
                <Text style={styles.viewDetailText}>Xem chi tiết</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Export Data Button */}
      <TouchableOpacity style={styles.exportButton}>
        <Feather name="download" size={normalize(16)} color="#2196F3" />
        <Text style={styles.exportButtonText}>Xuất báo cáo doanh số Q1/2025</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: normalize(10),
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: normalize(8),
    padding: normalize(10),
    width: '31%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  metricLabel: {
    fontSize: normalize(10),
    color: '#666',
    marginBottom: normalize(4),
  },
  metricValue: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(4),
  },
  metricChangeText: {
    fontSize: normalize(10),
    marginLeft: normalize(2),
  },
  reportsContainer: {
    padding: normalize(10),
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: normalize(8),
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
  reportHeader: {
    flexDirection: 'row',
    padding: normalize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reportIconContainer: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(10),
  },
  reportInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  reportTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  reportType: {
    fontSize: normalize(10),
    color: '#666',
  },
  reportPreview: {
    padding: normalize(10),
  },
  reportPlaceholder: {
    height: normalize(120),
    backgroundColor: '#f9f9f9',
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportPlaceholderText: {
    fontSize: normalize(12),
    color: '#666',
    marginTop: normalize(5),
  },
  reportFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    padding: normalize(10),
    alignItems: 'flex-end',
  },
  viewDetailButton: {
    padding: normalize(5),
  },
  viewDetailText: {
    fontSize: normalize(12),
    color: '#2196F3',
    fontWeight: 'bold',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(12),
    margin: normalize(10),
    backgroundColor: 'white',
    borderRadius: normalize(8),
    borderWidth: 1,
    borderColor: '#2196F3',
    marginBottom: normalize(20),
  },
  exportButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginLeft: normalize(8),
  },
});