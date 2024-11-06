import React from 'react';
import { Flex, Skeleton, Space } from 'antd';
import styled from 'styled-components';

const CustomSkeletonImage = styled(Skeleton.Image)`
  width: 550px !important;
  height: 550px !important;
  object-fit: cover;
`;

const SkeletonLoader = () => {
  return (
    <Flex gap={20}>
      <CustomSkeletonImage active />
      <Flex vertical gap={10}>
        <Skeleton active paragraph={{ rows: 3 }} />
        <Space>
          <Skeleton.Input active size="large" />
          <Skeleton.Input active size="large" />
          <Skeleton.Input active size="large" />
        </Space>
        <Skeleton.Input active size="large" />
        <Skeleton.Button active size="large" shape="square" block={false} />
        <Space>
          <Skeleton.Button active size="large" shape="circle" block={false} />
          <Skeleton.Button active size="large" shape="circle" block={false} />
          <Skeleton.Button active size="large" shape="circle" block={false} />
        </Space>
        <Space>
          <Skeleton.Button active size="large" shape="square" block={false} />
          <Skeleton.Button active size="large" shape="square" block={false} />
        </Space>
      </Flex>
    </Flex>
  );
};

export default SkeletonLoader;
