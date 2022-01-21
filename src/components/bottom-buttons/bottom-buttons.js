import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { createPages } from "../../utils/pageCreator";
import { pageSize } from "../../configs/config";
import "./main.css";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";

const BottomButtons = ({
  currentPage,
  totalPageCount,
  dispatchSetCurrentPage,
}) => {
  const pages = [];
  const pageCount = Math.ceil(totalPageCount / pageSize);
  createPages(pages, pageCount, currentPage);
  const elements = pages.map((item, index) => {
    return (
      <span
        key={index}
        className={currentPage === item ? "current-page" : "page"}
        onClick={() => dispatchSetCurrentPage(item)}
      >
        {item + 1}
      </span>
    );
  });

  return (
    <Flex className="bottom__buttons" align="center" justify="center" mt="2" >
      <Button
        colorScheme="linkedin"
        variant="link"
        display="block"
        onClick={() => dispatchSetCurrentPage(0)}
      >
        <ChevronLeftIcon w="5x" h="5"/>
      </Button>
      <div className="pages">{elements}</div>
      <Button
        colorScheme="teal"
        outline="none"
        variant="link"
        display="block"
        onClick={() => dispatchSetCurrentPage(pageCount - 1)}
      >
        <ChevronRightIcon w="5x" h="5"/>
      </Button>
    </Flex>
  );
};

export default BottomButtons;
