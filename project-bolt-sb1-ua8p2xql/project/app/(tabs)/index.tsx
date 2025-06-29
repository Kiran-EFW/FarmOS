import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Leaf, TrendingUp, Users, DollarSign, Zap, Shield, ArrowRight, ChartBar as BarChart3, FileText, Database } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const quickStats = [
    { icon: Zap, value: '300 MW', label: 'Power Capacity', color: '#2E7D32' },
    { icon: DollarSign, value: '₹6,500', label: 'Per Acre Income', color: '#FDD835' },
    { icon: TrendingUp, value: '18.5%', label: 'Project IRR', color: '#795548' },
    { icon: Users, value: '1,200+', label: 'Jobs Created', color: '#2E7D32' },
  ];

  const recentActivities = [
    { farmer: 'Rajesh Kumar', location: 'Karnal', acres: 45, status: 'Interested', time: '2 hours ago' },
    { farmer: 'Suresh Singh', location: 'Kurukshetra', acres: 67, status: 'Signed', time: '4 hours ago' },
    { farmer: 'Amit Sharma', location: 'Kaithal', acres: 32, status: 'Follow-up', time: '1 day ago' },
    { farmer: 'Vikram Yadav', location: 'Ambala', acres: 89, status: 'Interested', time: '2 days ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed': return '#4CAF50';
      case 'Interested': return '#FF9800';
      case 'Follow-up': return '#2196F3';
      default: return '#795548';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Hero Section */}
      <LinearGradient
        colors={['#2E7D32', '#4CAF50', '#66BB6A']}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <View style={styles.logoContainer}>
            <Leaf size={40} color="#FDD835" />
            <Text style={styles.logoText}>AgriPitch Pro</Text>
          </View>
          
          <Text style={styles.heroTitle}>Transform Agricultural Waste</Text>
          <Text style={styles.heroSubtitle}>
            Help farmers convert crop residue into ₹2,500/ton revenue through our 300MW syngas power project
          </Text>
          
          <View style={styles.heroImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroImageOverlay}>
              <Text style={styles.heroImageText}>Haryana's Green Revolution</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Overview</Text>
          <View style={styles.statsGrid}>
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <View key={index} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                    <IconComponent size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Key Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Benefits for Farmers</Text>
          <View style={styles.benefitsContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.benefitsImage}
              resizeMode="cover"
            />
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <DollarSign size={20} color="#FFFFFF" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Additional Revenue Stream</Text>
                  <Text style={styles.benefitDescription}>
                    Convert crop residue into ₹2,500 per ton instead of burning
                  </Text>
                </View>
              </View>
              
              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Leaf size={20} color="#FFFFFF" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Environmental Impact</Text>
                  <Text style={styles.benefitDescription}>
                    Reduce air pollution and earn carbon credits
                  </Text>
                </View>
              </View>
              
              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Shield size={20} color="#FFFFFF" />
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Guaranteed Contracts</Text>
                  <Text style={styles.benefitDescription}>
                    10-year feedstock supply agreements with fixed pricing
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Database size={28} color="#2E7D32" />
              <Text style={styles.actionTitle}>New Farm Entry</Text>
              <Text style={styles.actionDescription}>Add farmer data and calculate potential</Text>
              <ArrowRight size={16} color="#795548" style={styles.actionArrow} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <BarChart3 size={28} color="#2E7D32" />
              <Text style={styles.actionTitle}>Revenue Analysis</Text>
              <Text style={styles.actionDescription}>View detailed ROI projections</Text>
              <ArrowRight size={16} color="#795548" style={styles.actionArrow} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <FileText size={28} color="#2E7D32" />
              <Text style={styles.actionTitle}>Generate Report</Text>
              <Text style={styles.actionDescription}>Create farmer presentation</Text>
              <ArrowRight size={16} color="#795548" style={styles.actionArrow} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Farmer Interactions</Text>
          <View style={styles.activitiesContainer}>
            {recentActivities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityFarmer}>{activity.farmer}</Text>
                  <Text style={styles.activityDetails}>
                    {activity.location} • {activity.acres} acres
                  </Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <View style={[styles.activityStatus, { backgroundColor: getStatusColor(activity.status) }]}>
                  <Text style={styles.activityStatusText}>{activity.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Technology Showcase */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technology Showcase</Text>
          <View style={styles.technologyContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.technologyImage}
              resizeMode="cover"
            />
            <View style={styles.technologyContent}>
              <Text style={styles.technologyTitle}>IGCC Technology</Text>
              <Text style={styles.technologyDescription}>
                Our Integrated Gasification Combined Cycle technology converts agricultural residue 
                into clean electricity with 48% efficiency, making it the optimal solution for 
                Haryana's agricultural waste management.
              </Text>
              <View style={styles.technologyStats}>
                <View style={styles.techStat}>
                  <Text style={styles.techStatValue}>48%</Text>
                  <Text style={styles.techStatLabel}>Efficiency</Text>
                </View>
                <View style={styles.techStat}>
                  <Text style={styles.techStatValue}>25 Acres</Text>
                  <Text style={styles.techStatLabel}>Land Required</Text>
                </View>
                <View style={styles.techStat}>
                  <Text style={styles.techStatValue}>95%</Text>
                  <Text style={styles.techStatLabel}>Reliability</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <LinearGradient
            colors={['#FDD835', '#FBC02D']}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaTitle}>Ready to Start Your Next Pitch?</Text>
            <Text style={styles.ctaDescription}>
              Help more farmers discover the potential of agricultural waste conversion
            </Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Start New Farm Analysis</Text>
              <ArrowRight size={20} color="#2E7D32" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  heroSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#E8F5E8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    maxWidth: 600,
  },
  heroImageContainer: {
    width: '100%',
    maxWidth: 500,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
  },
  heroImageText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
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
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#795548',
    textAlign: 'center',
  },
  benefitsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  benefitsImage: {
    width: '100%',
    height: 200,
  },
  benefitsList: {
    padding: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  benefitIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#2E7D32',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#795548',
    lineHeight: 20,
  },
  actionGrid: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: 16,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    flex: width > 768 ? 1 : undefined,
    padding: 24,
    borderRadius: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 12,
    marginBottom: 8,
  },
  actionDescription: {
    fontSize: 14,
    color: '#795548',
    lineHeight: 20,
  },
  actionArrow: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  activitiesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityInfo: {
    flex: 1,
  },
  activityFarmer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 14,
    color: '#795548',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  activityStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activityStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  technologyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  technologyImage: {
    width: '100%',
    height: 240,
  },
  technologyContent: {
    padding: 24,
  },
  technologyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 12,
  },
  technologyDescription: {
    fontSize: 14,
    color: '#795548',
    lineHeight: 22,
    marginBottom: 20,
  },
  technologyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  techStat: {
    alignItems: 'center',
  },
  techStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  techStatLabel: {
    fontSize: 12,
    color: '#795548',
  },
  ctaSection: {
    marginBottom: 40,
  },
  ctaGradient: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaDescription: {
    fontSize: 16,
    color: '#795548',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 400,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginRight: 8,
  },
});