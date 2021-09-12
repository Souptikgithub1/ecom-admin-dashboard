import TextInput from "../../util-components/text-input/TextInput";
import {
    Button,
    InputLabel,
    Switch
} from "@material-ui/core";
import React, {useState} from "react";
import '../../util-components/text-input/TextInput.css'
import './AddCategory.css'
import SelectDropDown from "../../util-components/SelectDropDown/SelectDropDown";
import Loader from "../../util-components/loader/Loader";
import {useAppContext} from "../../context/AppContext";


const AddCategory = ({setModalOpen}) => {

    const {setLoading} = useAppContext()

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryDepth, setCategoryDepth] = useState(0);
    const [activeIndicator, setActiveIndicator] = useState(false);

    const handleAddCategory = () => {
        const category = {categoryName, categoryDescription, categoryDepth, activeIndicator}
        console.log(category)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setModalOpen(false)
        }, 3000)
    }

    const disableButton = () => {
        return !categoryName || !categoryDescription
    }

  return <React.Fragment>
          <TextInput id="standard-basic" label="Enter Category Name" color='secondary' onChange={(e) => setCategoryName(e)}/>
          <TextInput id="standard-basic" label="Enter Category Description" color='secondary' onChange={(e) =>setCategoryDescription(e)}/>
          <InputLabel id="demo-simple-select-label" style={{width: '100%'}}>Category Depth</InputLabel>
        <SelectDropDown
            categoryDepth={categoryDepth}
            setCategoryDepth={setCategoryDepth}
            menuList={[...new Array(4)]}
        />

      <div className='switch-container'>
          <span>Active</span>
          <Switch
              checked={activeIndicator}
              onChange={(e) => setActiveIndicator(!activeIndicator)}
              name="activeIndicator"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
      </div>
      <Button disabled={disableButton()} variant="contained" color="secondary" fullWidth onClick={handleAddCategory}>
          Submit
      </Button>
  </React.Fragment>
}

export default AddCategory