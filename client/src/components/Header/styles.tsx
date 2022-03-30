import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  line-height: 80px;
  border-bottom: solid ${(props) => props.theme.colors.detailColor} 4px;
  
  @media screen and (min-width: 768px) {
    justify-content: center;
  }
      
  .link {
    text-decoration: none;
    padding: 0 10px;
    color: ${(props) => props.theme.colors.secondaryColor};
    display: inline-block;
    width: 100%;
    cursor: pointer;
    font-size: 21px;
  }
`

export const Tittle = styled.h1`
  display: none;

  @media screen and (min-width: 768px) {
    font-family: ${(props) => props.theme.fontFamily.primaryFont};
    color: ${(props) => props.theme.colors.primaryColor};
    display: block;
    font-size: 28px;
  }
  
`

export const Navigation = styled.nav`
  font-family: ${(props) => props.theme.fontFamily.primaryFont};
  display: flex;
`

export const Logo = styled.img`
  display: none;

  @media screen and (min-width: 768px) {
    margin: 15px 10px 15px 0;
    height: 50px;
    width: auto;
    display: block;
  }
`

export const Image = styled.img`
  filter: invert(84%) sepia(32%) saturate(642%) hue-rotate(163deg) brightness(104%) contrast(97%);
  margin-right: 10px;
`

export const LinkBox = styled.div`
  :active {
    color: #021114;
    text-shadow: none;
    background-color: ${(props) => props.theme.colors.primaryColor};
  }
`