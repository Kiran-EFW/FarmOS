import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FileText, Download, Share, Eye, Presentation as PresentationChart, Calculator, Printer, ChartBar as BarChart3 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration: string;
  sections: string[];
  image: string;
}

const reportTemplates: ReportTemplate[] = [
  {
    id: 'farmer-pitch',
    title: 'Farmer Pitch Presentation',
    description: 'Complete presentation for individual farmers including ROI calculations and implementation timeline',
    icon: PresentationChart,
    duration: '15-20 slides',
    sections: ['Farm Analysis', 'Revenue Projections', 'Implementation Plan', 'Contract Terms', 'Next Steps'],
    image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'roi-analysis',
    title: 'ROI Analysis Report',
    description: 'Detailed financial analysis with cost-benefit breakdown and payback calculations',
    icon: Calculator,
    duration: '8-10 pages',
    sections: ['Cost Structure', '5-Year Projections', 'Risk Analysis', 'Sensitivity Analysis', 'Recommendations'],
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'technical-spec',
    title: 'Technical Specification',
    description: 'Technical details of the syngas conversion process and infrastructure requirements',
    icon: FileText,
    duration: '12-15 pages',
    sections: ['Technology Overview', 'Process Flow', 'Equipment Specs', 'Quality Requirements', 'Safety Protocols'],
    image: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'comparison-report',
    title: 'Technology Comparison',
    description: 'Side-by-side comparison of different agricultural residue utilization options',
    icon: Eye,
    duration: '6-8 pages',
    sections: ['Option Analysis', 'Cost Comparison', 'Efficiency Metrics', 'Risk Assessment', 'Recommendations'],
    image: 'https://images.pexels.com/photos/162568/factory-plant-industrial-power-162568.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export default function ReportsScreen() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [generatingReport, setGeneratingReport] = useState(false);

  const generateReport = async (templateId: string) => {
    setGeneratingReport(true);
    setSelectedTemplate(templateId);
    
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReport(false);
      Alert.alert(
        'Report Generated Successfully',
        'Your personalized report is ready. In a real implementation, this would open the PDF or presentation.',
        [
          { text: 'View Report', onPress: () => console.log('View report') },
          { text: 'Share', onPress: () => console.log('Share report') },
          { text: 'OK' }
        ]
      );
    }, 2000);
  };

  const recentReports = [
    { farmer: 'Rajesh Kumar', location: 'Karnal', acres: 45, status: 'Generated', time: '2 hours ago', type: 'Farmer Pitch' },
    { farmer: 'Suresh Singh', location: 'Kurukshetra', acres: 67, status: 'Shared', time: '4 hours ago', type: 'ROI Analysis' },
    { farmer: 'Amit Sharma', location: 'Kaithal', acres: 32, status: 'Downloaded', time: '1 day ago', type: 'Technical Spec' },
    { farmer: 'Vikram Yadav', location: 'Ambala', acres: 89, status: 'Generated', time: '2 days ago', type: 'Comparison' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated': return '#4CAF50';
      case 'Shared': return '#2196F3';
      case 'Downloaded': return '#FF9800';
      default: return '#795548';
    }
  };

  const StatsCard = () => (
    <View style={styles.statsCard}>
      <LinearGradient
        colors={['#2E7D32', '#4CAF50']}
        style={styles.statsGradient}
      >
        <Text style={styles.statsTitle}>📊 Report Generation Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Reports This Month</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>89%</Text>
            <Text style={styles.statLabel}>Conversion Rate</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Total Farmers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>₹47L</Text>
            <Text style={styles.statLabel}>Revenue Potential</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <LinearGradient
        colors={['#2E7D32', '#4CAF50']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Reports & Presentations</Text>
        <Text style={styles.headerSubtitle}>Generate personalized farmer presentations</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <StatsCard />

        {/* Generate New Report */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generate New Report</Text>
          <View style={styles.templatesGrid}>
            {reportTemplates.map(template => {
              const IconComponent = template.icon;
              return (
                <TouchableOpacity
                  key={template.id}
                  style={[
                    styles.templateCard,
                    selectedTemplate === template.id && generatingReport && styles.templateCardGenerating
                  ]}
                  onPress={() => generateReport(template.id)}
                  disabled={generatingReport}
                >
                  <Image
                    source={{ uri: template.image }}
                    style={styles.templateImage}
                    resizeMode="cover"
                  />
                  
                  <View style={styles.templateContent}>
                    <View style={styles.templateHeader}>
                      <View style={styles.templateIcon}>
                        <IconComponent size={24} color="#2E7D32" />
                      </View>
                      <Text style={styles.templateDuration}>{template.duration}</Text>
                    </View>
                    
                    <Text style={styles.templateTitle}>{template.title}</Text>
                    <Text style={styles.templateDescription}>{template.description}</Text>
                    
                    <View style={styles.templateSections}>
                      <Text style={styles.templateSectionsTitle}>Includes:</Text>
                      {template.sections.slice(0, 3).map((section, index) => (
                        <Text key={index} style={styles.templateSection}>• {section}</Text>
                      ))}
                      {template.sections.length > 3 && (
                        <Text style={styles.templateSection}>• +{template.sections.length - 3} more</Text>
                      )}
                    </View>
                    
                    <View style={styles.templateFooter}>
                      {generatingReport && selectedTemplate === template.id ? (
                        <View style={styles.generatingIndicator}>
                          <Text style={styles.generatingText}>Generating...</Text>
                        </View>
                      ) : (
                        <View style={styles.generateButton}>
                          <Text style={styles.generateButtonText}>Generate Report</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recent Reports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          <View style={styles.recentReportsContainer}>
            {recentReports.map((report, index) => (
              <View key={index} style={styles.recentReportItem}>
                <View style={styles.recentReportInfo}>
                  <Text style={styles.recentReportTitle}>{report.farmer} - {report.type}</Text>
                  <Text style={styles.recentReportDetails}>
                    {report.location} • {report.acres} acres
                  </Text>
                  <Text style={styles.recentReportTime}>{report.time}</Text>
                </View>
                <View style={styles.recentReportActions}>
                  <View style={[styles.recentReportStatus, { backgroundColor: getStatusColor(report.status) }]}>
                    <Text style={styles.recentReportStatusText}>{report.status}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Eye size={18} color="#2E7D32" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Share size={18} color="#2E7D32" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Download size={18} color="#2E7D32" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Printer size={28} color="#2E7D32" />
              <Text style={styles.quickActionTitle}>Bulk Print</Text>
              <Text style={styles.quickActionText}>Print multiple reports</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <Share size={28} color="#2E7D32" />
              <Text style={styles.quickActionTitle}>Share Template</Text>
              <Text style={styles.quickActionText}>Share with team</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <Download size={28} color="#2E7D32" />
              <Text style={styles.quickActionTitle}>Export Data</Text>
              <Text style={styles.quickActionText}>Download all reports</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <BarChart3 size={28} color="#2E7D32" />
              <Text style={styles.quickActionTitle}>Analytics</Text>
              <Text style={styles.quickActionText}>View report metrics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Report Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Report Insights</Text>
          <View style={styles.insightsContainer}>
            <View style={styles.insightCard}>
              <Text style={styles.insightTitle}>🎯 Most Effective Presentations</Text>
              <Text style={styles.insightText}>
                Farmer Pitch Presentations have the highest conversion rate (89%) when including 
                personalized ROI calculations and local success stories.
              </Text>
            </View>
            
            <View style={styles.insightCard}>
              <Text style={styles.insightTitle}>⏱️ Optimal Presentation Length</Text>
              <Text style={styles.insightText}>
                15-20 slide presentations perform best, with farmers spending average 8 minutes 
                reviewing financial projections section.
              </Text>
            </View>
            
            <View style={styles.insightCard}>
              <Text style={styles.insightTitle}>🔑 Key Decision Factors</Text>
              <Text style={styles.insightText}>
                Top 3 factors influencing farmer decisions: 1) Guaranteed contract terms, 
                2) Per-acre revenue increase, 3) Environmental impact reduction.
              </Text>
            </View>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsCard: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsGradient: {
    padding: 24,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: '45%',
  },
  statNumber: {
    fontSize: 24,
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
  templatesGrid: {
    gap: 20,
  },
  templateCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  templateCardGenerating: {
    backgroundColor: '#E8F5E8',
    borderColor: '#2E7D32',
    borderWidth: 2,
  },
  templateImage: {
    width: '100%',
    height: 120,
  },
  templateContent: {
    padding: 20,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  templateIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  templateDuration: {
    fontSize: 12,
    color: '#795548',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    fontWeight: '600',
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 8,
  },
  templateDescription: {
    fontSize: 14,
    color: '#795548',
    lineHeight: 20,
    marginBottom: 16,
  },
  templateSections: {
    marginBottom: 20,
  },
  templateSectionsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 8,
  },
  templateSection: {
    fontSize: 12,
    color: '#795548',
    marginBottom: 4,
  },
  templateFooter: {
    alignItems: 'center',
  },
  generateButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  generateButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  generatingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  generatingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
  },
  recentReportsContainer: {
    gap: 16,
  },
  recentReportItem: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  recentReportInfo: {
    flex: 1,
  },
  recentReportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  recentReportDetails: {
    fontSize: 14,
    color: '#795548',
    marginBottom: 4,
  },
  recentReportTime: {
    fontSize: 12,
    color: '#999',
  },
  recentReportActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  recentReportStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recentReportStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  insightsContainer: {
    gap: 16,
  },
  insightCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FDD835',
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 12,
  },
  insightText: {
    fontSize: 14,
    color: '#795548',
    lineHeight: 20,
  },
});