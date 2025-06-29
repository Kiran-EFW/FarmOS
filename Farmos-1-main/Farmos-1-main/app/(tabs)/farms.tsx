import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Bell, Plus, Star, MapPin, Calendar, Droplets, Thermometer, Layers, Satellite, Target, TrendingUp, Leaf, DollarSign } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function FarmsScreen() {
  const [selectedField, setSelectedField] = useState(0);
  const [viewMode, setViewMode] = useState<'satellite' | 'hybrid'>('satellite');

  const fields = [
    { 
      id: 1, 
      name: 'North Field', 
      area: '45 ha',
      soilType: 'Heavy Clay',
      currentCrop: 'Winter Wheat',
      coordinates: { lat: 51.4416, lng: 0.3581 },
      recommendation: { crop: 'Winter Wheat', percentage: 85, subsidy: 'Wildflower Mix', subsidyPercentage: 15 }
    },
    { 
      id: 2, 
      name: 'South Field', 
      area: '38 ha',
      soilType: 'Clay Loam',
      currentCrop: 'Winter Barley',
      coordinates: { lat: 51.4396, lng: 0.3601 },
      recommendation: { crop: 'Oil Seed Rape', percentage: 90, subsidy: 'Beetle Banks', subsidyPercentage: 10 }
    },
    { 
      id: 3, 
      name: 'East Field', 
      area: '32 ha',
      soilType: 'Sandy Clay',
      currentCrop: 'Oil Seed Rape',
      coordinates: { lat: 51.4436, lng: 0.3621 },
      recommendation: { crop: 'Sugar Beet', percentage: 75, subsidy: 'Grass Margins', subsidyPercentage: 25 }
    },
  ];

  const currentField = fields[selectedField];

  const fieldColors = ['#16a34a', '#3b82f6', '#f59e0b'];

  const cropRecommendations = [
    { 
      name: 'Winter Wheat', 
      image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      season: 'Plant Now',
      yield: 'High',
      price: '£195/tonne'
    },
    { 
      name: 'Winter Barley', 
      image: 'https://images.pexels.com/photos/221016/pexels-photo-221016.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      season: 'Ideal Season',
      yield: 'Medium',
      price: '£175/tonne'
    },
    { 
      name: 'Oil Seed Rape', 
      image: 'https://images.pexels.com/photos/162209/rapeseed-field-yellow-nature-162209.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      season: 'Spring Ready',
      yield: 'High',
      price: '£445/tonne'
    },
    { 
      name: 'Sugar Beet', 
      image: 'https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      season: 'Spring Planting',
      yield: 'Very High',
      price: '£28/tonne'
    },
  ];

  const farmAnalytics = [
    { label: 'Total Area', value: '142 ha', icon: Target, color: '#16a34a' },
    { label: 'Avg Yield', value: '7.2 t/ha', icon: TrendingUp, color: '#3b82f6' },
    { label: 'Soil Health', value: '85/100', icon: Leaf, color: '#10b981' },
    { label: 'Revenue', value: '£1.8M', icon: DollarSign, color: '#f59e0b' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Farm Fields</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#1f2937" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Farm Analytics */}
        <View style={styles.analyticsSection}>
          <Text style={styles.sectionTitle}>Farm Overview</Text>
          <View style={styles.analyticsGrid}>
            {farmAnalytics.map((item, index) => (
              <View key={index} style={styles.analyticsCard}>
                <View style={[styles.analyticsIcon, { backgroundColor: item.color }]}>
                  <item.icon size={20} color="#ffffff" />
                </View>
                <Text style={styles.analyticsValue}>{item.value}</Text>
                <Text style={styles.analyticsLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Satellite Map Section */}
        <View style={styles.mapSection}>
          <View style={styles.mapHeader}>
            <Text style={styles.sectionTitle}>Field Satellite View</Text>
            <View style={styles.mapControls}>
              <TouchableOpacity 
                style={[styles.mapControlButton, viewMode === 'satellite' && styles.mapControlActive]}
                onPress={() => setViewMode('satellite')}
              >
                <Satellite size={16} color={viewMode === 'satellite' ? '#ffffff' : '#6b7280'} />
                <Text style={[styles.mapControlText, viewMode === 'satellite' && styles.mapControlTextActive]}>
                  Satellite
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.mapControlButton, viewMode === 'hybrid' && styles.mapControlActive]}
                onPress={() => setViewMode('hybrid')}
              >
                <Layers size={16} color={viewMode === 'hybrid' ? '#ffffff' : '#6b7280'} />
                <Text style={[styles.mapControlText, viewMode === 'hybrid' && styles.mapControlTextActive]}>
                  Hybrid
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Satellite Map Container */}
          <View style={styles.mapContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' }}
              style={styles.satelliteImage}
            />
            
            {/* Field Overlays */}
            <View style={styles.fieldOverlays}>
              {fields.map((field, index) => (
                <TouchableOpacity
                  key={field.id}
                  style={[
                    styles.fieldOverlay,
                    {
                      borderColor: fieldColors[index],
                      backgroundColor: `${fieldColors[index]}20`,
                      top: `${20 + index * 25}%`,
                      left: `${15 + index * 20}%`,
                    },
                    selectedField === index && styles.selectedFieldOverlay
                  ]}
                  onPress={() => setSelectedField(index)}
                >
                  <Text style={[styles.fieldLabel, { color: fieldColors[index] }]}>
                    {field.name}
                  </Text>
                  <Text style={styles.fieldArea}>{field.area}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Map Legend */}
            <View style={styles.mapLegend}>
              <Text style={styles.legendTitle}>Fields</Text>
              {fields.map((field, index) => (
                <View key={field.id} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: fieldColors[index] }]} />
                  <Text style={styles.legendText}>{field.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Field Selection */}
        <View style={styles.fieldSelection}>
          <Text style={styles.sectionTitle}>Select Field</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fieldScroll}>
            {fields.map((field, index) => (
              <TouchableOpacity
                key={field.id}
                style={[
                  styles.fieldCard,
                  selectedField === index && styles.selectedFieldCard
                ]}
                onPress={() => setSelectedField(index)}
              >
                <View style={[styles.fieldCardHeader, { backgroundColor: fieldColors[index] }]}>
                  <Text style={styles.fieldCardName}>{field.name}</Text>
                  <Text style={styles.fieldCardArea}>{field.area}</Text>
                </View>
                <View style={styles.fieldCardContent}>
                  <Text style={styles.fieldCardSoil}>{field.soilType}</Text>
                  <Text style={styles.fieldCardCrop}>{field.currentCrop}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Current Field Details */}
        <View style={styles.fieldDetailsSection}>
          <Text style={styles.sectionTitle}>Field Details - {currentField.name}</Text>
          <View style={styles.fieldDetailsCard}>
            <View style={styles.fieldDetailsHeader}>
              <View style={styles.fieldDetailsInfo}>
                <Text style={styles.fieldDetailsName}>{currentField.name}</Text>
                <Text style={styles.fieldDetailsArea}>{currentField.area}</Text>
              </View>
              <View style={styles.fieldDetailsStats}>
                <View style={styles.fieldStat}>
                  <Thermometer size={16} color="#f59e0b" />
                  <Text style={styles.fieldStatLabel}>Soil Type</Text>
                  <Text style={styles.fieldStatValue}>{currentField.soilType}</Text>
                </View>
                <View style={styles.fieldStat}>
                  <Leaf size={16} color="#16a34a" />
                  <Text style={styles.fieldStatLabel}>Current Crop</Text>
                  <Text style={styles.fieldStatValue}>{currentField.currentCrop}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Crop Recommendation Card */}
        <View style={styles.recommendationSection}>
          <Text style={styles.sectionTitle}>AI Crop Recommendations</Text>
          <View style={styles.recommendationCard}>
            <LinearGradient
              colors={['#16a34a', '#15803d']}
              style={styles.recommendationGradient}
            >
              <View style={styles.recommendationHeader}>
                <Text style={styles.recommendationTitle}>Optimal Crop Allocation</Text>
                <Text style={styles.recommendationSubtitle}>Based on soil conditions and yield projections</Text>
              </View>

              <View style={styles.recommendationBreakdown}>
                <View style={styles.recommendationItem}>
                  <View style={styles.recommendationPercentage}>
                    <Text style={styles.percentageNumber}>{currentField.recommendation.percentage}%</Text>
                  </View>
                  <View style={styles.recommendationDetails}>
                    <Text style={styles.recommendationCrop}>{currentField.recommendation.crop}</Text>
                    <Text style={styles.recommendationDescription}>Primary crop for maximum yield</Text>
                  </View>
                  <Leaf size={24} color="#ffffff" />
                </View>

                <View style={styles.recommendationDivider} />

                <View style={styles.recommendationItem}>
                  <View style={styles.recommendationPercentage}>
                    <Text style={styles.percentageNumber}>{currentField.recommendation.subsidyPercentage}%</Text>
                  </View>
                  <View style={styles.recommendationDetails}>
                    <Text style={styles.recommendationCrop}>{currentField.recommendation.subsidy}</Text>
                    <Text style={styles.recommendationDescription}>Government subsidy eligible</Text>
                  </View>
                  <DollarSign size={24} color="#ffffff" />
                </View>
              </View>

              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Recommendations</Text>
                <Plus size={20} color="#16a34a" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Available Crops */}
        <View style={styles.cropsSection}>
          <Text style={styles.sectionTitle}>Available Crops for Kent</Text>
          <View style={styles.cropsGrid}>
            {cropRecommendations.map((crop, index) => (
              <TouchableOpacity key={index} style={styles.cropCard}>
                <Image
                  source={{ uri: crop.image }}
                  style={styles.cropImage}
                />
                <View style={styles.cropInfo}>
                  <Text style={styles.cropName}>{crop.name}</Text>
                  <Text style={styles.cropSeason}>{crop.season}</Text>
                  <View style={styles.cropMetrics}>
                    <Text style={styles.cropYield}>Yield: {crop.yield}</Text>
                    <Text style={styles.cropPrice}>{crop.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weather Impact */}
        <View style={styles.weatherSection}>
          <Text style={styles.sectionTitle}>Weather Impact Analysis</Text>
          <View style={styles.weatherCard}>
            <View style={styles.weatherHeader}>
              <View style={styles.weatherInfo}>
                <Text style={styles.weatherTitle}>Current Conditions</Text>
                <Text style={styles.weatherDescription}>Optimal for winter crop establishment</Text>
              </View>
              <Droplets size={32} color="#3b82f6" />
            </View>
            <View style={styles.weatherMetrics}>
              <View style={styles.weatherMetric}>
                <Text style={styles.weatherMetricLabel}>Soil Moisture</Text>
                <Text style={styles.weatherMetricValue}>High</Text>
              </View>
              <View style={styles.weatherMetric}>
                <Text style={styles.weatherMetricLabel}>Temperature</Text>
                <Text style={styles.weatherMetricValue}>8°C</Text>
              </View>
              <View style={styles.weatherMetric}>
                <Text style={styles.weatherMetricLabel}>Rainfall</Text>
                <Text style={styles.weatherMetricValue}>8.7mm</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
  analyticsSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  analyticsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  analyticsCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  analyticsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  analyticsValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  analyticsLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  mapSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mapControls: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 2,
  },
  mapControlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  mapControlActive: {
    backgroundColor: '#16a34a',
  },
  mapControlText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  mapControlTextActive: {
    color: '#ffffff',
  },
  mapContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    height: 300,
  },
  satelliteImage: {
    width: '100%',
    height: '100%',
  },
  fieldOverlays: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fieldOverlay: {
    position: 'absolute',
    width: 80,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedFieldOverlay: {
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  fieldLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  fieldArea: {
    fontSize: 8,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  mapLegend: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    padding: 12,
    minWidth: 120,
  },
  legendTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 8,
  },
  legendText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  fieldSelection: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  fieldScroll: {
    paddingHorizontal: 20,
  },
  fieldCard: {
    width: 140,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedFieldCard: {
    borderColor: '#16a34a',
  },
  fieldCardHeader: {
    padding: 12,
    alignItems: 'center',
  },
  fieldCardName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  fieldCardArea: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
  },
  fieldCardContent: {
    padding: 12,
  },
  fieldCardSoil: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 4,
  },
  fieldCardCrop: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  fieldDetailsSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  fieldDetailsCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
  },
  fieldDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  fieldDetailsInfo: {
    flex: 1,
  },
  fieldDetailsName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  fieldDetailsArea: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  fieldDetailsStats: {
    flexDirection: 'row',
    gap: 20,
  },
  fieldStat: {
    alignItems: 'center',
  },
  fieldStatLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 2,
  },
  fieldStatValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    textAlign: 'center',
  },
  recommendationSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  recommendationCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recommendationGradient: {
    padding: 24,
  },
  recommendationHeader: {
    marginBottom: 24,
  },
  recommendationTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
  },
  recommendationBreakdown: {
    marginBottom: 24,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  recommendationPercentage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  percentageNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  recommendationDetails: {
    flex: 1,
  },
  recommendationCrop: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 2,
  },
  recommendationDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
  },
  recommendationDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 8,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#16a34a',
  },
  cropsSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cropsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  cropCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cropImage: {
    width: '100%',
    height: 80,
  },
  cropInfo: {
    padding: 12,
  },
  cropName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  cropSeason: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 8,
  },
  cropMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cropYield: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#16a34a',
  },
  cropPrice: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#3b82f6',
  },
  weatherSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 40,
  },
  weatherCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherInfo: {
    flex: 1,
  },
  weatherTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  weatherDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  weatherMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherMetric: {
    alignItems: 'center',
  },
  weatherMetricLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 4,
  },
  weatherMetricValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
});