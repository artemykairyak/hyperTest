import React from "react";
import Box from "@material-ui/core/Box";
import CreatingTestContainer from "../CreatingTest/CreatingTestContainer";
import MyTestsContainer from "../MyTests/MyTestsContainer";
import AllTestsContainer from "../AllTests/AllTestsContainer";

const Tests = ({activeTab}) => {

    if (activeTab === 0) {
            return (
                <Box component="div" m={1}>
                    <AllTestsContainer/>
                </Box>
            )

    }
    if (activeTab === 1) {
            return (
                <Box component="div" m={1}>
                    <MyTestsContainer/>
                </Box>
            )
    }
    if (activeTab === 2) {
        return (
            <Box component="div" m={1}>
                <CreatingTestContainer/>
            </Box>
        )
    }
};


export default Tests;
