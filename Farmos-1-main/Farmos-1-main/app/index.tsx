import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Eye, EyeOff, Mail, Lock, Leaf, TrendingUp, CloudRain, ChartBar as BarChart3, Users, Shield, ArrowRight, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function LandingScreen() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: CloudRain,
      title: 'Weather Intelligence',
      description: 'Real-time weather data and forecasting tailored for your location',
      color: '#3b82f6'
    },
    {
      icon: TrendingUp,
      title: 'Yield Optimization',
      description: 'AI-powered insights to maximize your crop yields and profitability',
      color: '#16a34a'
    },
    {
      icon: BarChart3,
      title: 'Farm Analytics',
      description: 'Comprehensive data analysis and reporting for informed decisions',
      color: '#f59e0b'
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Connect with agricultural experts and fellow farmers',
      color: '#8b5cf6'
    },
    {
      icon: Shield,
      title: 'Crop Protection',
      description: 'Advanced pest and disease monitoring with early warning systems',
      color: '#ef4444'
    },
    {
      icon: Leaf,
      title: 'Sustainable Farming',
      description: 'Tools and guidance for environmentally responsible agriculture',
      color: '#10b981'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      location: 'Yorkshire Dales',
      quote: 'FarmOS increased our wheat yield by 18% in the first season. The weather predictions are incredibly accurate.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'David Thompson',
      location: 'Norfolk',
      quote: 'The analytics dashboard gives me insights I never had before. It\'s like having an agricultural consultant 24/7.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Emma Clarke',
      location: 'Devon',
      quote: 'Sustainable farming practices recommended by FarmOS helped us achieve organic certification.',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleDemoLogin = () => {
    setEmail('w.harrison@gravesendfarming.co.uk');
    setPassword('demo123');
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 500);
  };

  if (showLogin) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#16a34a', '#15803d', '#166534']}
          style={styles.loginGradient}
        >
          <ScrollView contentContainerStyle={styles.loginScrollContainer}>
            {/* Header */}
            <View style={styles.loginHeader}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => setShowLogin(false)}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              
              <View style={styles.logoContainer}>
                <View style={styles.logoIcon}>
                  <Leaf size={32} color="#ffffff" />
                </View>
                <Text style={styles.logoText}>FarmOS</Text>
                <Text style={styles.logoSubtext}>Intelligence for every Acre</Text>
              </View>
            </View>

            {/* Login Form */}
            <View style={styles.loginForm}>
              <Text style={styles.loginTitle}>Welcome Back</Text>
              <Text style={styles.loginSubtitle}>Sign in to your farming dashboard</Text>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Mail size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email address"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Lock size={20} color="#6b7280" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#6b7280" />
                    ) : (
                      <Eye size={20} color="#6b7280" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.demoButton}
                onPress={handleDemoLogin}
              >
                <Text style={styles.demoButtonText}>Try Demo Account</Text>
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#16a34a', '#15803d', '#166534']}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <View style={styles.heroLogo}>
              <Leaf size={48} color="#ffffff" />
            </View>
            <Text style={styles.heroTitle}>FarmOS</Text>
            <Text style={styles.heroSubtitle}>Intelligence for every Acre</Text>
            <Text style={styles.heroDescription}>
              Transform your farming operations with AI-powered insights, real-time weather data, 
              and precision agriculture tools designed for modern farmers.
            </Text>
            
            <View style={styles.heroButtons}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => setShowLogin(true)}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
                <ArrowRight size={20} color="#16a34a" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={handleDemoLogin}
              >
                <Text style={styles.secondaryButtonText}>Try Demo</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Hero Image */}
          <View style={styles.heroImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop' }}
              style={styles.heroImage}
            />
            <View style={styles.heroImageOverlay}>
              <View style={styles.statsCard}>
                <Text style={styles.statsNumber}>25%</Text>
                <Text style={styles.statsLabel}>Yield Increase</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Powerful Features for Modern Farming</Text>
          <Text style={styles.sectionSubtitle}>
            Everything you need to optimize your farm operations and maximize productivity
          </Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                  <feature.icon size={24} color="#ffffff" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <LinearGradient
            colors={['#f8fafc', '#ffffff']}
            style={styles.benefitsGradient}
          >
            <Text style={styles.sectionTitle}>Why Choose FarmOS?</Text>
            
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <CheckCircle size={24} color="#16a34a" />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Increase Yields by up to 25%</Text>
                  <Text style={styles.benefitDescription}>
                    Data-driven insights help optimize planting, fertilization, and harvesting
                  </Text>
                </View>
              </View>
              
              <View style={styles.benefitItem}>
                <CheckCircle size={24} color="#16a34a" />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Reduce Costs by 15%</Text>
                  <Text style={styles.benefitDescription}>
                    Precision agriculture reduces waste and optimizes resource usage
                  </Text>
                </View>
              </View>
              
              <View style={styles.benefitItem}>
                <CheckCircle size={24} color="#16a34a" />
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>Save 10+ Hours Weekly</Text>
                  <Text style={styles.benefitDescription}>
                    Automated monitoring and reporting streamline farm management
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Testimonials Section */}
        <View style={styles.testimonialsSection}>
          <Text style={styles.sectionTitle}>Trusted by Farmers Across the UK</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonialsScroll}>
            {testimonials.map((testimonial, index) => (
              <View key={index} style={styles.testimonialCard}>
                <Text style={styles.testimonialQuote}>"{testimonial.quote}"</Text>
                <View style={styles.testimonialAuthor}>
                  <Image
                    source={{ uri: testimonial.image }}
                    style={styles.testimonialImage}
                  />
                  <View>
                    <Text style={styles.testimonialName}>{testimonial.name}</Text>
                    <Text style={styles.testimonialLocation}>{testimonial.location}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CTA Section */}
        <LinearGradient
          colors={['#16a34a', '#15803d']}
          style={styles.ctaSection}
        >
          <Text style={styles.ctaTitle}>Ready to Transform Your Farm?</Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands of farmers who are already using FarmOS to optimize their operations
          </Text>
          
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => setShowLogin(true)}
          >
            <Text style={styles.ctaButtonText}>Start Your Journey</Text>
            <ArrowRight size={20} color="#16a34a" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <Leaf size={24} color="#16a34a" />
            <Text style={styles.footerLogoText}>FarmOS</Text>
          </View>
          <Text style={styles.footerText}>
            © 2024 FarmOS. Intelligence for every Acre.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Hero Section
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
  },
  heroContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#d1fae5',
    marginBottom: 20,
  },
  heroDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#16a34a',
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  heroImageContainer: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  heroImageOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#16a34a',
  },
  statsLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },

  // Features Section
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  featureCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Benefits Section
  benefitsSection: {
    marginVertical: 20,
  },
  benefitsGradient: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  benefitsList: {
    gap: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
  },

  // Testimonials Section
  testimonialsSection: {
    paddingVertical: 60,
  },
  testimonialsScroll: {
    paddingLeft: 20,
  },
  testimonialCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    marginRight: 16,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  testimonialQuote: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
    lineHeight: 24,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  testimonialImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  testimonialName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  testimonialLocation: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },

  // CTA Section
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#16a34a',
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  footerLogoText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#16a34a',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },

  // Login Styles
  loginGradient: {
    flex: 1,
  },
  loginScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  logoSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#d1fae5',
  },
  loginForm: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  loginTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#16a34a',
  },
  loginButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  demoButton: {
    backgroundColor: '#f8fafc',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  demoButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#16a34a',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  signupLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#16a34a',
  },
});