import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    height: 46,
    marginTop: 80
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 16,
  },
  filterButton: {
    padding: 5,
  },
  categoriesScroll: {
    marginVertical: 15,
    display: 'none'
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryChip: {
    backgroundColor: '#26a69a',
  },
  categoryText: {
    color: '#757575',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  sectionContainer: {
    marginVertical: 15,
    marginTop: 5,
    paddingHorizontal: 20,
    paddingRight: 0
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 15,
  },
  productsRow: {
    paddingRight: 20,
  },
  // Video Card Styles
  videoCard: {
    width: 270,
    marginRight: 20,
    marginBottom: 30,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  videoContainer: {
    position: 'relative',
    height: 250,
    width: '100%',
  },
  videoThumbnail: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  videoInfoContainer: {
    padding: 12,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sellerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 14,
    fontWeight: '600',
  },
  sellerLocation: {
    fontSize: 12,
    color: '#757575',
  },
  videoProductsContainer: {
    marginTop: 8,
  },
  videoProductsLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#757575',
    marginBottom: 8,
  },
  videoProductsList: {
    paddingRight: 10,
  },
  videoProductItem: {
    width: 50,
    marginRight: 8,
  },
  videoProductThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 4,
  },
  videoProductName: {
    fontSize: 12,
    fontWeight: '500',
  },
  videoProductPrice: {
    fontSize: 12,
    color: '#26a69a',
    fontWeight: '600',
  },
  // Regular Product Card Styles
  productCard: {
    width: 170,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 170,
    width: '100%',
  },
  productImage: {
    height: '100%',
    width: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#26a69a',
    fontWeight: '700',
  },
  productArtist: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  // Artist Feature Styles
  artistFeature: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  artistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  artistTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllText: {
    color: '#26a69a',
    fontWeight: '500',
  },
  artistCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  artistImage: {
    width: 100,
    height: 100,
  },
  artistInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  artistName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  artistBio: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  shopNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopNowText: {
    color: '#26a69a',
    fontWeight: '600',
    marginRight: 5,
  },
  spacer: {
    height: 30,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalProductName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalProductPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#26a69a',
    marginBottom: 16,
  },
  modalProductDescription: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#26a69a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#ffffff',
    fontWeight: '600',
    marginRight: 8,
  },
});