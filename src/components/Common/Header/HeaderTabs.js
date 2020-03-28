import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import React from "react";

const HeaderTabs = ({activeTab, handleChange}) => {
    return (
        <AppBar position="static" color="default">
            <Tabs
                value={activeTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label="Все тесты"/>
                <Tab label="Мои тесты"/>
                <Tab label="Создать тест"/>
            </Tabs>
        </AppBar>
    )
};

export default HeaderTabs;
