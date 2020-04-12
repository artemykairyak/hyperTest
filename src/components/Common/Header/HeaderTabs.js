import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import generalStyles from '../generalStyles.module.css';

const HeaderTabs = ({activeTab, handleChange, disabledTabs}) => {
    return (
        <AppBar position="static" color="default" >
            <Tabs
                className={generalStyles.tabs}
                value={activeTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab disabled={disabledTabs.includes(0)} label="Все тесты"/>
                <Tab disabled={disabledTabs.includes(1)} label="Мои тесты"/>
                <Tab disabled={disabledTabs.includes(2)} label="Создать тест"/>
            </Tabs>
        </AppBar>
    )
};

export default HeaderTabs;
