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


const AddCategory = ({setModalOpen, parentCategories}) => {

    const {setLoading} = useAppContext()

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryDepth, setCategoryDepth] = useState(0);
    const [activeIndicator, setActiveIndicator] = useState(false);
    const [parentCategory, setParentCategory] = useState('');

    const handleAddCategory = () => {
        const category = {categoryName, categoryDescription, categoryDepth, activeIndicator}
        console.log(category)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setModalOpen(false)
            clearFormValues()
        }, 3000)
    }

    const clearFormValues = () => {
        setCategoryName('')
        setCategoryDescription('')
        setCategoryDepth(0)
        setParentCategory('')
        setActiveIndicator(false)
    }

    const disableButton = () => {
        return !categoryName || !categoryDescription
    }

  return <React.Fragment>
            <TextInput id="standard-basic" label="Enter Category Name" color='secondary' value={categoryName} onChange={(e) => setCategoryName(e)}/>
            <TextInput id="standard-basic" label="Enter Category Description" color='secondary' value={categoryDescription} onChange={(e) =>setCategoryDescription(e)}/>
            <InputLabel id="demo-simple-select-label" style={{width: '100%'}}>Category Depth</InputLabel>
      <SelectDropDown
          labelId="cat-depth-id"
          id="cat-depth-id"
          value={categoryDepth}
          setValue={setCategoryDepth}
          menuList={[0,1,2,3,4]}
      />

      {categoryDepth > 0
          ?
          <React.Fragment>
              <InputLabel id="demo-simple-select-label" style={{width: '100%'}}>Parent Category</InputLabel>
              <SelectDropDown
                  labelId="parent-cat-id"
                  id="parent-cat-id"
                  value={parentCategory}
                  setValue={setParentCategory}
                  menuList={parentCategories}
              />
          </React.Fragment>
          : ''
      }

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