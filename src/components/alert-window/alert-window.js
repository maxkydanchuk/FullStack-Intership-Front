import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay, Button,
} from '@chakra-ui/react'

const AlertWindow = ({alertIsOpen, alertOnClose, token, dispatchDeletePerson, person = {}}) => {

    const { _id, name } = person
    // alertIsOpen={alertIsOpen}
    // setAlertIsOpen={setAlertIsOpen}
    // alertOnClose={alertOnClose}
    // dispatchDeletePerson={dispatchDeletePerson}
    // token={token}

    const cancelRef = React.useRef()

    const dispatchAndClose = () => {
        dispatchDeletePerson(_id, token);
        alertOnClose();
    }

    return (
        <>
            <AlertDialog
                isOpen={alertIsOpen}
                leastDestructiveRef={cancelRef}
                onClose={alertOnClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete {name}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={alertOnClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red'  ml={3} onClick={ () => dispatchAndClose()}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default AlertWindow;