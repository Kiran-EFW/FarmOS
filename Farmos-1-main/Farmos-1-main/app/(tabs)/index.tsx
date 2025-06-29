import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Mic, CloudRain, Thermometer, Droplets, Wind, Sunrise, Sunset, TrendingUp, TrendingDown, Clock, Star, MapPin } from 'lucide-react-native';

export default function HomeScreen() {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const weeklyForecast = [
    { day: 'Today', temp: '8°C', condition: 'Cloudy', icon: '☁️', rain: '70%' },
    { day: 'Tomorrow', temp: '11°C', condition: 'Light Rain', icon: '🌦️', rain: '80%' },
    { day: 'Wed', temp: '6°C', condition: 'Rainy', icon: '🌧️', rain: '90%' },
    { day: 'Thu', temp: '9°C', condition: 'Partly Cloudy', icon: '⛅', rain: '40%' },
    { day: 'Fri', temp: '12°C', condition: 'Overcast', icon: '☁️', rain: '60%' },
  ];

  const cropRecommendations = [
    { 
      name: 'Winter Wheat', 
      image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=200&h=120&fit=crop',
      season: 'Plant Now',
      yield: 'High'
    },
    { 
      name: 'Winter Barley', 
      image: 'https://images.pexels.com/photos/221016/pexels-photo-221016.jpeg?auto=compress&cs=tinysrgb&w=200&h=120&fit=crop',
      season: 'Ideal Season',
      yield: 'Medium'
    },
    { 
      name: 'Oil Seed Rape', 
      image: 'https://images.pexels.com/photos/162209/rapeseed-field-yellow-nature-162209.jpeg?auto=compress&cs=tinysrgb&w=200&h=120&fit=crop',
      season: 'Spring Ready',
      yield: 'High'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#16a34a', '#15803d', '#166534']}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good Morning, Farmer</Text>
              <Text style={styles.date}>{currentDate}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#d1fae5" />
                <Text style={styles.location}>Gravesend, Kent</Text>
              </View>
            </View>
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }}
                style={styles.profileImage}
              />
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Search size={20} color="#64748b" />
            <Text style={styles.searchPlaceholder}>Search crops, weather, advice...</Text>
            <TouchableOpacity>
              <Mic size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Current Weather Card */}
          <View style={styles.weatherCard}>
            <View style={styles.weatherHeader}>
              <View>
                <Text style={styles.locationText}>Gravesend, Kent</Text>
                <View style={styles.temperatureRow}>
                  <Text style={styles.temperature}>+8°C</Text>
                  <View style={styles.tempRange}>
                    <Text style={styles.tempRangeText}>H: 11°C</Text>
                    <Text style={styles.tempRangeText}>L: 4°C</Text>
                  </View>
                </View>
              </View>
              <View style={styles.weatherIcon}>
                <CloudRain size={40} color="#fbbf24" />
                <Text style={styles.weatherCondition}>Cloudy</Text>
              </View>
            </View>

            {/* Weather Details */}
            <View style={styles.weatherDetails}>
              <View style={styles.weatherDetailItem}>
                <Text style={styles.weatherDetailLabel}>Humidity</Text>
                <Text style={styles.weatherDetailValue}>82%</Text>
              </View>
              <View style={styles.weatherDetailItem}>
                <Text style={styles.weatherDetailLabel}>Rainfall</Text>
                <Text style={styles.weatherDetailValue}>8.7mm</Text>
              </View>
              <View style={styles.weatherDetailItem}>
                <Text style={styles.weatherDetailLabel}>Pressure</Text>
                <Text style={styles.weatherDetailValue}>1018 hPa</Text>
              </View>
              <View style={styles.weatherDetailItem}>
                <Text style={styles.weatherDetailLabel}>Wind</Text>
                <Text style={styles.weatherDetailValue}>12 mph</Text>
              </View>
            </View>

            {/* Sun Times */}
            <View style={styles.sunTimes}>
              <View style={styles.sunTimeItem}>
                <Text style={styles.sunTime}>7:58 am</Text>
                <Text style={styles.sunLabel}>Sunrise</Text>
              </View>
              <View style={styles.sunPath}>
                <View style={styles.sunPathLine} />
                <View style={styles.sunPosition} />
              </View>
              <View style={styles.sunTimeItem}>
                <Text style={styles.sunTime}>3:52 pm</Text>
                <Text style={styles.sunLabel}>Sunset</Text>
              </View>
            </View>

            {/* Farming Advice */}
            <View style={styles.farmingAdvice}>
              <Text style={styles.adviceText}>
                🌾 Good conditions for winter wheat establishment. Thames Estuary climate ideal for root development in heavy clay soils.
              </Text>
            </View>
          </View>

          {/* 5-Day Forecast */}
          <View style={styles.forecastSection}>
            <Text style={styles.sectionTitle}>5-Day Weather Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastScroll}>
              {weeklyForecast.map((day, index) => (
                <View key={index} style={styles.forecastCard}>
                  <Text style={styles.forecastDay}>{day.day}</Text>
                  <Text style={styles.forecastIcon}>{day.icon}</Text>
                  <Text style={styles.forecastTemp}>{day.temp}</Text>
                  <Text style={styles.forecastRain}>💧 {day.rain}</Text>
                  <Text style={styles.forecastCondition}>{day.condition}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Farm Analytics */}
          <View style={styles.analyticsSection}>
            <Text style={styles.sectionTitle}>Farm Analytics</Text>
            <View style={styles.analyticsGrid}>
              <TouchableOpacity style={styles.analyticsItem}>
                <View style={[styles.analyticsIcon, { backgroundColor: '#3b82f6' }]}>
                  <TrendingUp size={24} color="#ffffff" />
                </View>
                <Text style={styles.analyticsLabel}>Yield Forecast</Text>
                <Text style={styles.analyticsValue}>+15%</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.analyticsItem}>
                <View style={[styles.analyticsIcon, { backgroundColor: '#10b981' }]}>
                  <Droplets size={24} color="#ffffff" />
                </View>
                <Text style={styles.analyticsLabel}>Soil Moisture</Text>
                <Text style={styles.analyticsValue}>High</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.analyticsItem}>
                <View style={[styles.analyticsIcon, { backgroundColor: '#f59e0b' }]}>
                  <Clock size={24} color="#ffffff" />
                </View>
                <Text style={styles.analyticsLabel}>Harvest Time</Text>
                <Text style={styles.analyticsValue}>4 weeks</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.analyticsItem}>
                <View style={[styles.analyticsIcon, { backgroundColor: '#16a34a' }]}>
                  <Star size={24} color="#ffffff" />
                </View>
                <Text style={styles.analyticsLabel}>Crop Health</Text>
                <Text style={styles.analyticsValue}>Good</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Crop Recommendations */}
          <View style={styles.cropsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended Crops for Kent</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cropsScroll}>
              {cropRecommendations.map((crop, index) => (
                <TouchableOpacity key={index} style={styles.cropCard}>
                  <Image
                    source={{ uri: crop.image }}
                    style={styles.cropImage}
                  />
                  <View style={styles.cropInfo}>
                    <Text style={styles.cropName}>{crop.name}</Text>
                    <Text style={styles.cropSeason}>{crop.season}</Text>
                    <View style={styles.cropYield}>
                      <Text style={styles.cropYieldText}>Yield: {crop.yield}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Market Prices */}
          <View style={styles.marketSection}>
            <Text style={styles.sectionTitle}>UK Market Prices</Text>
            <View style={styles.marketGrid}>
              <View style={styles.marketItem}>
                <Text style={styles.marketCrop}>Wheat</Text>
                <Text style={styles.marketPrice}>£195/tonne</Text>
                <Text style={styles.marketChange}>+1.8%</Text>
              </View>
              <View style={styles.marketItem}>
                <Text style={styles.marketCrop}>Barley</Text>
                <Text style={styles.marketPrice}>£175/tonne</Text>
                <Text style={styles.marketChange}>-0.5%</Text>
              </View>
              <View style={styles.marketItem}>
                <Text style={styles.marketCrop}>OSR</Text>
                <Text style={styles.marketPrice}>£445/tonne</Text>
                <Text style={styles.marketChange}>+3.1%</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
    marginLeft: 4,
  },
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
  },
  weatherCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 8,
  },
  temperatureRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  temperature: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginRight: 16,
  },
  tempRange: {
    alignItems: 'flex-start',
  },
  tempRangeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 18,
  },
  weatherIcon: {
    alignItems: 'center',
  },
  weatherCondition: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 4,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  weatherDetailItem: {
    alignItems: 'center',
  },
  weatherDetailLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 4,
  },
  weatherDetailValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  sunTimes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sunTimeItem: {
    alignItems: 'center',
  },
  sunTime: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  sunLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  sunPath: {
    flex: 1,
    height: 2,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 20,
    borderRadius: 1,
    position: 'relative',
  },
  sunPathLine: {
    position: 'absolute',
    left: 0,
    right: '60%',
    height: 2,
    backgroundColor: '#fbbf24',
    borderRadius: 1,
  },
  sunPosition: {
    position: 'absolute',
    right: '60%',
    top: -4,
    width: 10,
    height: 10,
    backgroundColor: '#fbbf24',
    borderRadius: 5,
  },
  farmingAdvice: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
  },
  adviceText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    lineHeight: 20,
  },
  forecastSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  forecastScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  forecastCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  forecastDay: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    marginBottom: 8,
  },
  forecastIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  forecastTemp: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  forecastRain: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
    marginBottom: 4,
  },
  forecastCondition: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
    textAlign: 'center',
  },
  analyticsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  analyticsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  analyticsItem: {
    alignItems: 'center',
    width: '22%',
  },
  analyticsIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  analyticsLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  analyticsValue: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  cropsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#d1fae5',
  },
  cropsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  cropCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cropImage: {
    width: '100%',
    height: 100,
  },
  cropInfo: {
    padding: 12,
  },
  cropName: {
    fontSize: 16,
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
  cropYield: {
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  cropYieldText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#16a34a',
  },
  marketSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  marketGrid: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
  },
  marketItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  marketCrop: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    flex: 1,
  },
  marketPrice: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  marketChange: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#d1fae5',
    flex: 1,
    textAlign: 'right',
  },
});