import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, TouchableOpacity } from 'react-native';

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
    <LinearGradient
      colors={['#FF24F8', '#24CCFF']}
      locations={[0, 0.6]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <ThemedText style={styles.heading}>COUNT TO ONE MILLION!</ThemedText>
      <ThemedView style={styles.centerContent}>
        <ThemedText style={styles.text}>Your count so far: {total}</ThemedText>
        <ThemedText style={styles.text}>Percentage complete: {((total / 1000000) * 100).toFixed(6)}%</ThemedText>
        <TouchableOpacity onPress={incrementTotal} style={styles.button}>
          <ThemedText>Add 1</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearTotal} style={[styles.button, styles.clearButton]}>
          <ThemedText>Clear Counter</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    paddingTop: 60,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'transparent',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
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
