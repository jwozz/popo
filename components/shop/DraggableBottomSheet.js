import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, FlatList, Animated, PanResponder, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const { height } = Dimensions.get('window');

// Modified snap positions - keeping the bottom position more visible
const SNAP_POSITIONS = {
  TOP: 0,
  MIDDLE: height * 0.4,
  BOTTOM: height * 0.85  // Adjusted to be less hidden (was 0.85)
};

const DraggableBottomSheet = ({ products, onProductSelect }) => {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: SNAP_POSITIONS.MIDDLE })).current;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          y: pan.y._value,
          x: 0
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        pan.flattenOffset();
        
        // Determine which position to snap to
        const posY = pan.y._value;
        const velocity = gesture.vy;
        let snapTo;

        if (velocity > 0.5) {
          // Swiping down fast
          if (posY < SNAP_POSITIONS.MIDDLE) {
            snapTo = SNAP_POSITIONS.MIDDLE;
          } else {
            snapTo = SNAP_POSITIONS.BOTTOM;
          }
        } else if (velocity < -0.5) {
          // Swiping up fast
          if (posY > SNAP_POSITIONS.MIDDLE) {
            snapTo = SNAP_POSITIONS.MIDDLE;
          } else {
            snapTo = SNAP_POSITIONS.TOP;
          }
        } else {
          // Slow drag, snap to closest position
          const distances = [
            { position: SNAP_POSITIONS.TOP, distance: Math.abs(posY - SNAP_POSITIONS.TOP) },
            { position: SNAP_POSITIONS.MIDDLE, distance: Math.abs(posY - SNAP_POSITIONS.MIDDLE) },
            { position: SNAP_POSITIONS.BOTTOM, distance: Math.abs(posY - SNAP_POSITIONS.BOTTOM) }
          ];
          
          distances.sort((a, b) => a.distance - b.distance);
          snapTo = distances[0].position;
        }

        Animated.spring(pan, {
          toValue: { x: 0, y: snapTo },
          useNativeDriver: false,
          friction: 8
        }).start();
      }
    })
  ).current;

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  // Restrict movement to stay within the defined snap positions
  const translateY = pan.y.interpolate({
    inputRange: [SNAP_POSITIONS.TOP - 50, SNAP_POSITIONS.BOTTOM - 20],
    outputRange: [SNAP_POSITIONS.TOP, SNAP_POSITIONS.BOTTOM],
    extrapolate: 'clamp'
  });

  // Height calculation - ensure it doesn't get too small at the bottom position
  const sheetHeight = translateY.interpolate({
    inputRange: [SNAP_POSITIONS.TOP, SNAP_POSITIONS.MIDDLE, SNAP_POSITIONS.BOTTOM],
    outputRange: [height - 60, height * 0.6, height * 0.25], // Minimum height at bottom position
    extrapolate: 'clamp'
  });

  // Keep full opacity at all positions
  const opacity = translateY.interpolate({
    inputRange: [SNAP_POSITIONS.TOP, SNAP_POSITIONS.BOTTOM],
    outputRange: [1, 1],
    extrapolate: 'clamp'
  });

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productItem} 
      onPress={() => onProductSelect(item)}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage} 
        resizeMode="cover" 
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          ${item.price ? (Number(item.price)).toFixed(2) : '0.00'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[
      styles.container,
      { 
        transform: [{ translateY }], 
        height: sheetHeight, 
        opacity 
      }
    ]}>
      <View style={styles.dragHandle} {...panResponder.panHandlers}>
        <View style={styles.dragIndicator} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#757575" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={handleSearch}
            accessibilityLabel="Search products"
          />
        </View>
        
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(246, 246, 246)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 999,
  },
  dragHandle: {
    width: '100%',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dragIndicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#DEDEDE'
  },
  content: {
    flex: 1,
    padding: 16
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingVertical: 8
  },
  listContent: {
    paddingBottom: 20
  },
  productItem: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    overflow: 'hidden'
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#EFEFEF'
  },
  productInfo: {
    padding: 12
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4
  },
  productPrice: {
    fontSize: 14,
    color: '#666'
  }
});

export default DraggableBottomSheet;