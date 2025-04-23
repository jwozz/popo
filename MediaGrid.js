import React, { useState } from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MediaGrid = ({ media, isUser }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const renderPagination = () => {
    // Only show pagination if we have more than 1 image
    if (media.length <= 1) return null;
    
    // Calculate which dots to show (always show 3 dots centered around active index)
    let startDot = Math.max(0, Math.min(activeIndex - 1, media.length - 3));
    
    return (
      <View style={styles.pagination}>
        {[...Array(Math.min(3, media.length))].map((_, i) => {
          const dotIndex = startDot + i;
          return (
            <View 
              key={dotIndex}
              style={[
                styles.dot, 
                activeIndex === dotIndex && styles.activeDot
              ]} 
            />
          );
        })}
      </View>
    );
  };

  const renderGrid = () => {
    switch (media.length) {
      case 1:
        return (
          <Image 
            source={{ uri: media[0] }} 
            style={[styles.media, styles.singleMedia]} 
          />
        );
      case 2:
        return (
          <View style={styles.twoColumn}>
            <Image source={{ uri: media[0] }} style={styles.halfWidth} />
            <Image source={{ uri: media[1] }} style={styles.halfWidth} />
          </View>
        );
      case 3:
        return (
          <View style={styles.threeColumn}>
            <View style={styles.twoColumn}>
              <Image source={{ uri: media[0] }} style={styles.halfWidth} />
              <Image source={{ uri: media[1] }} style={styles.halfWidth} />
            </View>
            <Image source={{ uri: media[2] }} style={styles.fullWidth} />
          </View>
        );
      case 4:
        return (
          <View style={styles.fourColumn}>
            <Image source={{ uri: media[0] }} style={styles.quarterWidth} />
            <Image source={{ uri: media[1] }} style={styles.quarterWidth} />
            <Image source={{ uri: media[2] }} style={styles.quarterWidth} />
            <Image source={{ uri: media[3] }} style={styles.quarterWidth} />
          </View>
        );
      default:
        return (
          <View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
            >
              {media.map((uri, i) => (
                <Image 
                  key={i} 
                  source={{ uri }} 
                  style={[styles.carouselImage, { width: SCREEN_WIDTH - 32 }]} 
                />
              ))}
            </ScrollView>
            {renderPagination()}
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, isUser && styles.userContainer]}>
      {renderGrid()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  media: {
    backgroundColor: '#e5e5ea',
    aspectRatio: 1,
  },
  singleMedia: {
    width: '100%',
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 2,
  },
  halfWidth: {
    width: '49.5%',
    aspectRatio: 1,
  },
  threeColumn: {
    gap: 2,
  },
  fullWidth: {
    width: '100%',
    aspectRatio: 1.5,
  },
  fourColumn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  quarterWidth: {
    width: '49.5%',
    aspectRatio: 1,
    marginBottom: 2,
  },
  carouselImage: {
    height: 200,
    borderRadius: 12,
    marginRight: 2,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    height: 16, // Fixed height for pagination
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginHorizontal: 4,
  },
});

export default MediaGrid;