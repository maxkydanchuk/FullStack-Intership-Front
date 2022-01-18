import React from "react";
import {Box} from "@chakra-ui/react";
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
    const {buttons, sortOrder, onSortChange, sortColumn, isAuthenticated} = props;

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
                        background: "white",
                        color: "teal.500",
                    }}
                >
                    {label} {sortedArrows()}
                </Box>
        )
    });

    return (
        <>
               {elements}
                {isAuthenticated && <Box flex='1'/>}
                {isAuthenticated && <Box flex='1'/>}
        </>
    );
};

export default DataGridHeaderRow;
