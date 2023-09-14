// Dummy data for communities
const communitiesData = [
  {
    _id: '64a54086cf67495184122e66',
    membersCount: 17,
    name: 'Gym Humor',
    photo:
      'https://images.pexels.com/photos/11175794/pexels-photo-11175794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    _id: '64b12345cf67495184122e77',
    membersCount: 25,
    name: 'Travel Enthusiasts',
    photo:
      'https://images.pexels.com/photos/87651/earth-blue-planet-globe-87651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    _id: '64c67890cf67495184122e88',
    membersCount: 10,
    name: 'Tech Innovators',
    photo:
      'https://images.pexels.com/photos/57993/pexels-photo-57993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    _id: '64d24680cf67495184122e99',
    membersCount: 8,
    name: 'Cooking Lovers',
    photo:
      'https://images.pexels.com/photos/9510/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

// Dummy data for followers
const followersData = [
  {
    _id: '64ae8bd037daa1ca15632e2d',
    email: 'testxgz@gmail.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64ae8bd037daa1ca15632e2d_profileImage.jpg',
    username: 'test',
  },
  {
    _id: '64b5199b85ed6958d701b4a1',
    email: 'testxgz@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64b5199b85ed6958d701b4a1_profileImage.jpg',
    username: 'test',
  },
  {
    _id: '64b443db507cf41a08eed375',
    email: 'hell@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64b443db507cf41a08eed375_profileImage.jpg',
    username: 'test',
  },
  {
    _id: '64c12345d9e8c6b8f2345678',
    email: 'johndoe@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64c12345d9e8c6b8f2345678_profileImage.jpg',
    username: 'johndoe',
  },
];

// Dummy data for following
const followingData = [
  {
    _id: '64cde1f78b53a2d9e1234567',
    email: 'user123@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64cde1f78b53a2d9e1234567_profileImage.jpg',
    username: 'user123',
  },
  {
    _id: '64def2c89c74b3f0f2345678',
    email: 'user456@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64def2c89c74b3f0f2345678_profileImage.jpg',
    username: 'user456',
  },
  {
    _id: '64efg3d790124a5b1234567a',
    email: 'user789@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64efg3d790124a5b1234567a_profileImage.jpg',
    username: 'user789',
  },
  {
    _id: '64fgh4e6911ab6c1c1234567b',
    email: 'janedoe@example.com',
    profileImageUrl:
      'https://fit-1-bucket.s3.us-west-1.amazonaws.com/64fgh4e6911ab6c1c1234567b_profileImage.jpg',
    username: 'janedoe',
  },
];

const messageDummyData = [
  {
    id: '1',
    name: 'Isaac Butler',
    message: 'You:This morning I will be in the ...',
    messageCount: 8,
  },
  {
    id: '2',
    name: 'John Doe',
    message: 'Hey, how are you?',
    messageCount: 3,
  },
  {
    id: '3',
    name: 'Alice Johnson',
    message: 'Can we schedule a meeting?',
    messageCount: 5,
  },
  {
    id: '4',
    name: 'Ella Smith',
    message: 'I have some exciting news!',
    messageCount: 2,
  },
  {
    id: '5',
    name: 'Michael Brown',
    message: 'What time should we meet?',
    messageCount: 4,
  },
];

export const PostsData = [
  {
    _id: '65031622d92f50af11b26f76',
    user: {
      _id: '64c0489c1b7733ae1e2c2614',
      email: 'fitcircletest1234@gmail.com',
      username: 'Sam32',
    },
    content: 'Test',
    media:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694701089274_0.26776815676223853_image_1694701088466.jpg',
    audio: null,
    thumbnail: null,
    visibility: 'public',
    favorites: [],
    cost: null,
    boosted: false,
    boostEndTime: null,
    hexCode: 'null',
    likes: [],
    comments: [],
    shares: [],
    createdAt: '2023-09-14T14:18:10.735Z',
    updatedAt: '2023-09-14T14:18:10.735Z',
    __v: 0,
  },
  {
    _id: '6502f30bd92f50af11b26f34',
    user: {
      _id: '64f0a7b2156e0e420949fd8d',
      email: 'anas11@example.com',
      username: 'test',
    },
    content: 'test',
    media:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694692104823_0.6984750627477341_Screenshot%202023-07-04%20185739.PNG',
    audio:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694692105814_0.29612028126540535_Recording.m4a',
    thumbnail: null,
    visibility: 'subscribers',
    favorites: [],
    cost: 2,
    boosted: false,
    boostEndTime: null,
    hexCode: 'hfjdkska',
    likes: [],
    comments: [],
    shares: [],
    createdAt: '2023-09-14T11:48:27.404Z',
    updatedAt: '2023-09-14T11:48:27.404Z',
    __v: 0,
  },
  {
    _id: '6502e7588efd4d2a508d08b1',
    user: {
      _id: '64f0a7b2156e0e420949fd8d',
      email: 'anas11@example.com',
      username: 'test',
    },
    content: 'test',
    media:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694689108167_0.3674406344989716_Screenshot%202023-07-04%20185739.PNG',
    audio:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694689109755_0.40881880917007773_Recording.m4a',
    thumbnail: null,
    visibility: 'subscribers',
    favorites: [],
    cost: 2,
    boosted: false,
    boostEndTime: null,
    hexCode: 'hfjdkska',
    likes: [],
    comments: [],
    shares: [],
    createdAt: '2023-09-14T10:58:32.123Z',
    updatedAt: '2023-09-14T10:58:32.123Z',
    __v: 0,
  },
  {
    _id: '65022f345fba8f76abb405fd',
    user: {
      _id: '65022e5e5fba8f76abb405ba',
      email: 'sam827ibsiab@gmail.com',
      username: 'Sam1983',
    },
    content: 'Post Test',
    media: null,
    audio: null,
    thumbnail: null,
    visibility: 'public',
    favorites: [],
    cost: null,
    boosted: false,
    boostEndTime: null,
    hexCode: 'null',
    likes: [
      {
        user: {
          _id: '65024a985fba8f76abb40777',
          email: 'aaaaaa@gmail.com',
          username: 'Testingffgfsnz',
        },
        _id: '650250825fba8f76abb40904',
      },
    ],
    comments: [
      {
        user: {
          _id: '65024a985fba8f76abb40777',
          email: 'aaaaaa@gmail.com',
          username: 'Testingffgfsnz',
        },
        text: 'Hi',
        _id: '650250895fba8f76abb40913',
        replies: [],
        createdAt: '2023-09-14T00:15:05.363Z',
        updatedAt: '2023-09-14T00:15:05.363Z',
      },
      {
        user: {
          _id: '65024a985fba8f76abb40777',
          email: 'aaaaaa@gmail.com',
          username: 'Testingffgfsnz',
        },
        text: 'Hi',
        _id: '650250a05fba8f76abb40937',
        replies: [],
        createdAt: '2023-09-14T00:15:28.070Z',
        updatedAt: '2023-09-14T00:15:28.070Z',
      },
      {
        user: {
          _id: '65024a985fba8f76abb40777',
          email: 'aaaaaa@gmail.com',
          username: 'Testingffgfsnz',
        },
        text: 'Hi',
        _id: '650250a15fba8f76abb4094c',
        replies: [],
        createdAt: '2023-09-14T00:15:29.539Z',
        updatedAt: '2023-09-14T00:15:29.539Z',
      },
      {
        user: {
          _id: '65024a985fba8f76abb40777',
          email: 'aaaaaa@gmail.com',
          username: 'Testingffgfsnz',
        },
        text: 'Hi',
        _id: '650250a25fba8f76abb40963',
        replies: [],
        createdAt: '2023-09-14T00:15:30.894Z',
        updatedAt: '2023-09-14T00:15:30.894Z',
      },
    ],
    shares: [],
    createdAt: '2023-09-13T21:52:52.846Z',
    updatedAt: '2023-09-14T00:15:30.894Z',
    __v: 5,
  },
  {
    _id: '6501e516a0753bb111dbe235',
    user: {
      _id: '64c0489c1b7733ae1e2c2614',
      email: 'fitcircletest1234@gmail.com',
      username: 'Sam32',
    },
    content: 'Test',
    media:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694622996898_0.45863818886904983_image_1694622996277.jpg',
    audio: null,
    thumbnail: null,
    visibility: 'public',
    favorites: [],
    cost: null,
    boosted: false,
    boostEndTime: null,
    hexCode: 'null',
    likes: [],
    comments: [],
    shares: [],
    createdAt: '2023-09-13T16:36:38.052Z',
    updatedAt: '2023-09-13T16:36:38.052Z',
    __v: 0,
  },
  {
    _id: '6501e4e5a0753bb111dbe228',
    user: {
      _id: '64c0489c1b7733ae1e2c2614',
      email: 'fitcircletest1234@gmail.com',
      username: 'Sam32',
    },
    content: 'Twdt\n',
    media:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694622948251_0.38490678682301294_image_1694622947615.jpg',
    audio: null,
    thumbnail: null,
    visibility: 'public',
    favorites: [],
    cost: null,
    boosted: false,
    boostEndTime: null,
    hexCode: 'null',
    likes: [],
    comments: [],
    shares: [],
    createdAt: '2023-09-13T16:35:49.451Z',
    updatedAt: '2023-09-13T16:35:49.451Z',
    __v: 0,
  },
  {
    _id: '6501dff8a0753bb111dbe1d6',
    user: {
      _id: '64c0489c1b7733ae1e2c2614',
      email: 'fitcircletest1234@gmail.com',
      username: 'Sam32',
    },
    content: 'Test',
    media:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694621685822_0.6630622190396036_video.mp4',
    audio: null,
    thumbnail: null,
    visibility: 'public',
    favorites: [
      {
        _id: '64c0489c1b7733ae1e2c2614',
        email: 'fitcircletest1234@gmail.com',
        username: 'Sam32',
      },
    ],
    cost: null,
    boosted: false,
    boostEndTime: null,
    hexCode: null,
    likes: [],
    comments: [],
    shares: [],
    createdAt: '2023-09-13T16:14:48.478Z',
    updatedAt: '2023-09-13T22:58:20.642Z',
    __v: 1,
  },
  {
    _id: '6501de16a0753bb111dbe194',
    user: {
      _id: '64c0489c1b7733ae1e2c2614',
      email: 'fitcircletest1234@gmail.com',
      username: 'Sam32',
    },
    content: 'Test',
    media:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694621201534_0.5442653272691866_video.mp4',
    audio: null,
    thumbnail: null,
    visibility: 'public',
    favorites: [],
    cost: null,
    boosted: false,
    boostEndTime: null,
    hexCode: null,
    likes: [],
    comments: [],
    shares: [],
    createdAt: '2023-09-13T16:06:46.514Z',
    updatedAt: '2023-09-13T16:06:46.514Z',
    __v: 0,
  },
  {
    _id: '6501ddb8a0753bb111dbe181',
    user: {
      _id: '64c0489c1b7733ae1e2c2614',
      email: 'fitcircletest1234@gmail.com',
      username: 'Sam32',
    },
    content: 'Test',
    media:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694621109905_0.9438313649767633_video.mp4',
    audio: null,
    thumbnail: null,
    visibility: 'public',
    favorites: [],
    cost: null,
    boosted: false,
    boostEndTime: null,
    hexCode: null,
    likes: [],
    comments: [],
    shares: [],
    createdAt: '2023-09-13T16:05:12.999Z',
    updatedAt: '2023-09-13T16:05:12.999Z',
    __v: 0,
  },
  {
    _id: '6501dd83a0753bb111dbe16e',
    user: {
      _id: '64c0489c1b7733ae1e2c2614',
      email: 'fitcircletest1234@gmail.com',
      username: 'Sam32',
    },
    content: 'Tets',
    media:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694621057654_0.37629682320229696_image_1694621052211.jpg',
    audio: null,
    thumbnail: null,
    visibility: 'public',
    favorites: [],
    cost: null,
    boosted: false,
    boostEndTime: null,
    hexCode: 'null',
    likes: [],
    comments: [],
    shares: [],
    createdAt: '2023-09-13T16:04:19.964Z',
    updatedAt: '2023-09-13T16:04:19.964Z',
    __v: 0,
  },
  {
    _id: '6501d679a0753bb111dbdfa2',
    user: {
      _id: '64c0489c1b7733ae1e2c2614',
      email: 'fitcircletest1234@gmail.com',
      username: 'Sam32',
    },
    content: 'Test',
    media:
      'https://fitcircle-life-bucket.s3.us-west-1.amazonaws.com/1694619252256_0.11167263299095698_video.mp4',
    audio: null,
    thumbnail: null,
    visibility: 'public',
    favorites: [],
    cost: null,
    boosted: false,
    boostEndTime: null,
    hexCode: null,
    likes: [],
    comments: [],
    shares: [],
    createdAt: '2023-09-13T15:34:17.492Z',
    updatedAt: '2023-09-13T15:34:17.492Z',
    __v: 0,
  },
];

export {communitiesData, followersData, followingData, messageDummyData};
