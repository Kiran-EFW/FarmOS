import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Save, MapPin, Droplets, Wheat, Mountain, Calculator, TrendingUp, DollarSign } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface FarmData {
  farmerName: string;
  farmSize: string;
  location: string;
  soilType: string;
  currentCrops: string;
  irrigationType: string;
  annualResidue: string;
  contactNumber: string;
  email: string;
}

export default function FarmDataScreen() {
  const [farmData, setFarmData] = useState<FarmData>({
    farmerName: '',
    farmSize: '',
    location: '',
    soilType: '',
    currentCrops: '',
    irrigationType: '',
    annualResidue: '',
    contactNumber: '',
    email: '',
  });

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Farmer Information', fields: ['farmerName', 'contactNumber', 'email'] },
    { title: 'Farm Details', fields: ['farmSize', 'location', 'soilType'] },
    { title: 'Crop Information', fields: ['currentCrops', 'irrigationType', 'annualResidue'] },
  ];

  useEffect(() => {
    const filledFields = Object.values(farmData).filter(value => value.trim() !== '').length;
    const totalFields = Object.keys(farmData).length;
    setProgress((filledFields / totalFields) * 100);
  }, [farmData]);

  const updateField = (field: keyof FarmData, value: string) => {
    setFarmData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePotentialRevenue = () => {
    const farmSizeNum = parseFloat(farmData.farmSize) || 0;
    const residuePerAcre = 2.5; // tons per acre average
    const pricePerTon = 2500;
    const totalResidue = farmSizeNum * residuePerAcre;
    const annualRevenue = totalResidue * pricePerTon;
    const monthlyRevenue = annualRevenue / 12;
    return { totalResidue: totalResidue.toFixed(1), annualRevenue, monthlyRevenue };
  };

  const saveFarmData = () => {
    if (!farmData.farmerName || !farmData.farmSize) {
      Alert.alert('Missing Information', 'Please fill in farmer name and farm size at minimum.');
      return;
    }
    
    Alert.alert(
      'Data Saved Successfully',
      'Farm data has been saved and is ready for analysis.',
      [{ text: 'OK' }]
    );
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const { totalResidue, annualRevenue, monthlyRevenue } = calculatePotentialRevenue();

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContent}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.stepImage}
              resizeMode="cover"
            />
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Farmer Name *</Text>
              <TextInput
                style={styles.textInput}
                value={farmData.farmerName}
                onChangeText={(value) => updateField('farmerName', value)}
                placeholder="Enter farmer's full name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contact Number</Text>
              <TextInput
                style={styles.textInput}
                value={farmData.contactNumber}
                onChangeText={(value) => updateField('contactNumber', value)}
                placeholder="Enter contact number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                value={farmData.email}
                onChangeText={(value) => updateField('email', value)}
                placeholder="Enter email address"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContent}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.stepImage}
              resizeMode="cover"
            />
            
            <View style={styles.inputGroup}>
              <View style={styles.labelWithIcon}>
                <Mountain size={20} color="#2E7D32" />
                <Text style={styles.inputLabel}>Farm Size (Acres) *</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={farmData.farmSize}
                onChangeText={(value) => updateField('farmSize', value)}
                placeholder="Enter farm size in acres"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelWithIcon}>
                <MapPin size={20} color="#2E7D32" />
                <Text style={styles.inputLabel}>Location</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={farmData.location}
                onChangeText={(value) => updateField('location', value)}
                placeholder="Village, District"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Soil Type</Text>
              <View style={styles.optionContainer}>
                {['Loamy', 'Clay', 'Sandy', 'Alluvial', 'Black Cotton'].map((soil) => (
                  <TouchableOpacity
                    key={soil}
                    style={[
                      styles.optionButton,
                      farmData.soilType === soil && styles.optionButtonActive
                    ]}
                    onPress={() => updateField('soilType', soil)}
                  >
                    <Text style={[
                      styles.optionText,
                      farmData.soilType === soil && styles.optionTextActive
                    ]}>
                      {soil}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.stepImage}
              resizeMode="cover"
            />
            
            <View style={styles.inputGroup}>
              <View style={styles.labelWithIcon}>
                <Wheat size={20} color="#2E7D32" />
                <Text style={styles.inputLabel}>Current Crops</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value={farmData.currentCrops}
                onChangeText={(value) => updateField('currentCrops', value)}
                placeholder="Rice, Wheat, Sugarcane, etc."
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelWithIcon}>
                <Droplets size={20} color="#2E7D32" />
                <Text style={styles.inputLabel}>Irrigation Type</Text>
              </View>
              <View style={styles.optionContainer}>
                {['Canal', 'Tubewell', 'Drip', 'Sprinkler', 'Rainfed'].map((irrigation) => (
                  <TouchableOpacity
                    key={irrigation}
                    style={[
                      styles.optionButton,
                      farmData.irrigationType === irrigation && styles.optionButtonActive
                    ]}
                    onPress={() => updateField('irrigationType', irrigation)}
                  >
                    <Text style={[
                      styles.optionText,
                      farmData.irrigationType === irrigation && styles.optionTextActive
                    ]}>
                      {irrigation}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Annual Crop Residue (Tons)</Text>
              <TextInput
                style={styles.textInput}
                value={farmData.annualResidue}
                onChangeText={(value) => updateField('annualResidue', value)}
                placeholder="Estimated annual residue in tons"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <LinearGradient
        colors={['#2E7D32', '#4CAF50']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Farm Data Collection</Text>
        <Text style={styles.headerSubtitle}>Enter farm details for personalized analysis</Text>
        
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressSteps}>
            {steps.map((step, index) => (
              <View key={index} style={styles.progressStep}>
                <View style={[
                  styles.progressStepCircle,
                  index <= currentStep && styles.progressStepCircleActive
                ]}>
                  <Text style={[
                    styles.progressStepNumber,
                    index <= currentStep && styles.progressStepNumberActive
                  ]}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={styles.progressStepLabel}>{step.title}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>Completion: {progress.toFixed(0)}%</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Step Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{steps[currentStep].title}</Text>
          {renderStepContent()}
        </View>

        {/* Revenue Preview */}
        {farmData.farmSize && (
          <View style={styles.previewCard}>
            <LinearGradient
              colors={['#E8F5E8', '#F1F8E9']}
              style={styles.previewGradient}
            >
              <View style={styles.previewHeader}>
                <Calculator size={24} color="#2E7D32" />
                <Text style={styles.previewTitle}>Revenue Potential Preview</Text>
              </View>
              
              <View style={styles.previewStats}>
                <View style={styles.previewStat}>
                  <TrendingUp size={20} color="#2E7D32" />
                  <Text style={styles.previewStatValue}>{totalResidue} tons/year</Text>
                  <Text style={styles.previewStatLabel}>Estimated Residue</Text>
                </View>
                
                <View style={styles.previewStat}>
                  <DollarSign size={20} color="#2E7D32" />
                  <Text style={styles.previewStatValue}>₹{annualRevenue.toLocaleString()}</Text>
                  <Text style={styles.previewStatLabel}>Annual Revenue</Text>
                </View>
                
                <View style={styles.previewStat}>
                  <DollarSign size={20} color="#2E7D32" />
                  <Text style={styles.previewStatValue}>₹{monthlyRevenue.toLocaleString()}</Text>
                  <Text style={styles.previewStatLabel}>Monthly Income</Text>
                </View>
              </View>
              
              <Text style={styles.previewNote}>
                *Based on 2.5 tons residue per acre at ₹2,500 per ton
              </Text>
            </LinearGradient>
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.navButton} onPress={prevStep}>
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          {currentStep < steps.length - 1 ? (
            <TouchableOpacity style={[styles.navButton, styles.navButtonPrimary]} onPress={nextStep}>
              <Text style={[styles.navButtonText, styles.navButtonTextPrimary]}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.saveButton} onPress={saveFarmData}>
              <Save size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save Farm Data</Text>
            </TouchableOpacity>
          )}
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
    marginBottom: 30,
  },
  progressContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressStepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressStepCircleActive: {
    backgroundColor: '#FDD835',
  },
  progressStepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressStepNumberActive: {
    color: '#2E7D32',
  },
  progressStepLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FDD835',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
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
    fontSize: 22,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  stepContent: {
    gap: 20,
  },
  stepImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
    marginLeft: 8,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  optionButtonActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  optionText: {
    fontSize: 14,
    color: '#795548',
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  previewCard: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  previewGradient: {
    padding: 24,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
    marginLeft: 12,
  },
  previewStats: {
    flexDirection: width > 768 ? 'row' : 'column',
    gap: 16,
    marginBottom: 16,
  },
  previewStat: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
  },
  previewStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
    marginTop: 8,
    marginBottom: 4,
  },
  previewStatLabel: {
    fontSize: 12,
    color: '#795548',
    textAlign: 'center',
  },
  previewNote: {
    fontSize: 12,
    color: '#795548',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    gap: 16,
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2E7D32',
    alignItems: 'center',
  },
  navButtonPrimary: {
    backgroundColor: '#2E7D32',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  navButtonTextPrimary: {
    color: '#FFFFFF',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});