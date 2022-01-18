import { React } from "react";
import { Flex } from "@chakra-ui/react";
import DataGridHeaderRow from "./data-grid-header-row";

const DataGridHeader = (props) => {

  return (
    <Flex
      className="table__header"
      align="center"
      flex='2'
      // justify='center'
      borderBottom="1px solid rgba(224, 224, 224, 1)"
      fontWeight="bold"
      textAlign="center"
      h="20"
    >
      <DataGridHeaderRow props={props}/>
    </Flex>
  );
};

export default DataGridHeader;
