import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Users, Search, Filter, MapPin, Phone, Mail, TrendingUp, Calendar, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Farmer {
  id: string;
  name: string;
  location: string;
  acres: number;
  crops: string[];
  phone: string;
  email: string;
  status: 'Interested' | 'Signed' | 'Follow-up' | 'Not Interested';
  lastContact: string;
  potentialRevenue: number;
  image: string;
}

const farmers: Farmer[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Karnal, Haryana',
    acres: 45,
    crops: ['Rice', 'Wheat'],
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    status: 'Interested',
    lastContact: '2 hours ago',
    potentialRevenue: 281250,
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Suresh Singh',
    location: 'Kurukshetra, Haryana',
    acres: 67,
    crops: ['Rice', 'Sugarcane'],
    phone: '+91 98765 43211',
    email: 'suresh.singh@email.com',
    status: 'Signed',
    lastContact: '4 hours ago',
    potentialRevenue: 418750,
    image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Amit Sharma',
    location: 'Kaithal, Haryana',
    acres: 32,
    crops: ['Wheat', 'Cotton'],
    phone: '+91 98765 43212',
    email: 'amit.sharma@email.com',
    status: 'Follow-up',
    lastContact: '1 day ago',
    potentialRevenue: 200000,
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Vikram Yadav',
    location: 'Ambala, Haryana',
    acres: 89,
    crops: ['Rice', 'Wheat', 'Sugarcane'],
    phone: '+91 98765 43213',
    email: 'vikram.yadav@email.com',
    status: 'Interested',
    lastContact: '2 days ago',
    potentialRevenue: 556250,
    image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Pradeep Joshi',
    location: 'Yamunanagar, Haryana',
    acres: 23,
    crops: ['Rice', 'Wheat'],
    phone: '+91 98765 43214',
    email: 'pradeep.joshi@email.com',
    status: 'Not Interested',
    lastContact: '1 week ago',
    potentialRevenue: 143750,
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
];

export default function FarmersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'acres' | 'revenue'>('name');

  const statusOptions = ['All', 'Interested', 'Signed', 'Follow-up', 'Not Interested'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed': return '#4CAF50';
      case 'Interested': return '#FF9800';
      case 'Follow-up': return '#2196F3';
      case 'Not Interested': return '#F44336';
      default: return '#795548';
    }
  };

  const filteredFarmers = farmers
    .filter(farmer => 
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(farmer => selectedStatus === 'All' || farmer.status === selectedStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case 'acres': return b.acres - a.acres;
        case 'revenue': return b.potentialRevenue - a.potentialRevenue;
        default: return a.name.localeCompare(b.name);
      }
    });

  const totalStats = {
    totalFarmers: farmers.length,
    totalAcres: farmers.reduce((sum, f) => sum + f.acres, 0),
    totalRevenue: farmers.reduce((sum, f) => sum + f.potentialRevenue, 0),
    signedFarmers: farmers.filter(f => f.status === 'Signed').length,
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <LinearGradient
        colors={['#2E7D32', '#4CAF50']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Farmer Database</Text>
        <Text style={styles.headerSubtitle}>Manage your farmer relationships and track progress</Text>
        
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalStats.totalFarmers}</Text>
            <Text style={styles.statLabel}>Total Farmers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalStats.totalAcres}</Text>
            <Text style={styles.statLabel}>Total Acres</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalStats.signedFarmers}</Text>
            <Text style={styles.statLabel}>Signed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>₹{(totalStats.totalRevenue / 100000).toFixed(1)}L</Text>
            <Text style={styles.statLabel}>Potential Revenue</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search and Filter */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#795548" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search farmers by name or location..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.filtersContainer}>
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Status:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusFilters}>
                {statusOptions.map(status => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusFilter,
                      selectedStatus === status && styles.statusFilterActive
                    ]}
                    onPress={() => setSelectedStatus(status)}
                  >
                    <Text style={[
                      styles.statusFilterText,
                      selectedStatus === status && styles.statusFilterTextActive
                    ]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Sort by:</Text>
              <View style={styles.sortButtons}>
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'acres', label: 'Acres' },
                  { key: 'revenue', label: 'Revenue' }
                ].map(option => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.sortButton,
                      sortBy === option.key && styles.sortButtonActive
                    ]}
                    onPress={() => setSortBy(option.key as any)}
                  >
                    <Text style={[
                      styles.sortButtonText,
                      sortBy === option.key && styles.sortButtonTextActive
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Farmers List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Farmers ({filteredFarmers.length})</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Farmer</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.farmersGrid}>
            {filteredFarmers.map(farmer => (
              <TouchableOpacity key={farmer.id} style={styles.farmerCard}>
                <Image
                  source={{ uri: farmer.image }}
                  style={styles.farmerImage}
                  resizeMode="cover"
                />
                
                <View style={styles.farmerInfo}>
                  <View style={styles.farmerHeader}>
                    <Text style={styles.farmerName}>{farmer.name}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(farmer.status) }]}>
                      <Text style={styles.statusBadgeText}>{farmer.status}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.farmerDetails}>
                    <View style={styles.farmerDetailItem}>
                      <MapPin size={16} color="#795548" />
                      <Text style={styles.farmerDetailText}>{farmer.location}</Text>
                    </View>
                    
                    <View style={styles.farmerDetailItem}>
                      <TrendingUp size={16} color="#795548" />
                      <Text style={styles.farmerDetailText}>{farmer.acres} acres</Text>
                    </View>
                    
                    <View style={styles.farmerDetailItem}>
                      <Calendar size={16} color="#795548" />
                      <Text style={styles.farmerDetailText}>Last contact: {farmer.lastContact}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.cropsContainer}>
                    <Text style={styles.cropsLabel}>Crops:</Text>
                    <View style={styles.cropsList}>
                      {farmer.crops.map((crop, index) => (
                        <View key={index} style={styles.cropTag}>
                          <Text style={styles.cropTagText}>{crop}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  
                  <View style={styles.revenueContainer}>
                    <Text style={styles.revenueLabel}>Potential Annual Revenue:</Text>
                    <Text style={styles.revenueValue}>₹{farmer.potentialRevenue.toLocaleString()}</Text>
                  </View>
                  
                  <View style={styles.farmerActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Phone size={16} color="#2E7D32" />
                      <Text style={styles.actionButtonText}>Call</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <Mail size={16} color="#2E7D32" />
                      <Text style={styles.actionButtonText}>Email</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.actionButton, styles.primaryActionButton]}>
                      <Text style={[styles.actionButtonText, styles.primaryActionButtonText]}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Users size={28} color="#2E7D32" />
              <Text style={styles.quickActionTitle}>Bulk Import</Text>
              <Text style={styles.quickActionText}>Import farmer data from CSV</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <TrendingUp size={28} color="#2E7D32" />
              <Text style={styles.quickActionTitle}>Analytics</Text>
              <Text style={styles.quickActionText}>View farmer engagement metrics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <Mail size={28} color="#2E7D32" />
              <Text style={styles.quickActionTitle}>Bulk Email</Text>
              <Text style={styles.quickActionText}>Send updates to all farmers</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <Filter size={28} color="#2E7D32" />
              <Text style={styles.quickActionTitle}>Advanced Filter</Text>
              <Text style={styles.quickActionText}>Create custom farmer segments</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FDD835',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  filtersContainer: {
    gap: 16,
  },
  filterGroup: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
  },
  statusFilters: {
    flexDirection: 'row',
  },
  statusFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  statusFilterActive: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  statusFilterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#795548',
  },
  statusFilterTextActive: {
    color: '#FFFFFF',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sortButtonActive: {
    backgroundColor: '#FDD835',
    borderColor: '#FDD835',
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#795548',
  },
  sortButtonTextActive: {
    color: '#2E7D32',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  farmersGrid: {
    gap: 20,
  },
  farmerCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  farmerImage: {
    width: '100%',
    height: 120,
  },
  farmerInfo: {
    padding: 20,
  },
  farmerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  farmerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  farmerDetails: {
    gap: 8,
    marginBottom: 16,
  },
  farmerDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  farmerDetailText: {
    fontSize: 14,
    color: '#795548',
  },
  cropsContainer: {
    marginBottom: 16,
  },
  cropsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  cropsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cropTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cropTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E7D32',
  },
  revenueContainer: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  revenueLabel: {
    fontSize: 14,
    color: '#795548',
    marginBottom: 4,
  },
  revenueValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
  },
  farmerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E7D32',
    gap: 8,
  },
  primaryActionButton: {
    backgroundColor: '#2E7D32',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
  },
  primaryActionButtonText: {
    color: '#FFFFFF',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  quickActionCard: {
    backgroundColor: '#F8F9FA',
    width: width > 768 ? '23%' : '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionText: {
    fontSize: 12,
    color: '#795548',
    textAlign: 'center',
  },
});