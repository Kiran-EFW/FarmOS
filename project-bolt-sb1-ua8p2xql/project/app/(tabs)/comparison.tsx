import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GitCompare, Check, X, Star, Zap, DollarSign, Clock, Award, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface TechnologyOption {
  id: string;
  name: string;
  efficiency: string;
  cost: string;
  maintenance: 'Low' | 'Medium' | 'High';
  reliability: number;
  pros: string[];
  cons: string[];
  recommended: boolean;
  suitability: number;
  image: string;
}

const technologies: TechnologyOption[] = [
  {
    id: 'igcc',
    name: 'IGCC (Gas Turbine + Steam)',
    efficiency: '45-50%',
    cost: '₹12-15 Cr/MW',
    maintenance: 'Medium',
    reliability: 95,
    pros: [
      'Highest efficiency at scale',
      'Mature technology',
      'Lower land footprint',
      'Local manufacturing support',
      'Combined cycle optimization'
    ],
    cons: [
      'Water-intensive operation',
      'Higher initial complexity',
      'Skilled operators required'
    ],
    recommended: true,
    suitability: 5,
    image: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'ice',
    name: 'Multiple ICE Plants',
    efficiency: '35-40%',
    cost: '₹5-7 Cr/MW',
    maintenance: 'High',
    reliability: 85,
    pros: [
      'Modular installation',
      'Lower capital cost',
      'Handles impurities well',
      'Quick deployment',
      'Flexible capacity'
    ],
    cons: [
      'Higher maintenance needs',
      'More space required',
      'Lower overall efficiency',
      'Higher operational costs'
    ],
    recommended: false,
    suitability: 3,
    image: 'https://images.pexels.com/photos/162568/factory-plant-industrial-power-162568.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'sofc',
    name: 'Large-Scale SOFC',
    efficiency: '55-60%',
    cost: '₹20-25 Cr/MW',
    maintenance: 'Low',
    reliability: 90,
    pros: [
      'Highest electrical efficiency',
      'Silent operation',
      'Low emissions',
      'Compact design',
      'High-quality power output'
    ],
    cons: [
      'Extremely high cost',
      'Technology sensitivity',
      'Limited suppliers',
      'Unproven at scale'
    ],
    recommended: false,
    suitability: 2,
    image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export default function ComparisonScreen() {
  const [selectedTech, setSelectedTech] = useState<string>('igcc');
  const [comparisonMode, setComparisonMode] = useState<'overview' | 'detailed'>('overview');

  const selectedTechnology = technologies.find(tech => tech.id === selectedTech);

  const ComparisonTable = () => (
    <View style={styles.comparisonTable}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Technology</Text>
        <Text style={styles.headerCell}>Efficiency</Text>
        <Text style={styles.headerCell}>Cost</Text>
        <Text style={styles.headerCell}>Rating</Text>
      </View>
      
      {technologies.map(tech => (
        <TouchableOpacity
          key={tech.id}
          style={[
            styles.tableRow,
            tech.recommended && styles.recommendedRow,
            selectedTech === tech.id && styles.selectedRow
          ]}
          onPress={() => setSelectedTech(tech.id)}
        >
          <View style={styles.techNameCell}>
            <Text style={styles.techName}>{tech.name}</Text>
            {tech.recommended && (
              <View style={styles.recommendedBadge}>
                <Star size={12} color="#FDD835" />
                <Text style={styles.recommendedText}>Recommended</Text>
              </View>
            )}
          </View>
          <Text style={styles.tableCell}>{tech.efficiency}</Text>
          <Text style={styles.tableCell}>{tech.cost}</Text>
          <View style={styles.ratingCell}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={14}
                color={i < tech.suitability ? '#FDD835' : '#E0E0E0'}
                fill={i < tech.suitability ? '#FDD835' : 'transparent'}
              />
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const TechnologyDetails = () => {
    if (!selectedTechnology) return null;

    return (
      <View style={styles.detailsContainer}>
        <Image
          source={{ uri: selectedTechnology.image }}
          style={styles.technologyImage}
          resizeMode="cover"
        />
        
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsTitle}>{selectedTechnology.name}</Text>
          {selectedTechnology.recommended && (
            <View style={styles.recommendedBadge}>
              <Award size={16} color="#FDD835" />
              <Text style={styles.recommendedText}>Recommended</Text>
            </View>
          )}
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Zap size={24} color="#2E7D32" />
            <Text style={styles.metricValue}>{selectedTechnology.efficiency}</Text>
            <Text style={styles.metricLabel}>Efficiency</Text>
          </View>
          
          <View style={styles.metricCard}>
            <DollarSign size={24} color="#2E7D32" />
            <Text style={styles.metricValue}>{selectedTechnology.cost}</Text>
            <Text style={styles.metricLabel}>Capital Cost</Text>
          </View>
          
          <View style={styles.metricCard}>
            <Clock size={24} color="#2E7D32" />
            <Text style={styles.metricValue}>{selectedTechnology.reliability}%</Text>
            <Text style={styles.metricLabel}>Reliability</Text>
          </View>
        </View>

        <View style={styles.prosConsContainer}>
          <View style={styles.prosContainer}>
            <Text style={styles.prosConsTitle}>✅ Advantages</Text>
            {selectedTechnology.pros.map((pro, index) => (
              <View key={index} style={styles.prosConsItem}>
                <Check size={16} color="#2E7D32" />
                <Text style={styles.prosText}>{pro}</Text>
              </View>
            ))}
          </View>

          <View style={styles.consContainer}>
            <Text style={styles.prosConsTitle}>⚠️ Considerations</Text>
            {selectedTechnology.cons.map((con, index) => (
              <View key={index} style={styles.prosConsItem}>
                <X size={16} color="#FF5722" />
                <Text style={styles.consText}>{con}</Text>
              </View>
            ))}
          </View>
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
        <Text style={styles.headerTitle}>Technology Comparison</Text>
        <Text style={styles.headerSubtitle}>Compare syngas-to-electricity solutions</Text>
        
        <View style={styles.modeSelector}>
          <TouchableOpacity
            style={[styles.modeButton, comparisonMode === 'overview' && styles.modeButtonActive]}
            onPress={() => setComparisonMode('overview')}
          >
            <Text style={[styles.modeButtonText, comparisonMode === 'overview' && styles.modeButtonTextActive]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, comparisonMode === 'detailed' && styles.modeButtonActive]}
            onPress={() => setComparisonMode('detailed')}
          >
            <Text style={[styles.modeButtonText, comparisonMode === 'detailed' && styles.modeButtonTextActive]}>
              Detailed
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {comparisonMode === 'overview' ? (
          <>
            {/* Technology Options */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Technology Options</Text>
              <ComparisonTable />
            </View>

            {/* Why IGCC is Recommended */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Why IGCC is Recommended</Text>
              <View style={styles.recommendationCard}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=800' }}
                  style={styles.recommendationImage}
                  resizeMode="cover"
                />
                
                <View style={styles.recommendationContent}>
                  <View style={styles.recommendationHeader}>
                    <GitCompare size={24} color="#2E7D32" />
                    <Text style={styles.recommendationTitle}>Best Overall Solution</Text>
                  </View>
                  
                  <Text style={styles.recommendationText}>
                    For a 300 MW project in Haryana, IGCC technology offers the optimal balance of 
                    efficiency, cost-effectiveness, and technical maturity. With local manufacturing 
                    support from BHEL and proven performance at scale, it minimizes project risks 
                    while maximizing returns.
                  </Text>
                  
                  <View style={styles.keyPointsGrid}>
                    <View style={styles.keyPoint}>
                      <Text style={styles.keyPointNumber}>48%</Text>
                      <Text style={styles.keyPointLabel}>Average Efficiency</Text>
                    </View>
                    <View style={styles.keyPoint}>
                      <Text style={styles.keyPointNumber}>25 Acres</Text>
                      <Text style={styles.keyPointLabel}>Land Requirement</Text>
                    </View>
                    <View style={styles.keyPoint}>
                      <Text style={styles.keyPointNumber}>95%</Text>
                      <Text style={styles.keyPointLabel}>Reliability</Text>
                    </View>
                    <View style={styles.keyPoint}>
                      <Text style={styles.keyPointNumber}>BHEL</Text>
                      <Text style={styles.keyPointLabel}>Local Support</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Alternative Solutions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Alternative Solutions Comparison</Text>
              <View style={styles.alternativesGrid}>
                <View style={styles.alternativeCard}>
                  <Text style={styles.alternativeTitle}>🔥 Traditional Burning</Text>
                  <Text style={styles.alternativeRevenue}>₹0 Revenue</Text>
                  <Text style={styles.alternativeImpact}>High Environmental Impact</Text>
                  <View style={styles.alternativeRating}>
                    <Text style={styles.alternativeRatingText}>Not Recommended</Text>
                  </View>
                </View>
                
                <View style={styles.alternativeCard}>
                  <Text style={styles.alternativeTitle}>📦 Direct Sale (Raw)</Text>
                  <Text style={styles.alternativeRevenue}>₹500-800/ton</Text>
                  <Text style={styles.alternativeImpact}>Low Processing Value</Text>
                  <View style={styles.alternativeRating}>
                    <Text style={styles.alternativeRatingText}>Limited Potential</Text>
                  </View>
                </View>
                
                <View style={[styles.alternativeCard, styles.recommendedAlternative]}>
                  <Text style={styles.alternativeTitle}>⚡ Syngas Power Project</Text>
                  <Text style={styles.alternativeRevenue}>₹2,500/ton</Text>
                  <Text style={styles.alternativeImpact}>High Value Creation</Text>
                  <View style={[styles.alternativeRating, styles.recommendedRating]}>
                    <Star size={16} color="#FDD835" />
                    <Text style={styles.recommendedRatingText}>Recommended</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Market Analysis */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Market Analysis & Trends</Text>
              <View style={styles.marketAnalysis}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600' }}
                  style={styles.marketImage}
                  resizeMode="cover"
                />
                
                <View style={styles.marketContent}>
                  <View style={styles.marketTrend}>
                    <TrendingUp size={20} color="#2E7D32" />
                    <Text style={styles.marketTrendTitle}>Growing Demand</Text>
                    <Text style={styles.marketTrendText}>
                      Renewable energy demand in India growing at 15% annually
                    </Text>
                  </View>
                  
                  <View style={styles.marketTrend}>
                    <DollarSign size={20} color="#2E7D32" />
                    <Text style={styles.marketTrendTitle}>Government Support</Text>
                    <Text style={styles.marketTrendText}>
                      ₹1,680 Cr subsidies available for 300MW projects
                    </Text>
                  </View>
                  
                  <View style={styles.marketTrend}>
                    <Zap size={20} color="#2E7D32" />
                    <Text style={styles.marketTrendTitle}>Technology Maturity</Text>
                    <Text style={styles.marketTrendText}>
                      IGCC technology proven in 50+ installations globally
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        ) : (
          <TechnologyDetails />
        )}

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Generate Comparison Report</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  modeButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modeButtonTextActive: {
    color: '#2E7D32',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 20,
  },
  comparisonTable: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  headerCell: {
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
    alignItems: 'center',
  },
  recommendedRow: {
    backgroundColor: '#E8F5E8',
  },
  selectedRow: {
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 4,
    borderLeftColor: '#FDD835',
  },
  techNameCell: {
    flex: 1,
  },
  techName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  ratingCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  recommendedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDD835',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2E7D32',
    marginLeft: 4,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  technologyImage: {
    width: '100%',
    height: 200,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2E7D32',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginTop: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#795548',
  },
  prosConsContainer: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: 20,
    padding: 24,
  },
  prosContainer: {
    flex: 1,
  },
  consContainer: {
    flex: 1,
  },
  prosConsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 16,
  },
  prosConsItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  prosText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  consText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  recommendationCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  recommendationImage: {
    width: '100%',
    height: 160,
  },
  recommendationContent: {
    padding: 24,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginLeft: 12,
  },
  recommendationText: {
    fontSize: 14,
    color: '#795548',
    lineHeight: 22,
    marginBottom: 20,
  },
  keyPointsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  keyPoint: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: '45%',
  },
  keyPointNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  keyPointLabel: {
    fontSize: 12,
    color: '#795548',
    textAlign: 'center',
  },
  alternativesGrid: {
    gap: 16,
  },
  alternativeCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  recommendedAlternative: {
    backgroundColor: '#E8F5E8',
    borderColor: '#2E7D32',
    borderWidth: 2,
  },
  alternativeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  alternativeRevenue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  alternativeImpact: {
    fontSize: 14,
    color: '#795548',
    marginBottom: 16,
  },
  alternativeRating: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  recommendedRating: {
    backgroundColor: '#FDD835',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  alternativeRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#795548',
  },
  recommendedRatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2E7D32',
  },
  marketAnalysis: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
  },
  marketImage: {
    width: '100%',
    height: 140,
  },
  marketContent: {
    padding: 20,
    gap: 16,
  },
  marketTrend: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  marketTrendTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
    flex: 1,
  },
  marketTrendText: {
    fontSize: 12,
    color: '#795548',
    lineHeight: 18,
    flex: 2,
  },
  actionButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});