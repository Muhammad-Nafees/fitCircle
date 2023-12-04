import CustomButton from '../../components/shared-components/CustomButton';
import CustomSupport from '../../components/settings-components/CustomSupport';
import {View, Text, StyleSheet} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {getSupportChats, socket} from '../../socket';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ISupportChats} from '../../interfaces/chat.interface';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {useFocusEffect} from '@react-navigation/native';

const SupportOne = ({navigation}: any) => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const [allSupportChats, setAllSupportChats] = useState<ISupportChats[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ticketId, setTicketId] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getSupportChats(userId as string);
      socket.on(`getSupportChats/${userId}`, data => {
        console.log('getChats');
        console.log(data);
        setAllSupportChats(data);
        setIsLoading(false);
      });
      return () => {
        socket.off(`getSupportChats/${userId}`);
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Support</Text>
        {isLoading ? (
          <CustomLoader />
        ) : allSupportChats?.length === 0 && !isLoading ? (
          <Text style={{color: 'white'}}>No Chat Support yet!</Text>
        ) : (
          allSupportChats?.map((chat: ISupportChats) => (
            <CustomSupport chat={chat} />
          ))
        )}
      </View>
      <View style={{paddingVertical: 30, marginHorizontal: 24}}>
        <CustomButton onPress={() => navigation.navigate('SupportMessage')}>
          Send New Message
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
    marginBottom: 16,
  },
});

export default SupportOne;
