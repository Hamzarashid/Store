'use client';
import { HeaderContainer, Subtitle, Title } from './HeaderTextStyled';

const HeaderText = ({ title, subtitle }) => (
  <HeaderContainer>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </HeaderContainer>
);

export default HeaderText;
