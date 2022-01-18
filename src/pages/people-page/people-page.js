import {useDispatch, useSelector} from "react-redux";
import {React, useEffect, useState} from "react";
import {deletePersonThunk, fetchPeopleData, resetStore} from "../../redux/people/peopleActions";
import PeopleDataGrid from "../../components/people-data-grid";
import PageNavbar from "../../components/page-navbar";
import BottomButtons from "../../components/bottom-buttons";
import PeopleModal from "../../components/people-modal";
import AlertWindow from "../../components/alert-window/alert-window";
import {useDisclosure} from "@chakra-ui/react";


const PeoplePage = ({
                        onSortChange,
                        sortOrder,
                        setOrder,
                        sortColumn,
                        onSearchChange,
                        inputValue,
                        dispatchSetCurrentPage, isAuthenticated
                    }) => {
    const dispatch = useDispatch();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [alertIsOpen, setAlertIsOpen] = useState(false)
    const alertOnClose = () => setAlertIsOpen(false)

    const peopleStore = useSelector((state) => ({
        peopleData: state.people.data,
        peopleError: state.people.error,
        peopleLoading: state.people.loading,
        peopleCurrentPage: state.people.currentPage,
        peopleTotalPageCount: state.people.totalCount,
    }));

    const authStore = useSelector((state) => ({
        token: state.auth.token
    }));

    let {
        peopleData = [],
        peopleError,
        peopleLoading,
        peopleCurrentPage,
        peopleTotalPageCount,
    } = peopleStore;

    let {
        token
    } = authStore;

    const dispatchDeletePerson = (id, token) => {
        dispatch(deletePersonThunk(id, token));
    };

    useEffect(() => {
        dispatch(fetchPeopleData({sortOrder, sortColumn, inputValue, currentPage: peopleCurrentPage}, peopleData));
    }, [sortOrder, sortColumn, inputValue, peopleData.length, peopleCurrentPage]);

    useEffect(() => {
        return () => {
            dispatch(resetStore());
        }
    }, [])

    const [itemToEdit, setItemToEdit] = useState();
    const [itemToDelete, setItemToDelete] = useState();

    const handleEditItem = (item) => {
        setItemToEdit(item);
        onOpen();
    }

    const handleDeleteItem = (item) => {
        setItemToDelete(item);
        setAlertIsOpen(true);
    }

    const label = 'person'
    return (
        <>
            <PageNavbar
                onSearchChange={onSearchChange}
                inputValue={inputValue}
                onCreateItem={handleEditItem}
                label={label}
                isAuthenticated={isAuthenticated}
            />
            <PeopleModal
                isOpen={isOpen}
                onClose={onClose}
                person={itemToEdit}
                token={token}
            />
            <AlertWindow
                alertIsOpen={alertIsOpen}
                setAlertIsOpen={setAlertIsOpen}
                alertOnClose={alertOnClose}
                person={itemToDelete}
                dispatchDeletePerson={dispatchDeletePerson}
                token={token}
            />
            <PeopleDataGrid
                peopleData={peopleData}
                error={peopleError}
                onSortChange={onSortChange}
                sortOrder={sortOrder}
                setOrder={() => setOrder}
                sortColumn={sortColumn}
                dispatchDeletePerson={dispatchDeletePerson}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
                token={token}
                isAuthenticated={isAuthenticated}
            />
            <BottomButtons
                currentPage={peopleCurrentPage}
                totalPageCount={peopleTotalPageCount}
                dispatchSetCurrentPage={dispatchSetCurrentPage}
            />
        </>
    );
};

export default PeoplePage;
