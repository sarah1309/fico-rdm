import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

// Normalize helper
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
  propsForDots: {
    r: "5",
    strokeWidth: "2",
  }
};

export default function ReportDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [timeframe, setTimeframe] = useState('quarter'); // quarter, month, year
  const [compareMode, setCompareMode] = useState(false);
  
  // Get the specific report data based on ID
  const reports = {
    '1': {
      title: 'Tổng quan doanh số',
      type: 'Sales Overview',
      icon: 'bar-chart',
      color: '#2196F3',
      description: 'Biểu đồ thể hiện tổng doanh số theo thời gian, cho phép so sánh với mục tiêu đã đặt ra và các kỳ trước đó.',
      data: {
        quarter: {
          labels: ['T1', 'T2', 'T3'],
          datasets: [
            {
              data: [58.7, 62.3, 55.9],
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              strokeWidth: 2
            },
            compareMode ? {
              data: [52.1, 58.4, 53.2],
              color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
              strokeWidth: 2,
              strokeDashArray: [5, 5]
            } : undefined
          ].filter(Boolean),
          legend: compareMode ? ['2025', '2024'] : ['2025']
        },
        month: {
          labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
          datasets: [
            {
              data: [18.3, 20.2, 20.2, 21.5, 19.8, 21.0, 22.5, 21.8, 22.7, 23.1, 24.2, 25.0],
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              strokeWidth: 2
            },
            compareMode ? {
              data: [17.1, 18.4, 16.6, 19.2, 18.5, 19.3, 20.6, 19.8, 20.7, 21.1, 22.2, 23.0],
              color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
              strokeWidth: 2,
              strokeDashArray: [5, 5]
            } : undefined
          ].filter(Boolean),
          legend: compareMode ? ['2025', '2024'] : ['2025']
        }
      },
      metrics: [
        { label: 'Tổng doanh số Q1', value: '58.7 tỷ VND', change: '+5.2%', up: true },
        { label: 'Trung bình tháng', value: '19.6 tỷ VND', change: '+3.8%', up: true },
        { label: 'Dự báo Q2', value: '62.4 tỷ VND', change: '+0.1%', up: true }
      ]
    },
    '2': {
      title: 'Phân tích NSP',
      type: 'Net Selling Price Analysis',
      icon: 'trending-up',
      color: '#4CAF50',
      description: 'Phân tích giá bán thực tế (Net Selling Price) theo khu vực địa lý và theo thời gian để đánh giá hiệu quả của chính sách giá.',
      data: {
        quarter: {
          labels: ['HCM', 'HN', 'DN', 'CT'],
          datasets: [
            {
              data: [1.85, 1.76, 1.92, 1.68],
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            },
            compareMode ? {
              data: [1.81, 1.72, 1.88, 1.65],
              color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
            } : undefined
          ].filter(Boolean),
          legend: compareMode ? ['Q1-2025', 'Q4-2024'] : ['Q1-2025']
        },
        month: {
          labels: ['T1', 'T2', 'T3'],
          datasets: [
            {
              data: [1.82, 1.85, 1.89],
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            }
          ]
        }
      },
      metrics: [
        { label: 'NSP trung bình', value: '1.85M VND/tấn', change: '+2.2%', up: true },
        { label: 'NSP cao nhất', value: '1.92M VND/tấn', change: '+3.3%', up: true },
        { label: 'NSP thấp nhất', value: '1.68M VND/tấn', change: '+1.8%', up: true }
      ]
    },
    '3': {
      title: 'Chương trình Free Bag',
      type: 'Free Goods Program Analysis',
      icon: 'package',
      color: '#9C27B0',
      description: 'Phân tích kết quả của các chương trình hàng miễn phí, bao gồm số lượng phát ra và tác động đến doanh số.',
      data: {
        quarter: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            {
              data: [250, 320, 280, 300],
              color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
            },
            compareMode ? {
              data: [230, 290, 260, 275],
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            } : undefined
          ].filter(Boolean),
          legend: compareMode ? ['2025', '2024'] : ['2025']
        },
        month: {
          labels: ['T1', 'T2', 'T3'],
          datasets: [
            {
              data: [85, 78, 87],
              color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
            }
          ]
        }
      },
      metrics: [
        { label: 'Số lượng Q1-2025', value: '250 tấn', change: '+8.7%', up: true },
        { label: 'Tỷ lệ/doanh số', value: '3.2%', change: '+0.2%', up: true },
        { label: 'Chi phí trung bình', value: '275K VND/tấn', change: '-1.1%', up: false }
      ]
    },
    '4': {
      title: 'Phân tích thị phần',
      type: 'Market Share Analysis',
      icon: 'pie-chart',
      color: '#FF9800',
      description: 'Thông tin thị phần của Fico-YTL và các đối thủ cạnh tranh trên thị trường xi măng.',
      data: {
        quarter: [
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
        ],
        month: [
          {
            name: 'Fico-YTL',
            population: 33.1,
            color: '#2196F3',
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
          },
          {
            name: 'Brand A',
            population: 27.9,
            color: '#4CAF50',
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
          },
          {
            name: 'Brand B',
            population: 21.8,
            color: '#FFC107',
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
          },
          {
            name: 'Others',
            population: 17.2,
            color: '#FF5722',
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
          },
        ]
      },
      metrics: [
        { label: 'Thị phần Fico-YTL', value: '32.4%', change: '+1.8%', up: true },
        { label: 'Thị phần khu vực HN', value: '28.7%', change: '+2.1%', up: true },
        { label: 'Thị phần khu vực HCM', value: '34.2%', change: '+1.5%', up: true }
      ]
    }
  };

  const currentReport = reports[id as keyof typeof reports];
  if (!currentReport) {
    return (
      <View style={styles.errorContainer}>
        <Feather name="alert-circle" size={normalize(50)} color="#F44336" />
        <Text style={styles.errorText}>Không tìm thấy báo cáo</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render the appropriate chart based on the report type
  const renderChart = () => {
    const chartData = currentReport.data[timeframe];
    
    if (id === '1') {
      return (
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: chartData.datasets,
            legend: chartData.legend
          }}
          width={width - normalize(40)}
          height={normalize(220)}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
          }}
          bezier
          style={styles.chart}
          yAxisLabel=""
          yAxisSuffix=" tỷ"
          fromZero={true}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          withDots={true}
          withShadow={false}
          withScrollableDot={false}
        />
      );
    } else if (id === '2' || id === '3') {
      return (
        <BarChart
          data={{
            labels: chartData.labels,
            datasets: chartData.datasets,
            legend: chartData.legend
          }}
          width={width - normalize(40)}
          height={normalize(220)}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => id === '2' 
              ? `rgba(76, 175, 80, ${opacity})`
              : `rgba(156, 39, 176, ${opacity})`,
          }}
          style={styles.chart}
          yAxisLabel=""
          yAxisSuffix={id === '2' ? "M" : " tấn"}
          fromZero={true}
          showValuesOnTopOfBars={true}
          withInnerLines={true}
          showBarTops={true}
        />
      );
    } else if (id === '4') {
      return (
        <PieChart
          data={chartData}
          width={width - normalize(40)}
          height={normalize(220)}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 0]}
          absolute
          style={styles.chart}
        />
      );
    }
    
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: `${currentReport.color}10` }]}>
        <View style={[styles.iconContainer, { backgroundColor: `${currentReport.color}20` }]}>
          <Feather 
            name={currentReport.icon as any} 
            size={normalize(24)} 
            color={currentReport.color} 
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{currentReport.title}</Text>
          <Text style={styles.headerSubtitle}>{currentReport.type}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.description}>{currentReport.description}</Text>
        </View>

        {/* Time frame selector */}
        <View style={styles.timeframeContainer}>
          <TouchableOpacity 
            style={[styles.timeframeButton, timeframe === 'quarter' && styles.activeTimeframeButton]}
            onPress={() => setTimeframe('quarter')}
          >
            <Text style={[
              styles.timeframeText, 
              timeframe === 'quarter' && styles.activeTimeframeText
            ]}>Quý</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.timeframeButton, timeframe === 'month' && styles.activeTimeframeButton]}
            onPress={() => setTimeframe('month')}
          >
            <Text style={[
              styles.timeframeText, 
              timeframe === 'month' && styles.activeTimeframeText
            ]}>Tháng</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.compareButton, compareMode && styles.activeCompareButton]}
            onPress={() => setCompareMode(!compareMode)}
          >
            <Text style={[
              styles.compareText, 
              compareMode && styles.activeCompareText
            ]}>So sánh</Text>
          </TouchableOpacity>
        </View>

        {/* Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartTitleContainer}>
            <Text style={styles.chartTitle}>
              {currentReport.title} {timeframe === 'quarter' ? 'theo Quý' : 'theo Tháng'}
            </Text>
            <TouchableOpacity>
              <Feather name="download" size={normalize(18)} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={styles.chartContainer}>
            {renderChart()}
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsContainer}>
          <Text style={styles.metricsTitle}>Chỉ số quan trọng</Text>
          <View style={styles.metricsGrid}>
            {currentReport.metrics.map((metric, index) => (
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
        </View>

        {/* Additional Analysis */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="file-text" size={normalize(16)} color="#2196F3" />
            <Text style={styles.cardTitle}>Phân tích bổ sung</Text>
          </View>
          <Text style={styles.analysisText}>
            {id === '1' && 'Doanh số trong Q1-2025 tăng trưởng 5.2% so với cùng kỳ năm trước. Khu vực có tăng trưởng mạnh nhất là HCM với mức tăng 7.8% nhờ các chương trình khuyến mãi hiệu quả và mở rộng kênh phân phối.'}
            {id === '2' && 'NSP trung bình đạt 1.85M VND/tấn, tăng 2.2% so với Q4-2024. Mức tăng này phản ánh chiến lược định giá mới được áp dụng từ tháng 1/2025, tập trung vào phân khúc cao cấp và điều chỉnh cơ cấu giá theo khu vực.'}
            {id === '3' && 'Chương trình Free Bag Q1-2025 đạt 250 tấn, tăng 8.7% so với cùng kỳ năm trước. Hiệu quả của chương trình thể hiện qua việc tăng thị phần tại các khu vực triển khai, đặc biệt tại thị trường Hà Nội.'}
            {id === '4' && 'Thị phần của Fico-YTL đạt 32.4% trong Q1-2025, tăng 1.8% so với cùng kỳ năm trước. Mức tăng này đến từ chiến lược mở rộng mạng lưới phân phối và các chương trình khuyến mãi hiệu quả tại thị trường HCM và miền Nam.'}
          </Text>
        </View>

        {/* Export Button */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.exportButton}>
            <Feather name="download" size={normalize(16)} color="#2196F3" />
            <Text style={styles.exportButtonText}>Xuất báo cáo PDF</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton}>
            <Feather name="share-2" size={normalize(16)} color="#fff" />
            <Text style={styles.shareButtonText}>Chia sẻ</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(15),
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  iconContainer: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(24),
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: normalize(12),
    color: '#666',
  },
  scrollContainer: {
    flex: 1,
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
  description: {
    fontSize: normalize(12),
    color: '#333',
    lineHeight: normalize(18),
  },
  timeframeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: normalize(10),
  },
  timeframeButton: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderRadius: normalize(20),
    flex: 1,
    marginRight: normalize(8),
    alignItems: 'center',
  },
  activeTimeframeButton: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  timeframeText: {
    fontSize: normalize(12),
    color: '#666',
  },
  activeTimeframeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  compareButton: {
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(12),
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderRadius: normalize(20),
    flex: 1,
    alignItems: 'center',
  },
  activeCompareButton: {
    backgroundColor: '#9C27B0',
    borderColor: '#9C27B0',
  },
  compareText: {
    fontSize: normalize(12),
    color: '#666',
  },
  activeCompareText: {
    color: 'white',
    fontWeight: 'bold',
  },
  chartCard: {
    backgroundColor: 'white',
    margin: normalize(10),
    marginBottom: normalize(5),
    borderRadius: normalize(8),
    paddingVertical: normalize(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(12),
    marginBottom: normalize(10),
  },
  chartTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  chartContainer: {
    paddingHorizontal: normalize(10),
    alignItems: 'center',
  },
  chart: {
    marginVertical: normalize(8),
    borderRadius: normalize(8),
  },
  metricsContainer: {
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
  metricsTitle: {
    fontSize: normalize(14),
    fontWeight: 'bold',
    marginBottom: normalize(10),
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '31%',
    backgroundColor: '#f9f9f9',
    borderRadius: normalize(8),
    padding: normalize(10),
    marginBottom: normalize(10),
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
  analysisText: {
    fontSize: normalize(12),
    lineHeight: normalize(18),
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: normalize(10),
    marginBottom: normalize(20),
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: normalize(8),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    flex: 1,
    marginRight: normalize(5),
  },
  exportButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginLeft: normalize(8),
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: normalize(8),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    flex: 1,
    marginLeft: normalize(5),
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: normalize(8),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(20),
  },
  errorText: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginTop: normalize(10),
    marginBottom: normalize(20),
  },
  backButton: {
    backgroundColor: '#2196F3',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(8),
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});