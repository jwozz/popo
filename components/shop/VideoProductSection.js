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
        
        {/* Seller Profile Overlay at Top */}
        <View style={styles.sellerOverlay}>
          <View style={styles.sellerContainer}>
            <Image
              source={{ uri: videoItem.sellerAvatar }}
              style={styles.sellerAvatar}
              accessibilityLabel={`${videoItem.sellerName}'s profile picture`}
            />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>{videoItem.sellerName}</Text>
              <Text style={styles.sellerLocation}>{videoItem.location}</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Ionicons name="add" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Products Overlay at Bottom */}
        <View style={styles.productsOverlay}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.videoProductsList}
          >
            {videoItem.products.map(product => (
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
                <View style={styles.productInfoContainer}>
                  <Text style={styles.videoProductName} numberOfLines={1}>{product.name}</Text>
                  <View style={styles.priceAddContainer}>
                    <Text style={styles.videoProductPrice}>{product.price}</Text>
                    <TouchableOpacity style={styles.addToCartButton}>
                      <Ionicons name="cart" size={14} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <TouchableOpacity
          style={styles.playButton}
          accessibilityLabel="Play video"
          accessibilityRole="button"
        >
          <Ionicons name="play-circle" size={40} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoProductSection;