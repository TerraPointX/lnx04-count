import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

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
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <ThemedText style={styles.heading}>COUNT TO ONE MILLION!</ThemedText>
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
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 150</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 150 ? '🌱' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 160</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 160 ? '🍎' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 170</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 170 ? '🔧' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 180</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 180 ? '🛡️' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 190</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 190 ? '🪓' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 200</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 200 ? '⚔️' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 210</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 210 ? '🏰' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 220</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 220 ? '👑' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 230</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 230 ? '✨' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 240</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 240 ? '💫' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 250</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 250 ? '🚀' : ''}
              </ThemedText>
            </View>
            <View style={styles.rewardRow}>
              <ThemedText style={styles.rewardDesc}>Ave clicks above 260</ThemedText>
              <ThemedText style={styles.rewardBadge}>
                {daysElapsed > 0 && (total / daysElapsed) > 260 ? '👽' : ''}
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity onPress={clearTotal} style={[styles.button, styles.clearButton]}>
            <ThemedText style={styles.clearButtonText}>Clear Counter</ThemedText>
          </TouchableOpacity>
        </ScrollView>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 50,
    gap: 40,
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
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'transparent',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
  },
  countText: {
    color: '#333',
    fontSize: 48,
    fontWeight: 'bold',
    paddingVertical: 10,
    lineHeight: 60,
    textAlignVertical: 'center',
  },
  percentageText: {
    color: "#57435fff",
    marginTop: -50,
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
    marginBottom: 31,
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
