import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react-native';

interface FeedPost {
  id: string;
  authorName: string;
  authorPosition: string;
  authorImage: string;
  postImage: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

interface CommunityFeedPostCardProps {
  post: FeedPost;
}

export default function CommunityFeedPostCard({
  post,
}: CommunityFeedPostCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.authorInfo}>
          <Image
            source={{ uri: post.authorImage }}
            style={styles.authorImage}
          />
          <View>
            <Text style={styles.authorName}>{post.authorName}</Text>
            <Text style={styles.authorPosition}>{post.authorPosition}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
          <Bookmark
            size={16}
            color={isBookmarked ? '#FFD700' : '#999999'}
            fill={isBookmarked ? '#FFD700' : 'none'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.imageSection}>
          <Image
            source={{ uri: post.postImage }}
            style={styles.postImage}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.textSection}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content} numberOfLines={3}>
            {post.content}
          </Text>

          <View style={styles.engagementBar}>
            <TouchableOpacity
              style={styles.engagementButton}
              onPress={handleLike}
            >
              <Heart
                size={16}
                color={isLiked ? '#FFD700' : '#666666'}
                fill={isLiked ? '#FFD700' : 'none'}
              />
              <Text
                style={[
                  styles.engagementText,
                  isLiked && styles.engagementTextActive,
                ]}
              >
                {likeCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.engagementButton}>
              <MessageCircle size={16} color="#666666" />
              <Text style={styles.engagementText}>{post.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.engagementButton}>
              <Share2 size={16} color="#666666" />
              <Text style={styles.engagementText}>{post.shares}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  authorImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  authorName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  authorPosition: {
    fontSize: 10,
    color: '#666666',
  },
  contentWrapper: {
    flexDirection: 'row',
    gap: 12,
  },
  imageSection: {
    width: '30%',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  divider: {
    width: 1,
    backgroundColor: '#CCCCCC',
  },
  textSection: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 6,
  },
  content: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 14,
    marginBottom: 8,
  },
  engagementBar: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  engagementText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#666666',
  },
  engagementTextActive: {
    color: '#FFD700',
  },
});