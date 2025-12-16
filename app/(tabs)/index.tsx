import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadTotal = async () => {
      const savedTotal = await AsyncStorage.getItem('total');
      if (savedTotal !== null) setTotal(parseInt(savedTotal));
    };
    loadTotal();
  }, []);

  const incrementTotal = async () => {
    const newTotal = total + 1;
    setTotal(newTotal);
    await AsyncStorage.setItem('total', newTotal.toString());
  };

  const clearTotal = () => {
    console.log('Clear button pressed');
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to reset the counter to 0?')) {
        console.log('Reset confirmed, setting total to 0');
        setTotal(0);
        AsyncStorage.setItem('total', '0');
      }
    } else {
      Alert.alert(
        'Reset Counter',
        'Are you sure you want to reset the counter to 0?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Reset',
            style: 'destructive',
            onPress: () => {
              console.log('Reset confirmed, setting total to 0');
              setTotal(0);
              AsyncStorage.setItem('total', '0');
            },
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#FF24F8', '#24CCFF']}
        locations={[0, 0.6]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <ThemedText style={styles.heading}>COUNT TO ONE MILLION!</ThemedText>
        <ThemedView style={styles.centerContent}>
          <ThemedText style={styles.countText}>Count: {total}</ThemedText>
          <ThemedText style={styles.percentageText}>Percentage: {((total / 1000000) * 100).toFixed(4)}%</ThemedText>
          <TouchableOpacity onPress={incrementTotal} style={styles.button}>
            <ThemedText style={styles.buttonText}>Add more clicks</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearTotal} style={[styles.button, styles.clearButton]}>
            <ThemedText>Clear Counter</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    paddingTop: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    backgroundColor: 'transparent',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  countText: {
    color: '#333',
    fontSize: 48,
    fontWeight: 'bold',
    paddingVertical: 20,
    lineHeight: 88,
    textAlignVertical: 'center',
  },
  percentageText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '300',
  },
  heading: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
