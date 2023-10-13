import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import {Swipeable} from 'react-native-gesture-handler';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
// ------------------------------------------------------------------//
import DeleteMessageIcon from '../../../assets/icons/DeleteMessage';
import DoNotDisturbIcon from '../../../assets/icons/DoNotDisturb';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/metrics';

const CustomContact = ({
  name,
  message,
  messageCount,
  handleDeleteButton,
  setActionType,
  index,
}: any) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const navigation = useNavigation();
  const swipeableRef: any = useRef(null);
  const route = useRoute();

  useEffect(() => {
    swipeableRef.current.close();
  }, [navigation]);

  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      closeSwipeable();
    }, []),
  );

  const renderRightActions = () => {
    return (
      <View
        style={[
          styles.rightActionsContainer,
          isSwiped && {backgroundColor: 'rgba(68, 68, 68, 0.5)'},
        ]}>
        <TouchableOpacity
          style={[
            styles.rightAction,
            {backgroundColor: 'rgba(222, 49, 49, 1)'},
          ]}
          onPress={() => {
            setActionType('Deleted');
            swipeableRef.current.close();
            handleDeleteButton();
          }}>
          <DeleteMessageIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.rightAction,
            {backgroundColor: 'rgba(220, 77, 77, 1)'},
          ]}
          onPress={() => {
            setActionType('Blocked');
            swipeableRef.current.close();
            handleDeleteButton();
          }}>
          <DoNotDisturbIcon />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2.7}
      onSwipeableWillOpen={() => setIsSwiped(true)}
      onSwipeableWillClose={() => setIsSwiped(false)}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatDetails', {username: name})}>
        <View
          style={[
            styles.contentContainer,
            isSwiped && {backgroundColor: 'rgba(68, 68, 68, 0.5)'},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Avatar.Text
              size={40}
              label={name[0]}
              style={{backgroundColor: '#5e01a9'}}
            />
            <View>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.message}>{message}</Text>
            </View>
          </View>
          <View style={styles.messagesCount}>
            <Text style={styles.messagesCountText}>{messageCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: '600',
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
  },
  message: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#292A2C',
    zIndex: 1000,
    paddingVertical: verticalScale(9),
  },
  messagesCount: {
    backgroundColor: 'rgba(169, 225, 247, 1)',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  messagesCountText: {
    fontSize: 12,
    color: 'rgba(87, 87, 87, 1)',
    fontWeight: 'bold',
  },
  rightActionsContainer: {
    flexDirection: 'row',
    paddingLeft: horizontalScale(50),
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(43),
  },
  rightActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomContact;
