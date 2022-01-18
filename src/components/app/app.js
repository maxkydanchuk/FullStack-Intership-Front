import {React, useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Box, useDisclosure} from "@chakra-ui/react";
import AppHeader from "../app-header";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../../redux/people/peopleActions";
import StarshipsPage from "../../pages/starships-page";
import PeoplePage from "../../pages/people-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import {loginSuccess, setIsAuthenticated} from "../../redux/auth/authActions";
import LoginDrawer from "../login-drawer/login-drawer";
import ChatPage from "../../pages/chat-page/chat-page";
import MainPage from "../main-page/main-page";


function App() {
    const [inputValue, setSearchValue] = useState("");
    const [sortOrder, setOrder] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const dispatch = useDispatch();
    const {isOpen, onOpen, onClose} = useDisclosure()

    const authStore = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated
    }));

    let {
        isAuthenticated
    } = authStore;


    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('user');

        if (token && email) {
            dispatch(loginSuccess(token, email));
            dispatch(setIsAuthenticated(true));
        }
    }, [])

    const onSortChange = (newSortColumn, newSortOrder) => {
        if (sortColumn === newSortColumn) {
            setOrder(newSortOrder);
        } else {
            setOrder("asc");
        }

        setSortColumn(newSortColumn);
    };

    const onSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        dispatch(setIsAuthenticated(false));
        dispatch(loginSuccess())
    };

    const dispatchSetCurrentPage = (page) => {
        dispatch(setCurrentPage(page));
    };
    return (
        <Router>
                <Box style={{"height": " 100vh"}}>
                    <LoginDrawer
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                    />
                    <Box
                        className="table__wrapper"
                        border="1px solid rgba(224, 224, 224, 1)"
                        borderBottom="none"
                        borderRadius="4"
                    >
                        <AppHeader onLogout={onLogout} isAuthenticated={isAuthenticated} onOpen={onOpen}/>
                        <Routes>
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/register' element={<RegisterPage/>}/>
                            <Route path="/" element={<MainPage/>}/>
                            <Route
                                path="/people"
                                element={
                                    <PeoplePage
                                        onSortChange={onSortChange}
                                        sortOrder={sortOrder}
                                        setOrder={() => setOrder}
                                        sortColumn={sortColumn}
                                        onSearchChange={onSearchChange}
                                        inputValue={inputValue}
                                        dispatchSetCurrentPage={dispatchSetCurrentPage}
                                        isAuthenticated={isAuthenticated}
                                    />
                                }
                            />
                            <Route path="/chat"
                                   element={<ChatPage/>}
                            />
                            <Route
                                path="/starships"
                                element={
                                    <StarshipsPage
                                        onSortChange={onSortChange}
                                        sortOrder={sortOrder}
                                        setOrder={() => setOrder}
                                        sortColumn={sortColumn}
                                        onSearchChange={onSearchChange}
                                        inputValue={inputValue}
                                        dispatchSetCurrentPage={dispatchSetCurrentPage}
                                        isAuthenticated={isAuthenticated}
                                    />
                                }
                            />
                        </Routes>
                    </Box>
                </Box>
        </Router>
    );
}

export default App;
