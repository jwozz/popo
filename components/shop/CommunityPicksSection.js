import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { styles } from '../../styles/shopScreenStyles';

const CommunityPicksSection = ({ products, onProductPress }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Community Picks</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsRow}
      >
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onPress={() => onProductPress(product)} 
          />
        ))}
      </ScrollView>
    </View>
  );
};

const ProductCard = ({ product, onPress }) => {
  const handleLikePress = (event) => {
    // Stop propagation to prevent triggering the card press
    event.stopPropagation();
    // You could implement like functionality here
    console.log(`Liked product: ${product.name}`);
  };

  return (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={onPress}
      accessibilityLabel={`${product.name}, ${product.price}`}
      accessibilityRole="button"
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.imageUrl }} 
          style={styles.productImage}
          resizeMode="cover"
          accessibilityLabel={product.name}
        />
        <TouchableOpacity 
          style={styles.heartButton}
          onPress={handleLikePress}
          accessibilityLabel="Like product"
          accessibilityRole="button"
        >
          <Ionicons name="heart" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        {product.artist && (
          <Text style={styles.productArtist}>by {product.artist}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CommunityPicksSection;