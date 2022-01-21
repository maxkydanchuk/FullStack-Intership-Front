import {React} from "react";
import {Flex} from "@chakra-ui/react";
import ErrorIndicator from "../error-indicator";
import PeoplePageItem from "./people-data-grid-item";
import DataGridHeader from "../data-grid-header";

const PeopleDataGrid = (props) => {

    const {
        peopleData, error, onSortChange, sortOrder, sortColumn, dispatchDeletePerson, token, isOpen,
        onClose, onEditItem, onOpen, isAuthenticated, onDeleteItem, onCreateItem, label
    } = props

    const buttons = [
        {name: "name", label: "Name"},
        {name: "birth_year", label: "Birth Year"},
        {name: "gender", label: "Gender"},
        {name: "eye_color", label: "Eye Color"},
        {name: "height", label: "Height"},
    ];

    if (error) {
        return <ErrorIndicator/>;
    }
    const elements = peopleData.map((item) => {
        const {_id} = item;

        return (
            <Flex
                key={_id}
                className="table__row"
                align="center"
                justify="center"
                textAlign={"center"}
                // borderBottom="1px solid rgba(224, 224, 224, 1)"
                color="rgb(49, 47, 47)"
            >
                <PeoplePageItem
                    key={_id}
                    {...item}
                    dispatchDeletePerson={dispatchDeletePerson}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    onEditItem={onEditItem}
                    onDeleteItem={onDeleteItem}
                    token={token}
                    isAuthenticated={isAuthenticated}
                />
            </Flex>
        );
    });
    return (
        <>
            <DataGridHeader
                onSortChange={onSortChange}
                sortOrder={sortOrder}
                sortColumn={sortColumn}
                buttons={buttons}
                isAuthenticated={isAuthenticated}
                onCreateItem={onCreateItem}
                label={label}
            />
            <Flex className="table__row_wrapper" direction="column">
                {" "}
                {elements}
            </Flex>
        </>
    );
};

export default PeopleDataGrid;
