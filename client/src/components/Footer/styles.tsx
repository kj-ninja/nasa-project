import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  line-height: 40px;
  border-top: solid ${(props) => props.theme.colors.detailColor} 1px;
  
  .spanPosition {
    margin: 10px 0;
  }
`