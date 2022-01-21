import React from "react";
import {Box, Button} from "@chakra-ui/react";
import {ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon} from "@chakra-ui/icons";

function getArrows(order) {
    if (order === "asc") {
        return <ArrowUpIcon/>;
    }
    if (order === "desc") {
        return <ArrowDownIcon/>;
    }
}

const DataGridHeaderRow = ({props}) => {
    const {buttons, sortOrder, onSortChange, sortColumn, isAuthenticated, onCreateItem, label} = props;

    const newOrder = sortOrder === "asc" ? "desc" : "asc";

    const elements = buttons.map(({name, label}) => {
        function sortedArrows() {
            if (sortColumn === name) {
                return getArrows(newOrder);
            } else {
                return <ArrowUpDownIcon/>;
            }
        }
        return (
                <Box
                    key={name}
                    onClick={() => onSortChange(name, newOrder)}
                    cursor="pointer"
                    flex="2"
                    _hover={{
                        // background: "white",
                        color: "teal.500",
                    }}
                    color="white"
                >
                    {label} {sortedArrows()}
                </Box>
        )
    });

    return (
        <>
               {elements}
            {isAuthenticated &&
            <Box flex='2'>
                <Button
                    colorScheme='linkedin'
                    variant='link'
                    onClick={ () => onCreateItem({})}
                >
                    Add new {label}
                </Button>
            </Box>
            }

        </>
    );
};

export default DataGridHeaderRow;
