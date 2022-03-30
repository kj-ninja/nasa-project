import styled from "styled-components";

export const ContentWindow = styled.div`
  width: 50%;
  height: fit-content;
  border: solid ${(props) => props.theme.colors.detailColor} 1px;
  padding: 20px;
`