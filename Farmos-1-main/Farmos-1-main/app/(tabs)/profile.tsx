import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Bell, User, MapPin, Calendar, Award, TrendingUp, Leaf, Shield, Phone, Mail, Plus, CreditCard as Edit3, FileText, CreditCard, Building2, Database, X, Save, ChevronRight, DollarSign, TreePine, Droplets, Thermometer, Truck, Factory, Users, Target } from 'lucide-react-native';

export default function ProfileScreen() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Identity & Legal
    nationalId: 'UK123456789',
    taxId: 'UTR1234567890',
    landOwnership: 'Verified',
    verificationStatus: 'verified',
    
    // Farm Profile
    totalLandArea: '142',
    landParcels: '6',
    soilHealthScore: '85',
    waterSources: '70% Irrigated, 30% Rainfed',
    farmingExperience: '25',
    organicCertification: 'Certified',
    
    // Carbon Credits
    carbonCreditsEarned: '1,250',
    carbonBalance: '850',
    creditPrice: '£45',
    lifetimeEarnings: '£56,250',
    carbonFootprint: '2.8',
    sequestrationRate: '8.8',
    
    // Insurance
    insuranceProvider: 'NFU Mutual',
    policyType: 'Multi-Peril Crop Insurance',
    coverageAmount: '£850,000',
    premiumAmount: '£12,500',
    expiryDate: '2025-03-15',
    
    // Banking
    annualIncome: '£180,000',
    existingDebt: '£45,000',
    creditScore: '785',
    bankingDuration: '15',
    
    // Marketplace
    storageCapacity: '500',
    qualityCertifications: 'Red Tractor, LEAF Marque',
    preferredBuyers: '3 Active Buyers',
  });

  const stats = [
    { icon: Leaf, label: 'Active Fields', value: '6', color: '#16a34a' },
    { icon: TrendingUp, label: 'Yield Increase', value: '+15%', color: '#3b82f6' },
    { icon: Award, label: 'Certifications', value: '4', color: '#f59e0b' },
    { icon: Shield, label: 'Insurance', value: 'Active', color: '#8b5cf6' },
  ];

  const quickActions = [
    { 
      icon: FileText, 
      label: 'Insurance Claim', 
      description: 'Submit new insurance claim',
      color: '#ef4444',
      action: () => setActiveModal('insurance-claim')
    },
    { 
      icon: Building2, 
      label: 'Bank Loan', 
      description: 'Apply for agricultural loan',
      color: '#3b82f6',
      action: () => setActiveModal('bank-loan')
    },
    { 
      icon: Database, 
      label: 'Update Profile', 
      description: 'Manage farm data',
      color: '#16a34a',
      action: () => setActiveModal('profile-data')
    },
  ];

  const dataCategories = [
    {
      title: 'Identity & Legal',
      icon: User,
      color: '#8b5cf6',
      fields: [
        { key: 'nationalId', label: 'National ID', value: formData.nationalId },
        { key: 'taxId', label: 'Tax ID (UTR)', value: formData.taxId },
        { key: 'landOwnership', label: 'Land Ownership', value: formData.landOwnership },
        { key: 'verificationStatus', label: 'Verification Status', value: formData.verificationStatus },
      ]
    },
    {
      title: 'Farm Profile',
      icon: Leaf,
      color: '#16a34a',
      fields: [
        { key: 'totalLandArea', label: 'Total Land Area (ha)', value: formData.totalLandArea },
        { key: 'landParcels', label: 'Number of Parcels', value: formData.landParcels },
        { key: 'soilHealthScore', label: 'Soil Health Score', value: formData.soilHealthScore },
        { key: 'waterSources', label: 'Water Sources', value: formData.waterSources },
        { key: 'farmingExperience', label: 'Experience (years)', value: formData.farmingExperience },
        { key: 'organicCertification', label: 'Organic Status', value: formData.organicCertification },
      ]
    },
    {
      title: 'Carbon Credits & Sustainability',
      icon: TreePine,
      color: '#10b981',
      fields: [
        { key: 'carbonCreditsEarned', label: 'Credits Earned (tonnes CO₂)', value: formData.carbonCreditsEarned },
        { key: 'carbonBalance', label: 'Current Balance', value: formData.carbonBalance },
        { key: 'creditPrice', label: 'Price per Tonne', value: formData.creditPrice },
        { key: 'lifetimeEarnings', label: 'Lifetime Earnings', value: formData.lifetimeEarnings },
        { key: 'carbonFootprint', label: 'Carbon Footprint (t/ha)', value: formData.carbonFootprint },
        { key: 'sequestrationRate', label: 'Sequestration Rate', value: formData.sequestrationRate },
      ]
    },
    {
      title: 'Insurance Profile',
      icon: Shield,
      color: '#ef4444',
      fields: [
        { key: 'insuranceProvider', label: 'Provider', value: formData.insuranceProvider },
        { key: 'policyType', label: 'Policy Type', value: formData.policyType },
        { key: 'coverageAmount', label: 'Coverage Amount', value: formData.coverageAmount },
        { key: 'premiumAmount', label: 'Premium Amount', value: formData.premiumAmount },
        { key: 'expiryDate', label: 'Expiry Date', value: formData.expiryDate },
      ]
    },
    {
      title: 'Banking & Financial',
      icon: CreditCard,
      color: '#3b82f6',
      fields: [
        { key: 'annualIncome', label: 'Annual Income', value: formData.annualIncome },
        { key: 'existingDebt', label: 'Existing Debt', value: formData.existingDebt },
        { key: 'creditScore', label: 'Credit Score', value: formData.creditScore },
        { key: 'bankingDuration', label: 'Banking Relationship (years)', value: formData.bankingDuration },
      ]
    },
    {
      title: 'Marketplace & Trading',
      icon: Truck,
      color: '#f59e0b',
      fields: [
        { key: 'storageCapacity', label: 'Storage Capacity (tonnes)', value: formData.storageCapacity },
        { key: 'qualityCertifications', label: 'Quality Certifications', value: formData.qualityCertifications },
        { key: 'preferredBuyers', label: 'Preferred Buyers', value: formData.preferredBuyers },
      ]
    },
  ];

  const certifications = [
    { name: 'Organic Farming', issuer: 'Soil Association', year: '2023' },
    { name: 'Red Tractor Assured', issuer: 'Red Tractor', year: '2024' },
    { name: 'LEAF Marque', issuer: 'LEAF', year: '2023' },
    { name: 'Carbon Trust Standard', issuer: 'Carbon Trust', year: '2024' },
  ];

  const handleSave = () => {
    Alert.alert('Success', 'Profile data updated successfully');
    setActiveModal(null);
  };

  const handleInsuranceClaim = () => {
    Alert.alert('Insurance Claim', 'Your claim has been submitted. Reference: IC-2024-001');
    setActiveModal(null);
  };

  const handleBankLoan = () => {
    Alert.alert('Loan Application', 'Your loan application has been submitted for review. Reference: BL-2024-001');
    setActiveModal(null);
  };

  const renderModal = () => {
    if (!activeModal) return null;

    return (
      <Modal
        visible={!!activeModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {activeModal === 'insurance-claim' && 'Insurance Claim'}
              {activeModal === 'bank-loan' && 'Bank Loan Application'}
              {activeModal === 'profile-data' && 'Update Profile Data'}
            </Text>
            <TouchableOpacity onPress={() => setActiveModal(null)}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {activeModal === 'insurance-claim' && (
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Claim Details</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Claim Type</Text>
                  <TextInput style={styles.textInput} placeholder="Weather Damage" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Affected Crop</Text>
                  <TextInput style={styles.textInput} placeholder="Winter Wheat" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Affected Area (ha)</Text>
                  <TextInput style={styles.textInput} placeholder="25" keyboardType="numeric" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Estimated Loss (£)</Text>
                  <TextInput style={styles.textInput} placeholder="15,000" keyboardType="numeric" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Description</Text>
                  <TextInput 
                    style={[styles.textInput, styles.textArea]} 
                    placeholder="Describe the damage and circumstances..."
                    multiline
                    numberOfLines={4}
                  />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleInsuranceClaim}>
                  <Text style={styles.submitButtonText}>Submit Claim</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeModal === 'bank-loan' && (
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Loan Application</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Loan Amount (£)</Text>
                  <TextInput style={styles.textInput} placeholder="50,000" keyboardType="numeric" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Loan Purpose</Text>
                  <TextInput style={styles.textInput} placeholder="Equipment Purchase" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Repayment Period (months)</Text>
                  <TextInput style={styles.textInput} placeholder="60" keyboardType="numeric" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Collateral</Text>
                  <TextInput style={styles.textInput} placeholder="Land Title Deed" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Monthly Income (£)</Text>
                  <TextInput style={styles.textInput} placeholder="15,000" keyboardType="numeric" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Business Plan</Text>
                  <TextInput 
                    style={[styles.textInput, styles.textArea]} 
                    placeholder="Describe how the loan will be used and repayment plan..."
                    multiline
                    numberOfLines={4}
                  />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleBankLoan}>
                  <Text style={styles.submitButtonText}>Submit Application</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeModal === 'profile-data' && (
              <View>
                {dataCategories.map((category, index) => (
                  <View key={index} style={styles.categorySection}>
                    <View style={styles.categoryHeader}>
                      <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                        <category.icon size={20} color="#ffffff" />
                      </View>
                      <Text style={styles.categoryTitle}>{category.title}</Text>
                    </View>
                    {category.fields.map((field, fieldIndex) => (
                      <View key={fieldIndex} style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>{field.label}</Text>
                        <TextInput 
                          style={styles.textInput} 
                          value={field.value}
                          onChangeText={(text) => setFormData(prev => ({ ...prev, [field.key]: text }))}
                        />
                      </View>
                    ))}
                  </View>
                ))}
                <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                  <Save size={20} color="#ffffff" />
                  <Text style={styles.submitButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#16a34a', '#15803d', '#166534']}
          style={styles.header}
        >
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop' }}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.profileName}>William Harrison</Text>
            <Text style={styles.profileTitle}>Farm Owner & Manager</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#d1fae5" />
              <Text style={styles.locationText}>Gravesend, Kent</Text>
            </View>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Phone size={14} color="#d1fae5" />
                <Text style={styles.contactText}>+44 1474 567890</Text>
              </View>
              <View style={styles.contactItem}>
                <Mail size={14} color="#d1fae5" />
                <Text style={styles.contactText}>w.harrison@gravesendfarming.co.uk</Text>
              </View>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                  <stat.icon size={20} color="#ffffff" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard} onPress={action.action}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color="#ffffff" />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
                <Text style={styles.quickActionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Farm Overview */}
        <View style={styles.farmOverviewSection}>
          <Text style={styles.sectionTitle}>Farm Overview</Text>
          <View style={styles.farmOverviewCard}>
            <View style={styles.farmStat}>
              <Text style={styles.farmStatNumber}>142</Text>
              <Text style={styles.farmStatLabel}>Total Hectares</Text>
            </View>
            <View style={styles.farmStat}>
              <Text style={styles.farmStatNumber}>£1.8M</Text>
              <Text style={styles.farmStatLabel}>Annual Revenue</Text>
            </View>
            <View style={styles.farmStat}>
              <Text style={styles.farmStatNumber}>1978</Text>
              <Text style={styles.farmStatLabel}>Est. Year</Text>
            </View>
          </View>
        </View>

        {/* Carbon Credits Dashboard */}
        <View style={styles.carbonSection}>
          <Text style={styles.sectionTitle}>Carbon Credits Portfolio</Text>
          <View style={styles.carbonGrid}>
            <View style={styles.carbonCard}>
              <TreePine size={24} color="#10b981" />
              <Text style={styles.carbonValue}>1,250</Text>
              <Text style={styles.carbonLabel}>Credits Earned</Text>
            </View>
            <View style={styles.carbonCard}>
              <DollarSign size={24} color="#16a34a" />
              <Text style={styles.carbonValue}>£56,250</Text>
              <Text style={styles.carbonLabel}>Total Earnings</Text>
            </View>
            <View style={styles.carbonCard}>
              <Target size={24} color="#3b82f6" />
              <Text style={styles.carbonValue}>8.8</Text>
              <Text style={styles.carbonLabel}>t CO₂/ha/year</Text>
            </View>
            <View style={styles.carbonCard}>
              <Leaf size={24} color="#f59e0b" />
              <Text style={styles.carbonValue}>85</Text>
              <Text style={styles.carbonLabel}>Biodiversity Score</Text>
            </View>
          </View>
        </View>

        {/* Risk Analytics */}
        <View style={styles.riskSection}>
          <Text style={styles.sectionTitle}>Risk Analytics</Text>
          <View style={styles.riskCard}>
            <View style={styles.riskHeader}>
              <Text style={styles.riskScore}>78</Text>
              <Text style={styles.riskScoreLabel}>Overall Risk Score</Text>
            </View>
            <View style={styles.riskMetrics}>
              <View style={styles.riskMetric}>
                <Droplets size={16} color="#3b82f6" />
                <Text style={styles.riskMetricLabel}>Weather Risk</Text>
                <Text style={styles.riskMetricValue}>Medium</Text>
              </View>
              <View style={styles.riskMetric}>
                <TrendingUp size={16} color="#16a34a" />
                <Text style={styles.riskMetricLabel}>Market Risk</Text>
                <Text style={styles.riskMetricValue}>Low</Text>
              </View>
              <View style={styles.riskMetric}>
                <Shield size={16} color="#f59e0b" />
                <Text style={styles.riskMetricLabel}>Credit Risk</Text>
                <Text style={styles.riskMetricValue}>Low</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Certifications */}
        <View style={styles.certificationsSection}>
          <Text style={styles.sectionTitle}>Certifications & Compliance</Text>
          <View style={styles.certificationsList}>
            {certifications.map((cert, index) => (
              <View key={index} style={styles.certificationItem}>
                <View style={styles.certificationIcon}>
                  <Award size={20} color="#f59e0b" />
                </View>
                <View style={styles.certificationContent}>
                  <Text style={styles.certificationName}>{cert.name}</Text>
                  <Text style={styles.certificationDetails}>{cert.issuer} • {cert.year}</Text>
                </View>
                <ChevronRight size={16} color="#9ca3af" />
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <FileText size={16} color="#ef4444" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Insurance claim submitted for storm damage</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <TreePine size={16} color="#10b981" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Carbon credits verified - 125 tonnes CO₂</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Building2 size={16} color="#3b82f6" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Loan application approved - £50,000</Text>
                <Text style={styles.activityTime}>3 days ago</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingItem}>
            <Bell size={20} color="#6b7280" />
            <Text style={styles.settingLabel}>Notifications</Text>
            <ChevronRight size={16} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Settings size={20} color="#6b7280" />
            <Text style={styles.settingLabel}>Account Settings</Text>
            <ChevronRight size={16} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {renderModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#ffffff',
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
    marginLeft: 4,
  },
  contactInfo: {
    alignItems: 'center',
    gap: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
    textAlign: 'center',
  },
  quickActionsSection: {
    backgroundColor: '#ffffff',
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  farmOverviewSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  farmOverviewCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
  },
  farmStat: {
    alignItems: 'center',
  },
  farmStatNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#16a34a',
    marginBottom: 4,
  },
  farmStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  carbonSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  carbonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  carbonCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  carbonValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginTop: 8,
    marginBottom: 4,
  },
  carbonLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  riskSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  riskCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
  },
  riskHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  riskScore: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#16a34a',
  },
  riskScoreLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  riskMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  riskMetric: {
    alignItems: 'center',
    flex: 1,
  },
  riskMetricLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 2,
  },
  riskMetricValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  certificationsSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  certificationsList: {
    gap: 12,
  },
  certificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
  },
  certificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  certificationContent: {
    flex: 1,
  },
  certificationName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 2,
  },
  certificationDetails: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  activitySection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  settingsSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formSection: {
    paddingVertical: 20,
  },
  formSectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
});