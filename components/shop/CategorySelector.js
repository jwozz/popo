import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../styles/shopScreenStyles';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'ceramics', name: 'Ceramics' },
  { id: 'coffee-beans', name: 'Coffee Beans' },
  { id: 'brewing', name: 'Brewing' },
  { id: 'accessories', name: 'Accessories' }
];

const CategorySelector = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryPress = (categoryId) => {
    setActiveCategory(categoryId);
    // Here you could add logic to filter products based on category
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.categoriesScroll}
      contentContainerStyle={styles.categoriesContent}
    >
      {categories.map(category => (
        <TouchableOpacity 
          key={category.id}
          style={[
            styles.categoryChip, 
            activeCategory === category.id && styles.activeCategoryChip
          ]}
          onPress={() => handleCategoryPress(category.id)}
          accessibilityLabel={`${category.name} category`}
          accessibilityRole="button"
          accessibilityState={{ selected: activeCategory === category.id }}
        >
          <Text 
            style={activeCategory === category.id ? 
              styles.activeCategoryText : styles.categoryText}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategorySelector;