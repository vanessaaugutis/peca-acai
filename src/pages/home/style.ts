import styled from "styled-components";

export const Content = styled.div`
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("https://th.bing.com/th/id/R.d2db326f6c0983424422b5a65e24852b?rik=8UdmbnRFw%2bkNyg&pid=ImgRaw&r=0");

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #FFFFFF;
    position: relative;
    z-index: 1;
  }
`;

export const Button = styled.button`
  background-color: #791D8F;
  color: white;
  width: 50%;
  padding: 10px 20px;
  border: 1px solid #B54FCE;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #B54FCE;
  }
`;
