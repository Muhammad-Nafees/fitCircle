import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-paper';
const Heart = require('../../../assets/icons/heart.png');
const Like = require('../../../assets/icons/like.png');
const Share = require('../../../assets/icons/share.png');
const Comment = require('../../../assets/icons/comment.png');

export const CustomPost = () => {
  const images = [
    require('../../../assets/images/test.jpg'),
    require('../../../assets/images/test2.jpg'),
    require('../../../assets/images/test3.jpg'),
  ];

  return (
    <View>
      <View style={styles.postContainer}>
        <Avatar.Text size={40} label="SA" />
        <View style={styles.postTextContainer}>
          <Text style={styles.postName}>Lincoln Smith</Text>
          <View style={styles.postDetails}>
            <Text style={styles.postId}>@lincolnsmith</Text>
            <Text style={styles.postTime}>4 hours ago</Text>
          </View>
        </View>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} style={styles.image} source={image} />
        ))}
      </ScrollView>
      <View style={styles.postButtons}>
        <View style={styles.postButtonsContainer}>
          <View style={styles.likesContainer}>
            <Image style={styles.heartIcon} source={Heart} />
            <Text style={styles.likesCount}>94</Text>
          </View>
          <Text style={styles.buttonText}>7 comments</Text>
        </View>
        <View style={styles.mediaButtons}>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.postIcon} source={Like} />
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.postIcon} source={Comment} />
            <Text style={styles.buttonText}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.postIcon} source={Share} />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 16,
  },
  postTextContainer: {
    marginLeft: 10,
  },
  postDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postId: {
    marginRight: 10,
    color: '#007797',
    fontSize: 12,
  },
  postName: {
    color: '#fff',
    fontSize: 14,
  },
  postTime: {
    color: '#666667',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 16,
  },
  image: {
    width: 258,
    height: 230,
    marginRight: 10,
  },
  postButtons: {
    backgroundColor: '#E1E1E1',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  postButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  buttonText: {
    fontSize: 10,
    color: '#444444',
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    width: 17.5,
    height: 17.5,
    marginRight: 5,
  },
  likesCount: {
    fontSize: 12,
    color: '#444444',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#E1E1E1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postIcon: {
    width: 13,
    height: 11.3,
    marginHorizontal: 5,
  },
});
