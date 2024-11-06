'use client';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { getItems } from '../../constants';
import { MainContainer, Title } from './AccordionStyled';

const Accordion = () => {
  const { token } = theme.useToken();

  return (
    <MainContainer theme={token}>
      <Title>FAQs</Title>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems()}
      />
    </MainContainer>
  );
};

export default Accordion;
