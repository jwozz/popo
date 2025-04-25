import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import UserAvatar from './UserAvatar';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const ChatBubble = ({ message, onLike }) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.messageContainer}>
      <View style={[styles.bubbleContainer, message.isOwn ? styles.ownBubbleContainer : {}]}>
        <View style={styles.userNameCage}>
          {!message.isOwn && (
            <UserAvatar 
              uri={message.userImage} 
              size={40} 
              showFollowButton={true}
            />
          )}
          <View style={styles.profWrapper}>
            {!message.isOwn && (
              <Text style={[styles.userName]}>
                {message.userName}
              </Text>
            )}            
            <View style={styles.messageFooter}>
              <Text style={styles.timeText}>{message.time}</Text>
            </View>
          </View> 
        </View>
        <View style={styles.bubbleCage}>
          <View style={[
            styles.bubbleWrapper, 
            message.isOwn ? styles.ownBubbleWrapper : styles.otherBubbleWrapper
          ]}>
            <View style={[
              styles.bubbleContent, 
              message.isOwn ? [styles.ownBubble, { backgroundColor: colors.bubbleOwn }] : [styles.otherBubble, { backgroundColor: colors.bubbleOther }],
              message.mediaUrl ? styles.mediaBubble : {}
            ]}>
              {message.message && (
                <Text style={styles.messageText}>{message.message}</Text>
              )}
              
              {message.caption && (
                <Text style={styles.captionText}>{message.caption}</Text>
              )}

              {message.mediaUrl && (
                <Image 
                  source={{ uri: message.mediaUrl }} 
                  style={styles.mediaImage} 
                />
              )}
            </View>
          
            {/* Engagement bar */}
            <View style={styles.newEngagementBar}>
              <View style={styles.commentersSection}>
                <View style={styles.thumbnailsContainer}>
                  {message.commenters.map((commenter, index) => (
                    <Image 
                      key={index} 
                      source={{ uri: commenter }} 
                      style={[
                        styles.commenterThumbnail,
                        { marginLeft: index > 0 ? -12 : 0 }
                      ]} 
                    />
                  ))}
                </View>
                <Text style={styles.commentsCount}>{message.replies} comments</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.reactionContainer} 
                onPress={onLike}
              >
                <Text style={[styles.likeIcon, message.liked && styles.likedIcon]}>
                  {message.liked ? '♥' : '♡'}
                </Text>
                <Text style={styles.likeCount}>
                  {message.liked ? message.likes + 1 : message.likes}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        
          {message.isOwn && (
            <UserAvatar 
              uri={message.userImage} 
              size={40} 
              showFollowButton={message.isOwn ? false : true} 
          />
          )}
      
          {/* Forward button */}
          <TouchableOpacity style={styles.forwardButton}>
          <Ionicons name="arrow-redo-outline" style={styles.forwardIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 15,
  },
  bubbleContainer: {
    alignItems: 'flex-start',
    maxWidth: '100%',
  },
  bubbleCage: {
    flexDirection: 'row',
  },
  userNameCage: {
    flexDirection: 'row',
  },
  ownBubbleContainer: {
    flexDirection: 'row',
  },
  bubbleWrapper: {
    alignSelf: 'flex-start',
    maxWidth: '76%',
    position: 'relative',
  },
  ownBubbleWrapper: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  otherBubbleWrapper: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  bubbleContent: {
    borderRadius: 18,
    padding: 4,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginTop: -5,
    zIndex: -2,
    minWidth: 100,
    position: 'relative',
  },
  forwardButton: {
    justifyContent: 'center',
    padding: 5,
    borderRadius: 50,
    marginTop: -50,
    right: -33,
    top: '55%',
    position: 'absolute',
  },
  forwardIcon: {
    color: '#666',
    fontSize: 17
  },
  otherBubble: {
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
  },
  ownBubble: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
  },
  mediaBubble: {
    padding: 4,
    paddingBottom: 0,
  },
  profWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 4,
  },
  userName: {
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: 'black',
  },
  timeText: {
    fontSize: 12,
    color: '#858585',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
    marginTop: 4,
    marginHorizontal: 8,
    color: 'black',
  },
  mediaImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 6,
  },
  captionText: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: 4,
    marginHorizontal: 8,
    marginBottom: 4,
    color: 'black',
  },
  newEngagementBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    marginTop: 0,
    borderWidth: 0,
    borderColor: '#E0E0E0',
    borderTopWidth: 0,
  },
  commentersSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnailsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  commenterThumbnail: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgb(246, 246, 246)',
  },
  commentsCount: {
    fontSize: 13,
    color: '#666',
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    fontSize: 20,
    marginRight: 4,
    color: '#666'
  },
  likedIcon: {
    color: '#E53935',
  },
  likeCount: {
    fontSize: 13,
    color: '#666',
  },
});

export default ChatBubble;