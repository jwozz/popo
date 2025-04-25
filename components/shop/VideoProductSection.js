import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { styles } from '../../styles/shopScreenStyles';

const VideoProductSection = ({ videoProducts, onProductPress }) => {
  if (!videoProducts || videoProducts.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Updates</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsRow}
      >
        {videoProducts.map(videoItem => (
          <VideoCard 
            key={videoItem.id} 
            videoItem={videoItem} 
            onProductPress={onProductPress} 
          />
        ))}
      </ScrollView>
    </View>
  );
};

const VideoCard = ({ videoItem, onProductPress }) => {
  return (
    <View style={styles.videoCard}>
      <View style={styles.videoContainer}>
        <Image 
          source={{ uri: videoItem.thumbnailUrl }} 
          style={styles.videoThumbnail}
          resizeMode="cover"
          accessibilityLabel={`Video by ${videoItem.sellerName}`}
        />
        <TouchableOpacity 
          style={styles.playButton}
          accessibilityLabel="Play video"
          accessibilityRole="button"
        >
          <Ionicons name="play-circle" size={40} color="#ffffff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.videoInfoContainer}>
        <SellerInfo seller={videoItem} />
        <VideoProducts products={videoItem.products} onProductPress={onProductPress} />
      </View>
    </View>
  );
};

const SellerInfo = ({ seller }) => (
  <View style={styles.sellerContainer}>
    <Image 
      source={{ uri: seller.sellerAvatar }} 
      style={styles.sellerAvatar} 
      accessibilityLabel={`${seller.sellerName}'s profile picture`}
    />
    <View style={styles.sellerInfo}>
      <Text style={styles.sellerName}>{seller.sellerName}</Text>
      <Text style={styles.sellerLocation}>{seller.location}</Text>
    </View>
  </View>
);

const VideoProducts = ({ products, onProductPress }) => (
  <View style={styles.videoProductsContainer}>
    <Text style={styles.videoProductsLabel}>Products in Video</Text>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.videoProductsList}
    >
      {products.map(product => (
        <TouchableOpacity 
          key={product.id} 
          style={styles.videoProductItem}
          onPress={() => onProductPress(product)}
          accessibilityLabel={`${product.name}, ${product.price}`}
          accessibilityRole="button"
        >
          <Image 
            source={{ uri: product.imageUrl }} 
            style={styles.videoProductThumbnail} 
            accessibilityLabel={product.name}
          />
          <Text style={styles.videoProductName} numberOfLines={1}>{product.name}</Text>
          <Text style={styles.videoProductPrice}>{product.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

export default VideoProductSection;