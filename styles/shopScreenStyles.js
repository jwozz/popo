import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

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
    marginTop: 80,
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

// Updated styles for the shopScreenStyles.js file
  sectionContainer: {
    marginVertical: 15,
    paddingHorizontal: 20,
    paddingRight: 0
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgb(153, 153, 153)',
  },
  cardWrapper: {
    marginRight: 20,
    alignItems: 'center',
    paddingVertical: 10,
    transformOrigin: 'center center',
    marginTop: 20
  },
  videoCard: {
  borderRadius: 12,
  overflow: 'hidden',
  shadowColor: 'grey',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
  marginTop: 0,
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  videoThumbnail: {
    borderRadius: 12,
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    zIndex: 10,
  },
  sellerOverlay: {
    position: 'absolute',
    top:-20,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    zIndex: 5,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    width: '100%',
  },
  avatarCage: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 10
  },
  sellerAvatar: {
    width: 47,
    height: 47,
    borderRadius: 40,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'rgb(246, 246, 246)',
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#26a69a',
  },
  sellerLocation: {
    fontSize: 12,
    color: 'rgb(136, 136, 136)',
    fontWeight: '500'
  },
  followButtonOverlay: {
    position: 'absolute',
    bottom: -4,
    left: 25,
    backgroundColor: '#26a69a',
    backgroundColor: 'rgb(85, 94, 104)',
    borderRadius: 50,
    padding: 2,
    borderWidth: 2,
    borderColor: 'rgb(246, 246, 246)',
  },  
  productsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: 5,
  },
  videoProductsList: {
    paddingRight: 10,
    alignItems: 'flex-end'
  },
  videoProductItem: {
    flexDirection: 'column', 
    borderRadius: 8,
    padding: 6,
    marginRight: 8,
    width: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  productMainContent: {
    height: 120,
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  videoProductThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  replyIndicator: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    flexWrap: 'wrap',
  },
  videoProductName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
    width: '100%',
    marginBottom: 6,
  },
  priceActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  videoProductPrice: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
    marginRight: 8,
  },
  shopButtons: {
    flexDirection: 'row',
  },
  addToCartButton2: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productReplyContainer: {
    marginTop: 6,
    width: '100%',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  replyInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  closeReplyButton: {
    padding: 2,
  },
  replyPlaceholder: {
    flex: 1,
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    marginHorizontal: 6,
  },
  sendReplyButton: {
    padding: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 4,
    paddingRight: 0,
    width: '100%',
    marginTop: 0,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileThumbnails: {
    flexDirection: 'row',
    marginRight: 8,
  },
  commentThumbnail: {
    width: 20,
    height: 20,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgb(246, 246, 246)',
  },
  commentThumbnailOverlap: {
    marginLeft: -10,
  },
  commentCount: {
    fontSize: 12,
    color: 'rgb(136, 136, 136)',
    fontWeight: '500',
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgb(136, 136, 136)',
  },
  reactionButton: {
    padding: 5,
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