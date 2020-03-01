import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CreatingTest from './CreatingTest';
import { addGender, addTitle, addPicture } from './../../redux/reducers/testReducer';

const CreatingTestContainer = ({ addGender, addTitle, addPicture, test }) => {
    useEffect(() => {
        console.log(test);
    }, [test])


    

    return <CreatingTest
        test={test}
        addGender={addGender}
        addTitle={addTitle}
        addPicture={addPicture} />
}


const mapStateToProps = (state) => {
    return {
        test: state.testScreen.test
    }
};

export default connect(mapStateToProps, { addGender, addTitle, addPicture })(CreatingTestContainer);