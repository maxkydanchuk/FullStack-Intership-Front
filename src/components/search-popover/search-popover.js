import React from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    Portal, Input, Box
} from '@chakra-ui/react'
import {Search2Icon} from "@chakra-ui/icons";

const SearchPopover = ({inputValue, onSearchChange}) => {

    return (
        <Popover placement="bottom-start">
            <PopoverTrigger>
                <Search2Icon/>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow/>
                    <PopoverCloseButton/>
                    <Box
                        w="100%"
                    >
                        <Input
                            type="search"
                            placeholder="Search"
                            size="md"
                            variant="filled"
                            maxW="90%"
                            value={inputValue}
                            onChange={onSearchChange}
                        />
                    </Box>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}

export default SearchPopover;