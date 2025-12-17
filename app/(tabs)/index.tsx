import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [total, setTotal] = useState(0);
  const [firstClickDate, setFirstClickDate] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const [daysElapsed, setDaysElapsed] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const savedTotal = await AsyncStorage.getItem('total');
      if (savedTotal !== null) setTotal(parseInt(savedTotal));
      const savedFirstClick = await AsyncStorage.getItem('firstClickDate');
      if (savedFirstClick !== null) {
        const parsedDate = parseInt(savedFirstClick);
        setFirstClickDate(parsedDate);
        setDaysElapsed((Date.now() - parsedDate) / (1000 * 60 * 60 * 24));
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      setDaysElapsed(d => d + 1 / 86400);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const incrementTotal = async () => {
    const newTotal = total + 1;
    setTotal(newTotal);
    await AsyncStorage.setItem('total', newTotal.toString());

    if (firstClickDate === null) {
      const now = Date.now();
      setFirstClickDate(now);
      await AsyncStorage.setItem('firstClickDate', now.toString());
    }
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
          <View style={styles.rewardTable}>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 100</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 100 ? '⭐' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 120</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 120 ? '🌟' : ''}
              </ThemedText>
            </View>
          </View>
          <ThemedText style={styles.countText}>Count: {total}</ThemedText>
          <ThemedText style={styles.percentageText}>Percentage of 1 Million: {((total / 1000000) * 100).toFixed(4)} %</ThemedText>
          <TouchableOpacity onPress={incrementTotal} style={styles.button}>
            <ThemedText style={styles.buttonText}>Add more clicks</ThemedText>
          </TouchableOpacity>
          <ThemedView style={styles.statsContainer}>
            <ThemedText style={styles.statsText}>
              Days since first click: {daysElapsed.toFixed(5)} DAYS
            </ThemedText>
            <ThemedText style={styles.statsText}>
              Average clicks per day: {daysElapsed > 0 ? (total / daysElapsed).toFixed(2) : 0} CLICKS
            </ThemedText>
          </ThemedView>
          <TouchableOpacity onPress={clearTotal} style={[styles.button, styles.clearButton]}>
            <ThemedText style={styles.clearButtonText}>Clear Counter</ThemedText>
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
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  clearButtonText: {
    color: 'white',
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
    padding: 15,
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
    color: "#78058fff",
    fontSize: 17,
    fontWeight: '300',
  },
  rewardText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
  },
  rewardTable: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rewardDesc: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    marginRight: 16,
    color: 'white',
  },
  rewardBadge: {
    fontSize: 24,
    minWidth: 40,
    textAlign: 'right',
  },
  heading: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 4,
    paddingTop: 20,
  },
  statsContainer: {
    gap: 8,
    backgroundColor: 'transparent',
  },
  statsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'normal',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
