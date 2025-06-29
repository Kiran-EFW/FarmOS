import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChartBar as BarChart3, TrendingUp, DollarSign, Calendar, Calculator, Zap, ChartPie as PieChart, ChartLine as LineChartIcon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AnalysisScreen() {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [farmSize, setFarmSize] = useState(50); // Default 50 acres
  const [timeframe, setTimeframe] = useState('annual');

  const calculateProjections = () => {
    const residuePerAcre = 2.5;
    const pricePerTon = 2500;
    const totalResidue = farmSize * residuePerAcre;
    const annualRevenue = totalResidue * pricePerTon;
    const monthlyRevenue = annualRevenue / 12;
    const dailyRevenue = annualRevenue / 365;

    return {
      totalResidue,
      annualRevenue,
      monthlyRevenue,
      dailyRevenue,
      perAcreRevenue: annualRevenue / farmSize,
    };
  };

  const projections = calculateProjections();

  const yearlyProjections = Array.from({ length: 5 }, (_, i) => ({
    year: 2024 + i,
    revenue: projections.annualRevenue * (1 + 0.05) ** i, // 5% yearly increase
    residue: projections.totalResidue,
  }));

  const monthlyData = [
    { month: 'Jan', value: 0.2, revenue: projections.monthlyRevenue * 0.2 },
    { month: 'Feb', value: 0.1, revenue: projections.monthlyRevenue * 0.1 },
    { month: 'Mar', value: 0.3, revenue: projections.monthlyRevenue * 0.3 },
    { month: 'Apr', value: 0.8, revenue: projections.monthlyRevenue * 0.8 },
    { month: 'May', value: 1.2, revenue: projections.monthlyRevenue * 1.2 },
    { month: 'Jun', value: 0.9, revenue: projections.monthlyRevenue * 0.9 },
    { month: 'Jul', value: 0.1, revenue: projections.monthlyRevenue * 0.1 },
    { month: 'Aug', value: 0.2, revenue: projections.monthlyRevenue * 0.2 },
    { month: 'Sep', value: 0.4, revenue: projections.monthlyRevenue * 0.4 },
    { month: 'Oct', value: 1.8, revenue: projections.monthlyRevenue * 1.8 },
    { month: 'Nov', value: 2.1, revenue: projections.monthlyRevenue * 2.1 },
    { month: 'Dec', value: 1.9, revenue: projections.monthlyRevenue * 1.9 },
  ];

  const BarChart = ({ data, height = 200 }: { data: any[], height?: number }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <View style={[styles.chartContainer, { height }]}>
        <View style={styles.barsContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.barWrapper}>
              <View
                style={[
                  styles.bar,
                  {
                    height: (item.value / maxValue) * (height - 60),
                    backgroundColor: item.value > maxValue * 0.7 ? '#2E7D32' : 
                                   item.value > maxValue * 0.4 ? '#FDD835' : '#795548',
                  },
                ]}
              />
              <Text style={styles.barLabel}>{item.month}</Text>
              <Text style={styles.barValue}>₹{(item.revenue / 1000).toFixed(0)}K</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const CustomLineChart = ({ data }: { data: any[] }) => {
    return (
      <View style={styles.lineChartContainer}>
        <View style={styles.lineChartGrid}>
          {data.map((item, index) => (
            <View key={index} style={styles.lineChartPoint}>
              <View style={styles.lineChartDot} />
              <Text style={styles.lineChartLabel}>{item.year}</Text>
              <Text style={styles.lineChartValue}>₹{(item.revenue / 100000).toFixed(1)}L</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <LinearGradient
        colors={['#2E7D32', '#4CAF50']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Revenue Analysis</Text>
        <Text style={styles.headerSubtitle}>Detailed projections and ROI calculations</Text>
        
        <View style={styles.farmSizeSelector}>
          <Text style={styles.farmSizeLabel}>Farm Size: {farmSize} acres</Text>
          <View style={styles.farmSizeButtons}>
            {[25, 50, 75, 100].map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.farmSizeButton,
                  farmSize === size && styles.farmSizeButtonActive
                ]}
                onPress={() => setFarmSize(size)}
              >
                <Text style={[
                  styles.farmSizeButtonText,
                  farmSize === size && styles.farmSizeButtonTextActive
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <DollarSign size={28} color="#2E7D32" />
            <Text style={styles.metricValue}>₹{projections.annualRevenue.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Annual Revenue</Text>
            <Text style={styles.metricSubtext}>From {projections.totalResidue.toFixed(1)} tons residue</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Calendar size={28} color="#FDD835" />
            <Text style={styles.metricValue}>₹{projections.monthlyRevenue.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Monthly Average</Text>
            <Text style={styles.metricSubtext}>Seasonal variations apply</Text>
          </View>
          
          <View style={styles.metricCard}>
            <TrendingUp size={28} color="#795548" />
            <Text style={styles.metricValue}>₹{projections.perAcreRevenue.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Per Acre Income</Text>
            <Text style={styles.metricSubtext}>Additional to crop income</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Zap size={28} color="#2E7D32" />
            <Text style={styles.metricValue}>{projections.totalResidue.toFixed(1)} T</Text>
            <Text style={styles.metricLabel}>Annual Residue</Text>
            <Text style={styles.metricSubtext}>Converted to energy</Text>
          </View>
        </View>

        {/* Seasonal Analysis */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color="#2E7D32" />
            <Text style={styles.sectionTitle}>Seasonal Revenue Distribution</Text>
          </View>
          
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.sectionImage}
            resizeMode="cover"
          />
          
          <Text style={styles.sectionSubtitle}>Revenue potential by month (relative scale)</Text>
          <BarChart data={monthlyData} height={220} />
          
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>🌾 Seasonal Insights</Text>
            <View style={styles.insightList}>
              <Text style={styles.insightText}>• Peak revenue: October-December (post-harvest season)</Text>
              <Text style={styles.insightText}>• Storage strategy required for year-round supply</Text>
              <Text style={styles.insightText}>• Multiple crop cycles can increase annual yield</Text>
              <Text style={styles.insightText}>• Weather patterns affect residue quality and quantity</Text>
            </View>
          </View>
        </View>

        {/* 5-Year Projection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LineChartIcon size={24} color="#2E7D32" />
            <Text style={styles.sectionTitle}>5-Year Revenue Projection</Text>
          </View>
          
          <CustomLineChart data={yearlyProjections} />
          
          <View style={styles.projectionTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Year</Text>
              <Text style={styles.tableHeaderText}>Revenue</Text>
              <Text style={styles.tableHeaderText}>Growth</Text>
              <Text style={styles.tableHeaderText}>Cumulative</Text>
            </View>
            {yearlyProjections.map((year, index) => (
              <View key={year.year} style={styles.tableRow}>
                <Text style={styles.tableCell}>{year.year}</Text>
                <Text style={styles.tableCell}>₹{(year.revenue / 100000).toFixed(1)}L</Text>
                <Text style={[styles.tableCell, styles.growthText]}>
                  {index === 0 ? 'Base' : `+${(5 * index)}%`}
                </Text>
                <Text style={styles.tableCell}>
                  ₹{(yearlyProjections.slice(0, index + 1).reduce((sum, y) => sum + y.revenue, 0) / 100000).toFixed(1)}L
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ROI Analysis */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calculator size={24} color="#2E7D32" />
            <Text style={styles.sectionTitle}>ROI & Profitability Analysis</Text>
          </View>
          
          <View style={styles.roiGrid}>
            <View style={styles.roiCard}>
              <Text style={styles.roiTitle}>💰 Break-even Analysis</Text>
              <Text style={styles.roiDescription}>
                Initial setup costs recover within 2-3 collection seasons
              </Text>
              <View style={styles.roiMetric}>
                <Text style={styles.roiValue}>18 months</Text>
                <Text style={styles.roiLabel}>Payback Period</Text>
              </View>
            </View>
            
            <View style={styles.roiCard}>
              <Text style={styles.roiTitle}>📈 Profit Margins</Text>
              <Text style={styles.roiDescription}>
                High margins due to minimal processing requirements
              </Text>
              <View style={styles.roiMetric}>
                <Text style={styles.roiValue}>65-70%</Text>
                <Text style={styles.roiLabel}>Gross Margin</Text>
              </View>
            </View>
            
            <View style={styles.roiCard}>
              <Text style={styles.roiTitle}>🎯 Risk Assessment</Text>
              <Text style={styles.roiDescription}>
                Low risk with guaranteed contracts and stable pricing
              </Text>
              <View style={styles.roiMetric}>
                <Text style={styles.roiValue}>Low</Text>
                <Text style={styles.roiLabel}>Risk Level</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Cost Structure */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <PieChart size={24} color="#2E7D32" />
            <Text style={styles.sectionTitle}>Cost Structure Breakdown</Text>
          </View>
          
          <View style={styles.costBreakdown}>
            <View style={styles.costItem}>
              <View style={styles.costBar}>
                <View style={[styles.costFill, { width: '40%', backgroundColor: '#2E7D32' }]} />
              </View>
              <Text style={styles.costLabel}>Collection & Baling (40%)</Text>
              <Text style={styles.costValue}>₹1,000/ton</Text>
            </View>
            
            <View style={styles.costItem}>
              <View style={styles.costBar}>
                <View style={[styles.costFill, { width: '25%', backgroundColor: '#FDD835' }]} />
              </View>
              <Text style={styles.costLabel}>Transportation (25%)</Text>
              <Text style={styles.costValue}>₹625/ton</Text>
            </View>
            
            <View style={styles.costItem}>
              <View style={styles.costBar}>
                <View style={[styles.costFill, { width: '20%', backgroundColor: '#795548' }]} />
              </View>
              <Text style={styles.costLabel}>Storage & Handling (20%)</Text>
              <Text style={styles.costValue}>₹500/ton</Text>
            </View>
            
            <View style={styles.costItem}>
              <View style={styles.costBar}>
                <View style={[styles.costFill, { width: '15%', backgroundColor: '#FF9800' }]} />
              </View>
              <Text style={styles.costLabel}>Administrative (15%)</Text>
              <Text style={styles.costValue}>₹375/ton</Text>
            </View>
          </View>
          
          <View style={styles.costSummary}>
            <Text style={styles.costSummaryTitle}>Total Cost per Ton: ₹2,500</Text>
            <Text style={styles.costSummarySubtitle}>Net profit margin maintained through efficient operations</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.calculateButton}>
          <Calculator size={20} color="#FFFFFF" />
          <Text style={styles.calculateButtonText}>Generate Detailed Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8F5E8',
    textAlign: 'center',
    marginBottom: 20,
  },
  farmSizeSelector: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  farmSizeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  farmSizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  farmSizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  farmSizeButtonActive: {
    backgroundColor: '#FDD835',
  },
  farmSizeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  farmSizeButtonTextActive: {
    color: '#2E7D32',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    width: width > 768 ? '23%' : '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginTop: 12,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#795548',
    textAlign: 'center',
    fontWeight: '600',
  },
  metricSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginLeft: 12,
  },
  sectionImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#795548',
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#795548',
    textAlign: 'center',
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  lineChartContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  lineChartGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineChartPoint: {
    alignItems: 'center',
  },
  lineChartDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2E7D32',
    marginBottom: 8,
  },
  lineChartLabel: {
    fontSize: 12,
    color: '#795548',
    marginBottom: 4,
  },
  lineChartValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
  },
  insightCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 12,
  },
  insightList: {
    gap: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#795548',
    lineHeight: 20,
  },
  projectionTable: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  growthText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  roiGrid: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: 16,
  },
  roiCard: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  roiTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 12,
  },
  roiDescription: {
    fontSize: 14,
    color: '#795548',
    marginBottom: 16,
    lineHeight: 20,
  },
  roiMetric: {
    alignItems: 'center',
  },
  roiValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
  },
  roiLabel: {
    fontSize: 12,
    color: '#795548',
    marginTop: 4,
  },
  costBreakdown: {
    gap: 20,
    marginBottom: 20,
  },
  costItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  costBar: {
    width: 80,
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
  },
  costFill: {
    height: '100%',
    borderRadius: 6,
  },
  costLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  costValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
  },
  costSummary: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  costSummaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  costSummarySubtitle: {
    fontSize: 14,
    color: '#795548',
    textAlign: 'center',
  },
  calculateButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});