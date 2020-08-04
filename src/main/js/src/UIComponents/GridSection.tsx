import * as React from "react";
import styled from "styled-components";
import constants from "./constants";
import Popup from "reactjs-popup";

/**
 * Outer container for the grid section.
 * Element hierarchy is something like:
 * <GridSectionContainer>
 *    <StyledGridTitle />
 *    <GridContainer />
 * </GridSectionContainer>
 */
export const GridSectionContainer = styled.div`
  width: calc(100% - 2rem);
  max-width: 50rem;
  overflow-x: auto;
  margin: 1rem 0;
`;

/**
 * A CSS grid container div
 * @prop {Number} columns The number of columns
 */
// Typescript styled-components requires you to specify custom props
// https://styled-components.com/docs/api#using-custom-props
export const GridContainer = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    minmax(2rem, auto)
  );
  border: 1px solid ${constants.DARKER_GREEN};
  width: 100%;
  box-sizing: border-box;
`;

interface RowProps {
  [key: string]: string[];
}

export const HeaderRow = (props: RowProps) => {
  const cells = props.headers.map((header) => (
    <HeaderCell>{header}</HeaderCell>
  ));
  return <>{cells}</>;
};

export const ContentRow = (props: RowProps) => {
  // console.log("styled grid", props.content);
  const cells = props.content.map((content) => <Cell>{content}</Cell>);

  return <>{cells}</>;
};

// interface ListConfigProps {
//   configInfo: Array<{
//     cleanUpPolicy: string;
//     compressionType: string;
//     messageTimeStampType: string;
//     minInsyncReplicas: number;
//   }>;
// }

export const ConfigInfo = (props) => <div>Hello</div>;

export const TopicRow = (props: RowProps) => {
  const cells = props.content.map((content, index) => {
    if (index === 0) {
      return <CellWithPopup popup={<ConfigInfo />}>{content}</CellWithPopup>;
    } else {
      return <Cell>{content}</Cell>;
    }
  });
  return <>{cells}</>;
};

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: ${constants.GREY_GREEN};
  color: white;
  box-sizing: border-box;
`;

const HeaderCell = styled(Cell)`
  font-weight: 400;
  background-color: white;
  color: ${constants.DARKER_GREEN};
`;

interface CellWithPopupProps {
  children: string;
  popup: React.ReactElement;
}

const CellWithPopup = (props: CellWithPopupProps) => {
  return (
    <Popup trigger={<Cell>{props.children}</Cell>} position="right center">
      {props.popup}
    </Popup>
  );
};
