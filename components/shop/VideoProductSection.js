import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { styles } from '../../styles/shopScreenStyles';

const { width, height } = Dimensions.get('window');

// Define the bottom sheet snap positions (matching your bottom sheet component)
const BOTTOM_SHEET_POSITIONS = {
  TOP: 0,
  MIDDLE: height * 0.4,
  BOTTOM: height * 0.85
};

const VideoProductSection = ({ videoProducts, onProductPress, bottomSheetPosition = BOTTOM_SHEET_POSITIONS.MIDDLE }) => {
  if (!videoProducts || videoProducts.length === 0) {
    return null;
  }
  
  // Calculate card width for exact sizing
  const cardWidth = Math.min(width * 0.8, 320);
  const snapInterval = cardWidth + 20; // Card width + margin
  
  // Track horizontal scroll position
  const scrollX = useRef(new Animated.Value(0)).current;
  
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Updates</Text>
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={videoProducts}
        keyExtractor={(item) => item.id.toString()}
        snapToAlignment="start"
        snapToInterval={snapInterval}
        decelerationRate="fast"
        pagingEnabled={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          // Calculate the input range for animations
          const inputRange = [
            (index - 1) * snapInterval,
            index * snapInterval,
            (index + 1) * snapInterval
          ];
          
          // Scale factor for card height - largest when centered
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: 'clamp'
          });
          
          // Blur effect - clearest when centered (represented by opacity here)
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp'
          });
          
          return (
            <Animated.View 
              style={[
                styles.cardWrapper, 
                { 
                  width: cardWidth,
                  transform: [{ scale }]
                }
              ]}
            >
              {/* Seller Profile moved outside the video */}
              <View style={styles.sellerProfileOuter}>
                <View style={styles.sellerContainer}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={{ uri: item.sellerAvatar }}
                      style={styles.sellerAvatar}
                      accessibilityLabel={`${item.sellerName}'s profile picture`}
                    />
                    {/* Follow button overlay on profile pic */}
                    <TouchableOpacity style={styles.followButtonOverlay}>
                      <Ionicons name="add" size={14} color="#26a69a" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.sellerInfo}>
                    <Text style={styles.sellerName}>{item.sellerName}</Text>
                    <Text style={styles.sellerLocation}>{item.location}</Text>
                  </View>
                  {/* Vertical dots menu replacing follow button */}
                  <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-vertical" size={18} color="#888888" />
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* Video Card Component */}
              <VideoCard 
                videoItem={item} 
                onProductPress={onProductPress} 
                width={cardWidth}
                height={height}
                opacity={opacity}
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
                
                {/* Right side - Reaction icon with likes count */}
                <View style={styles.reactionContainer}>
                  <TouchableOpacity style={styles.reactionButton}>
                    <Ionicons name="heart-outline" size={24} color="#26a69a" />
                  </TouchableOpacity>
                  <Text style={styles.likesCount}>{item.likeCount || 42}</Text>
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const VideoCard = ({ videoItem, onProductPress, width, height, opacity }) => {
  // Calculate max card height based on bottom sheet position
  // We need to subtract the position of the bottom sheet from the screen height
  // and leave some space for the profile and footer elements
  const maxAvailableHeight = height - BOTTOM_SHEET_POSITIONS.MIDDLE - 100; // 100px for profile and footer
  const baseCardHeight = Math.min(maxAvailableHeight, 450);
  
  // Use animation values for dynamic styling
  const cardStyle = {
    ...styles.videoCard,
    width: width,
    height: baseCardHeight,
    opacity,
  };
  
  const thumbnailStyle = [
    styles.videoThumbnail,
    {
      height: baseCardHeight,
      width: width,
    }
  ];
  
  // Animated blur intensity using opacity as a proxy
  const blurStyle = {
    ...styles.blurOverlay,
    opacity: Animated.subtract(1, opacity),
  };

  // Track which product has its reply box open
  const [replyingToProductId, setReplyingToProductId] = useState(null);
  
  return (
    <Animated.View style={cardStyle}>
      <View style={styles.videoContainer}>
        {/* Video Thumbnail */}
        <Image
          source={{ uri: videoItem.thumbnailUrl }}
          style={thumbnailStyle}
          resizeMode="cover"
          accessibilityLabel={`Video by ${videoItem.sellerName}`}
        />
        
        {/* Blur overlay - intensity changes with scroll position */}
        <Animated.View style={blurStyle} />
        
        {/* Play Button */}
        <TouchableOpacity
          style={styles.playButton}
          accessibilityLabel="Play video"
          accessibilityRole="button"
        >
          <Ionicons name="play-circle" size={40} color="#ffffff" />
        </TouchableOpacity>
        
        {/* Products with Reply Feature */}
        <View style={styles.productsOverlay}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.videoProductsList}
            nestedScrollEnabled={true}
          >
            {videoItem.products.map(product => (
              <View key={product.id} style={styles.videoProductItem}>
                {/* Product Image with Interactive Overlay */}
                <TouchableOpacity 
                  onPress={() => setReplyingToProductId(
                    replyingToProductId === product.id ? null : product.id
                  )}
                  style={styles.productImageContainer}
                >
                  <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.videoProductThumbnail}
                    accessibilityLabel={product.name}
                  />
                </TouchableOpacity>

                <View style={styles.productDetails}>
                  <Text style={styles.videoProductName} numberOfLines={1}>{product.name}</Text>
                  <View style={styles.priceActionContainer}>
                    <Text style={styles.videoProductPrice}>{product.price}</Text>
                    <View style={styles.shopButtons}>
                      {/* Reply Indicator */}
                      <View style={styles.replyIndicator}> 
                        <Ionicons name="chatbubble-outline" size={16} color="#ffffff" />
                      </View>
                      <TouchableOpacity 
                        style={styles.addToCartButton2}
                        onPress={() => onProductPress(product)}
                        accessibilityLabel={`Add ${product.name} to cart`}
                        accessibilityRole="button"
                      >
                      <Ionicons name="cart" size={16} color="#ffffff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Reply Input that shows when product is selected */}
                {replyingToProductId === product.id && (
                  <View style={styles.productReplyContainer}>
                    <View style={styles.replyInputWrapper}>
                      <TouchableOpacity style={styles.closeReplyButton} onPress={() => setReplyingToProductId(null)}>
                        <Ionicons name="close-outline" size={16} color="#ffffff" />
                      </TouchableOpacity>
                      <Text style={styles.replyPlaceholder}>Reply...</Text>
                      <TouchableOpacity style={styles.sendReplyButton}>
                        <Ionicons name="send-outline" size={16} color="#26a69a" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Animated.View>
  );
};

export default VideoProductSection;