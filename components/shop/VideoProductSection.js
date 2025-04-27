import React from 'react';
import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { styles } from '../../styles/shopScreenStyles';

const { width, height } = Dimensions.get('window');

const VideoProductSection = ({ videoProducts, onProductPress }) => {
  if (!videoProducts || videoProducts.length === 0) {
    return null;
  }
  
  // Calculate card width for exact sizing
  const cardWidth = Math.min(width * 0.8, 320);
  const snapInterval = cardWidth + 20; // Card width + margin
  
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Updates</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={videoProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.cardWrapper, { width: cardWidth }]}>
            <VideoCard 
              videoItem={item} 
              onProductPress={onProductPress} 
              width={cardWidth}
              height={height}
              isNextCard={index !== 0} // Pass if this is not the first card
            />
            {/* Card Footer - Width constrained to match card exactly */}
            <View style={[styles.cardFooter, { width: cardWidth }]}>
              {/* Left side - Profile thumbnails and comments */}
              <View style={styles.footerLeft}>
                <View style={styles.profileThumbnails}>
                  <Image 
                    source={{ uri: item.commenters?.[0]?.avatar || item.sellerAvatar }} 
                    style={styles.commentThumbnail}
                  />
                  <Image 
                    source={{ uri: item.commenters?.[1]?.avatar || item.sellerAvatar }} 
                    style={[styles.commentThumbnail, styles.commentThumbnailOverlap]}
                  />
                </View>
                <Text style={styles.commentCount}>{item.commentCount || 5} comments</Text>
              </View>
              
              {/* Right side - Reaction icon */}
              <TouchableOpacity style={styles.reactionButton}>
                <Ionicons name="heart-outline" size={24} color="#26a69a" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        snapToAlignment="start"
        snapToInterval={snapInterval}
        decelerationRate="fast"
        pagingEnabled={false}
      />
    </View>
  );
};

const VideoCard = ({ videoItem, onProductPress, width, height, isNextCard }) => {
  // Calculate card height to ensure everything fits
  const cardHeight = Math.min(height * 0.65, 450);
  
  // Apply reduced height and different style for non-first cards
  const modifiedHeight = isNextCard ? cardHeight * 0.9 : cardHeight;
  
  // Use styles directly but override dimensions-dependent styles
  const cardStyle = {
    ...styles.videoCard,
    width: width,
    height: modifiedHeight,
    // Add blur effect to non-first cards
    opacity: isNextCard ? 0.35 : 1,
  };
  
  return (
    <View style={cardStyle}>
      <View style={styles.videoContainer}>
        {/* Video Thumbnail */}
        <Image
          source={{ uri: videoItem.thumbnailUrl }}
          style={[
            styles.videoThumbnail,
            isNextCard && styles.blurredThumbnail
          ]}
          resizeMode="cover"
          accessibilityLabel={`Video by ${videoItem.sellerName}`}
        />
        
        {/* Blur overlay for next cards */}
        {isNextCard && <View style={styles.blurOverlay} />}
        
        {/* Play Button */}
        <TouchableOpacity
          style={styles.playButton}
          accessibilityLabel="Play video"
          accessibilityRole="button"
        >
          <Ionicons name="play-circle" size={40} color="#ffffff" />
        </TouchableOpacity>
        
        {/* Seller Profile */}
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
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Products - Floating in the video without background */}
        <View style={styles.productsOverlay}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.videoProductsList}
            nestedScrollEnabled={true}
          >
            {videoItem.products.map(product => (
              <View key={product.id} style={styles.videoProductItem}>
                <Image
                  source={{ uri: product.imageUrl }}
                  style={styles.videoProductThumbnail}
                  accessibilityLabel={product.name}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.videoProductName} numberOfLines={1}>{product.name}</Text>
                  <View style={styles.priceActionContainer}>
                    <Text style={styles.videoProductPrice}>{product.price}</Text>
                    <TouchableOpacity 
                      style={styles.addToCartButton}
                      onPress={() => onProductPress(product)}
                      accessibilityLabel={`Add ${product.name} to cart`}
                      accessibilityRole="button"
                    >
                      <Ionicons name="cart" size={16} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default VideoProductSection;