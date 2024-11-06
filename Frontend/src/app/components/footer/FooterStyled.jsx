import styled from "styled-components";
export const FooterContainer = styled.div`
  background-color: #1d1d1d;
  color: #ffffff;
  padding: 40px 20px;
`;

export const FooterTitle = styled.h3`
  color: #ffffff;
  margin-bottom: 20px;
  align-items: start;
`;

export const ContactInfo = styled.div`
  margin-bottom: 20px;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
`;

export const Icon = styled.div`
  font-size: 24px;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  li {
    margin-bottom: 10px;
    a {
      color: #ffffff;
      text-decoration: none;
      &:hover {
        color: #e91e63;
      }
    }
  }
`;
