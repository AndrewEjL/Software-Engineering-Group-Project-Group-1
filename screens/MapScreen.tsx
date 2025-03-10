import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';

type RootStackParamList = {
  MapScreen: {
    itemData: {
      name: string;
      type: string;
      condition: string;
      dimensions: {
        length: string;
        width: string;
        height: string;
      };
      quantity: string;
    };
  };
  Home: undefined;
};

type MapScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MapScreen'>;
  route: RouteProp<RootStackParamList, 'MapScreen'>;
};

const MapScreen: React.FC<MapScreenProps> = ({ navigation, route }) => {
  const { itemData } = route.params;
  const { listItem } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleListItem = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the listItem function from UserContext
      const success = await listItem({
        name: itemData.name,
        type: itemData.type,
        condition: itemData.condition,
        dimensions: itemData.dimensions,
        quantity: itemData.quantity
      });
      
      if (success) {
        // Navigate back to home screen on success
        navigation.navigate('Home');
      } else {
        setError('Failed to list item. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error listing item:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
      </View>

      {/* Map Container (placeholder) */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapPlaceholder}>Map will be displayed here</Text>
        
        {/* Item Details */}
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemDetailsTitle}>Item Details:</Text>
          <Text style={styles.itemDetail}>Name: {itemData.name}</Text>
          <Text style={styles.itemDetail}>Type: {itemData.type}</Text>
          <Text style={styles.itemDetail}>Condition: {itemData.condition}</Text>
          <Text style={styles.itemDetail}>Dimensions: {itemData.dimensions.length} x {itemData.dimensions.width} x {itemData.dimensions.height}</Text>
          <Text style={styles.itemDetail}>Quantity: {itemData.quantity}</Text>
        </View>
      </View>

      {/* Error message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* List Item Button */}
      <TouchableOpacity 
        style={styles.listButton}
        onPress={handleListItem}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.listButtonText}>List Item</Text>
        )}
      </TouchableOpacity>
    </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  mapPlaceholder: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  itemDetailsContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    marginTop: 20,
  },
  itemDetailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemDetail: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  listButton: {
    backgroundColor: '#5E4DCD',
    paddingVertical: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  listButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MapScreen; 