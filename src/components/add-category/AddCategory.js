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
import {useAppContext} from "../../context/AppContext";
import axios from "axios";
import {CATEGORIES_URL, GET_CATEGORIES_BY_DEPTH_URL} from "../../utils/ApiConstants";


const AddCategory = ({setModalOpen, onComplete, selectedCategory}) => {

    const {setLoading, addCategory} = useAppContext()

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [activeIndicator, setActiveIndicator] = useState(true);

    const handleAddCategory = () => {
        const category = {
            categoryName,
            categoryDescription,
            depth: (selectedCategory.depth+1),
            activeIndicator,
            parentCategoryId: selectedCategory.categoryId
        }
        console.log(category)
        addCategory(category)
            .then(res => {
                console.log(res)
                onComplete(res)
                resetAll()
            })
    }

    const resetAll = () => {
        setModalOpen(false)
        clearFormValues()
    }

    const clearFormValues = () => {
        setCategoryName('')
        setCategoryDescription('')
        setActiveIndicator(true)
    }

    const disableButton = () => {
        return !categoryName || !categoryDescription
    }

  return <React.Fragment>
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
      <Button disabled={disableButton()} variant="contained" color="secondary" fullWidth onClick={handleAddCategory}>
          Submit
      </Button>
  </React.Fragment>
}

export default AddCategory