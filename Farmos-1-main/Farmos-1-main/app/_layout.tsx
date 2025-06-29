import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Load ElevenLabs voice assistant on web platform
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Load the ElevenLabs script
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      
      script.onload = () => {
        // Create the voice assistant element
        const voiceElement = document.createElement('elevenlabs-convai');
        voiceElement.setAttribute('agent-id', 'agent_01jyvs1141f1atpvnq0yvkffys');
        
        // Apply custom styling for farming context
        voiceElement.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(22, 163, 74, 0.3);
          transition: all 0.3s ease;
        `;
        
        document.body.appendChild(voiceElement);
      };

      document.head.appendChild(script);

      return () => {
        // Cleanup
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        // Remove voice assistant element
        const voiceElement = document.querySelector('elevenlabs-convai');
        if (voiceElement && voiceElement.parentNode) {
          voiceElement.parentNode.removeChild(voiceElement);
        }
      };
    }
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}