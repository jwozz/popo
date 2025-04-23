import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar, 
  SafeAreaView,
  FlatList,
  TextInput 
} from 'react-native';

export default function App() {
  const [messageText, setMessageText] = useState('');
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Example chat messages with UGC-style content
  const chatMessages = [
    {
      id: 'm1',
      userId: 'user1',
      userName: 'Emma Johnson',
      userImage: 'https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg',
      isOwn: false,
      message: "Just discovered this amazing coffee shop downtown! Anyone want to join me tomorrow morning?",
      time: '9:32 AM',
      likes: 12,
      replies: 4,
      commenters: [
        'https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFv1LJuW59sR1KW6BDD5ietN8eJlEZLk7eA&s',
        'https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg'
      ]
    },
    {
      id: 'm2',
      userId: 'user2',
      userName: 'Michael Chen',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFv1LJuW59sR1KW6BDD5ietN8eJlEZLk7eA&s',
      isOwn: false,
      message: null,
      mediaUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_7RXnbtI_yMq1eMKnONK5oJhKcmEg558M0w&s',
      caption: "Check out my new handmade ceramic collection! Each piece is unique and perfect for your morning coffee ritual. 🍵",
      time: '10:15 AM',
      likes: 28,
      replies: 7,
      commenters: [
        'https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg',
        'https://st.depositphotos.com/1518767/1390/i/450/depositphotos_13909347-stock-photo-young-employee-standing-upright-in.jpg',
        'https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg'
      ]
    },
    {
      id: 'm3',
      userId: 'user3',
      userName: 'Sarah Williams',
      userImage: 'https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg',
      isOwn: false,
      message: "Has anyone tried the new Thai restaurant on 5th Street? I heard they have amazing pad thai!",
      time: '11:04 AM',
      likes: 5,
      replies: 9,
      commenters: [
        'https://st.depositphotos.com/1518767/1390/i/450/depositphotos_13909347-stock-photo-young-employee-standing-upright-in.jpg',
        'https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg',
        'https://st2.depositphotos.com/1034986/6164/i/450/depositphotos_61642047-stock-photo-beautiful-brunette-woman.jpg'
      ]
    },
    {
      id: 'm4',
      userId: 'me',
      userName: 'You',
      userImage: 'https://st.depositphotos.com/1518767/1390/i/450/depositphotos_13909347-stock-photo-young-employee-standing-upright-in.jpg',
      isOwn: true,
      message: "Just finished my morning run! 5k in 22 minutes - new personal best! 🏃‍♂️",
      time: '11:30 AM',
      likes: 14,
      replies: 3,
      commenters: [
        'https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFv1LJuW59sR1KW6BDD5ietN8eJlEZLk7eA&s',
        'https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg'
      ]
    },
    {
      id: 'm5',
      userId: 'user4',
      userName: 'Alex Rodriguez',
      userImage: 'https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg',
      isOwn: false,
      message: null,
      mediaUrl: 'https://images.stockcake.com/public/b/d/e/bdecd851-cd76-4d2d-adb8-2115c5e9f553_large/sunrise-city-view-stockcake.jpg',
      caption: "My view this morning. Starting the day with gratitude and this stunning sunrise. #morningvibes",
      time: '11:42 AM',
      likes: 31,
      replies: 5,
      commenters: [
        'https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg',
        'https://media.istockphoto.com/id/1149504274/photo/portrait-of-a-taiwanese-man.jpg?s=612x612&w=0&k=20&c=uiQDg8fKN1LCTCU-AxNosEagZAwt7mZdAqRqMLDatyI=',
        'https://st.depositphotos.com/1518767/1390/i/450/depositphotos_13909347-stock-photo-young-employee-standing-upright-in.jpg'
      ]
    },
    {
      id: 'm6',
      userId: 'user5',
      userName: 'Jessica Parker',
      userImage: 'https://st2.depositphotos.com/1034986/6164/i/450/depositphotos_61642047-stock-photo-beautiful-brunette-woman.jpg',
      isOwn: false,
      message: "I'm selling my concert tickets for this weekend - can't make it anymore. DM me if interested!",
      time: '12:05 PM',
      likes: 3,
      replies: 8,
      commenters: [
        'https://media.istockphoto.com/id/1149504274/photo/portrait-of-a-taiwanese-man.jpg?s=612x612&w=0&k=20&c=uiQDg8fKN1LCTCU-AxNosEagZAwt7mZdAqRqMLDatyI=',
        'https://t4.ftcdn.net/jpg/03/96/16/79/360_F_396167959_aAhZiGlJoeXOBHivMvaO0Aloxvhg3eVT.jpg',
        'https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg'
      ]
    },
    {
      id: 'm7',
      userId: 'user6',
      userName: 'David Wilson',
      userImage: 'https://media.istockphoto.com/id/1149504274/photo/portrait-of-a-taiwanese-man.jpg?s=612x612&w=0&k=20&c=uiQDg8fKN1LCTCU-AxNosEagZAwt7mZdAqRqMLDatyI=',
      isOwn: false,
      mediaUrl: 'https://m.media-amazon.com/images/I/815-mK7dKKL._AC_UF350,350_QL80_.jpg',
      caption: "My handcrafted wooden cutting boards are back in stock! Limited quantity available. Perfect for your kitchen or as a gift! 🪵🔪",
      time: '12:37 PM',
      likes: 42,
      replies: 11,
      commenters: [
        'https://st.depositphotos.com/1518767/1390/i/450/depositphotos_13909347-stock-photo-young-employee-standing-upright-in.jpg',
        'https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHFv1LJuW59sR1KW6BDD5ietN8eJlEZLk7eA&s'
      ]
    },
  ];

  const renderChatBubble = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={[styles.bubbleContainer, item.isOwn ? styles.ownBubbleContainer : {}]}>
        {!item.isOwn && (
          <Image source={{ uri: item.userImage }} style={styles.userAvatar} />
        )}
        
        <View style={styles.bubbleWrapper}>
          <View style={[
            styles.bubbleContent, 
            item.isOwn ? styles.ownBubble : styles.otherBubble,
            item.mediaUrl ? styles.mediaBubble : {}
          ]}>

            <View style={styles.profWrapper}>
              {!item.isOwn && (
                <Text style={styles.userName}>{item.userName}</Text>
              )}            
              <View style={styles.messageFooter}>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View> 
            
            {item.message && (
              <Text style={styles.messageText}>{item.message}</Text>
            )}
            
            {item.caption && (
              <Text style={styles.captionText}>{item.caption}</Text>
            )}

            {item.mediaUrl && (
              <Image 
                source={{ uri: item.mediaUrl }} 
                style={styles.mediaImage} 
              />
            )}
            

          </View>
          
          {/* New engagement bar below the bubble but in the same wrapper */}
          <View style={styles.newEngagementBar}>
            <View style={styles.commentersSection}>
              <View style={styles.thumbnailsContainer}>
                {item.commenters.map((commenter, index) => (
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
              <Text style={styles.commentsCount}>{item.replies} comments</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.reactionContainer} 
              onPress={() => toggleLike(item.id)}
            >
              <Text style={[styles.likeIcon, liked[item.id] && styles.likedIcon]}>
                {liked[item.id] ? '♥' : '♡'}
              </Text>
              <Text style={styles.likeCount}>
                {liked[item.id] ? item.likes + 1 : item.likes}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {item.isOwn && (
          <Image source={{ uri: item.userImage }} style={styles.userAvatar} />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#128C7E" barStyle="light-content" />
      
      {/* WhatsApp style header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Chat</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs like WhatsApp */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
            <Text style={styles.activeTabText}>Chats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Calls</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Filter options */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterText}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterChip, styles.activeFilterChip]}>
            <Text style={styles.activeFilterText}>Talks</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Chat feed */}
      <FlatList
        data={chatMessages}
        renderItem={renderChatBubble}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatFeed}
      />

      {/* Message input area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Text style={styles.attachIcon}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Share something..."
          value={messageText}
          onChangeText={setMessageText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#128C7E', 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    fontSize: 20,
    marginLeft: 24,
    color: '#ffffff',
  },
  tabsContainer: {
    backgroundColor: '#128C7E',
    paddingHorizontal: 10,
    display: 'none',
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFFFFF',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  filterContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    borderBottomWidth: 0,
    borderBottomColor: '#E8E8E8',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: 'rgb(228, 228, 228)',
  },
  activeFilterChip: {
    backgroundColor: '#DCF8C6',
  },
  filterText: {
    color: '#444',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#128C7E',
    fontWeight: '500',
    fontSize: 14,
  },
  chatFeed: {
    padding: 10,
  },
  messageContainer: {
    marginBottom: 16,
  },
  bubbleContainer: {
    flexDirection: 'row',
    maxWidth: '100%',
  },
  ownBubbleContainer: {
    flexDirection: 'row-reverse',
  },
  bubbleWrapper: {
    // This wrapper will contain both the bubble content and engagement bar
    // and ensure they're the same width
    maxWidth: '75%',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingBottom: 6,
    marginHorizontal: 8,
  },
  bubbleContent: {
    width: '100%', // Fill the wrapper
    borderRadius: 18,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
  },
  ownBubble: {
    backgroundColor: '#DCF8C6', // WhatsApp light green
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
    color: '#128C7E',
    marginHorizontal: 8,
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
  },
  // New engagement bar styles - now it's inside the bubbleWrapper
  newEngagementBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 6, // Light background to differentiate from bubble
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    marginTop: 0, // Overlap slightly with the bubble for a connected look
    borderWidth: 0,
    borderColor: '#E0E0E0',
    borderTopWidth: 0, // No top border to blend with bubble
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
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  commentsCount: {
    fontSize: 13,
    color: '#555555',
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  likedIcon: {
    color: '#E53935',
  },
  likeCount: {
    fontSize: 13,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 5,
    borderTopWidth: 0,
    borderTopColor: '#E8E8E8',
    alignItems: 'center',
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgb(228, 228, 228)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  attachIcon: {
    fontSize: 24,
    color: '#128C7E',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgb(228, 228, 228)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendIcon: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});