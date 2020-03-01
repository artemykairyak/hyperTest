import React from "react";
import Box from "@material-ui/core/Box";

import TestsContainer from "../Tests/TestsContainer";
import TestContainer from "../Test/TestContainer";

const MainScreen = ({ testMode }) => {
    return (
        <>
            <Box component="div" m={1}>
                {!testMode ? <TestsContainer /> : <TestContainer />}
            </Box>
        </>

    )
};

export default MainScreen;
