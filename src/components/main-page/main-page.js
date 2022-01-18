import {React} from "react";
import {Box, Flex, Image} from "@chakra-ui/react";

const MainPage = () => {

    return (
        <Flex
        direction="column"
        align="center"
        >
            <Box mt="5"> Welcome to Star Wars database</Box>
            <Box boxSize="s ">
                <Image
                    src="https://cdn.images.express.co.uk/img/dynamic/36/590x/Han-Solo-and-Chewie-633918.jpg"
                    alt="Han-Solo-Chewbacca"
                    mt="5"
                />
            </Box>
        </Flex>
    )
}

export default MainPage;