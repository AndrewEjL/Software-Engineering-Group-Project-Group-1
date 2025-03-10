import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUser, ScheduledPickup, ListedItem } from '../contexts/UserContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  PickupDetails: { pickupId: string };
};

type PickupDetailsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PickupDetails'>;
  route: RouteProp<RootStackParamList, 'PickupDetails'>;
};

const LoadingIcon: React.FC = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      spinValue.setValue(0);
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    startRotation();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Icon name="sync" size={24} color="#666" />
    </Animated.View>
  );
};

const PickupDetails: React.FC<PickupDetailsProps> = ({ navigation, route }) => {
  const { pickupId } = route.params;
  const { getPickupDetails, getListedItems } = useUser();
  const [pickup, setPickup] = useState<ScheduledPickup | null>(null);
  const [listedItems, setListedItems] = useState<ListedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPickupDetails();
  }, [pickupId]);

  const loadPickupDetails = async () => {
    setIsLoading(true);
    try {
      const details = await getPickupDetails(pickupId);
      if (details) {
        setPickup(details);
        // Get all listed items and filter the ones that belong to this pickup
        const allListedItems = await getListedItems();
        const pickupListedItems = allListedItems.filter(item => 
          details.listedItemIds.includes(item.id)
        );
        setListedItems(pickupListedItems);
      }
    } catch (error) {
      console.error('Error loading pickup details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Pickup List</Text>
        <View style={styles.headerRight} />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <LoadingIcon />
        </View>
      ) : pickup ? (
        <ScrollView style={styles.content}>
          {/* Facility Name */}
          <View style={styles.facilityContainer}>
            <Text style={styles.facilityLabel}>Facility</Text>
            <Text style={styles.facilityName}>{pickup.facilityName}</Text>
          </View>

          {/* Items List */}
          <View style={styles.itemsContainer}>
            <Text style={styles.itemsLabel}>Items</Text>
            {listedItems.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSubtext}>
                    {item.type} • {item.condition}
                  </Text>
                  <Text style={styles.itemDimensions}>
                    Dimensions: {item.dimensions.length}×{item.dimensions.width}×{item.dimensions.height} cm
                  </Text>
                  <Text style={styles.itemQuantity}>
                    Quantity: {item.quantity}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Pickup not found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerRight: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  facilityContainer: {
    marginBottom: 24,
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
  },
  facilityLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  facilityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemsContainer: {
    flex: 1,
  },
  itemsLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  itemCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemDimensions: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
  },
});

export default PickupDetails; 