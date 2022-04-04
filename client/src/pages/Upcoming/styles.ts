import styled from "styled-components";

export const ContentWindow = styled.div`
  width: 50%;
  height: fit-content;
  border: solid ${(props) => props.theme.colors.detailColor} 1px;
  padding: 20px;
`

export const MissionTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`

export const Thead = styled.thead`
  color: ${(props) => props.theme.colors.secondaryColor};
  text-align: left;
  font-family: ${(props) => props.theme.fontFamily.primaryFont};
  font-weight: bold;
  white-space: nowrap;
`