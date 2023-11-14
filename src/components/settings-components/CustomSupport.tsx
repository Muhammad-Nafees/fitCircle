import {format} from 'date-fns';
import {ISupportChats} from '../../interfaces/chat.interface';
import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SupportChatNavigationProp} from '../../interfaces/navigation.type';

interface Props {
  chat: ISupportChats;
}

const CustomSupport = ({chat}: Props) => {
  const navigation = useNavigation<SupportChatNavigationProp>();
  const date = new Date(chat?.lastMessage?.createdAt);
  const formattedLastMessageDate = format(date, 'dd/MM/yyyy');
  return (
    <TouchableOpacity
      style={styles.container}
    onPress={() => navigation.navigate('SupportChat', {chatId: chat?._id})}>
      <CustomProfileAvatar profileImage="" username="Sameer" size={50} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.text, {color: 'rgba(255, 255, 255, 0.5)'}]}>
            {formattedLastMessageDate}
          </Text>
          <Text style={[styles.text, {color: 'rgba(234, 68, 68, 1)'}]}>
            Pending
          </Text>
        </View>
        <Text style={styles.id}>HFYEU38FGHS</Text>
        <Text style={styles.description}>{chat?.lastMessage?.body}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(68, 68, 68, 0.5)',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: '400',
    fontSize: 10,
  },
  id: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(36, 163, 204, 1)',
  },
  description: {
    color: 'white',
    fontWeight: '400',
    fontSize: 12,
  },
});

export default CustomSupport;
