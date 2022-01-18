import React from "react";
import { Box, Button } from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";

const PeopleDataGridItem = ({_id, name, birthYear, eyeColor, gender, height, onEditItem, isAuthenticated, onDeleteItem }) => {

    const person = {
        _id,
        name,
        birthYear,
        eyeColor,
        gender,
        height
    }


    return (
        <>
            <Box className="table__row_year" flex="2" pt="8" pb="8">
                {name}
            </Box>
            <Box className="table__row_category" flex="2" pt="8" pb="8">
                {birthYear}
            </Box>
            <Box className="table__row_firstname" flex="2" pt="8" pb="8">
                {gender}
            </Box>
            <Box className="table__row_lastname" flex="2" pt="8" pb="8">
                {eyeColor}
            </Box>
            <Box className="table__row_fullname" flex="2" pt="8" pb="8">
                {height}
            </Box>
            {isAuthenticated &&  <Button  colorScheme='teal' variant='link' flex="1" onClick={ () => onEditItem(person)}>
                Edit <EditIcon/>
            </Button>}
            {isAuthenticated &&  <Button  colorScheme='teal' variant='link' flex="1" onClick={() => onDeleteItem(person)}>
                Delete <DeleteIcon/>
            </Button>}
        </>
    );
};

export default PeopleDataGridItem;
