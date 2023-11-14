import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CustomSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <>
        {/* User Section */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          marginTop={20}>
          <SkeletonPlaceholder.Item
            width={50}
            height={50}
            borderRadius={25}
            marginRight={15}
          />
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={120}
              height={20}
              borderRadius={4}
              marginBottom={6}
            />
            <SkeletonPlaceholder.Item width={80} height={15} borderRadius={4} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>

        {/* Post Image */}
        <SkeletonPlaceholder.Item marginTop={20}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={200}
            borderRadius={10}
          />
        </SkeletonPlaceholder.Item>

      
      </>
    </SkeletonPlaceholder>
  );
};

export default CustomSkeleton;
