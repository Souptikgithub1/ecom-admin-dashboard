import React, {useEffect, useState} from "react";
import TextInput from "../../util-components/text-input/TextInput";
import {Button, Switch} from "@material-ui/core";

const UpdateCategory = ({initData, setModalOpen}) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [activeIndicator, setActiveIndicator] = useState(true);

    useEffect(() => {
        if (!!initData) {
            setCategoryName(initData.categoryName)
            setCategoryDescription(initData.categoryDescription)
            setActiveIndicator(initData.activeIndicator)
        }
    }, [initData])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(initData);
        setModalOpen(false)
    }

    return <React.Fragment>
        <form onSubmit={handleSubmit}>
            <TextInput id="standard-basic" label="Enter Category Name" color='secondary' value={categoryName} onChange={(e) => setCategoryName(e)}/>
            <TextInput id="standard-basic" label="Enter Category Description" color='secondary' value={categoryDescription} onChange={(e) =>setCategoryDescription(e)}/>
            <div className='switch-container'>
                <span>Active</span>
                <Switch
                    checked={activeIndicator}
                    onChange={(e) => setActiveIndicator(!activeIndicator)}
                    name="activeIndicator"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
            <Button variant="contained" type='submit' color="secondary" fullWidth >
                Submit
            </Button>
        </form>
    </React.Fragment>
}

export default UpdateCategory