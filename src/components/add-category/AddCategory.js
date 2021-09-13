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


const AddCategory = ({setModalOpen}) => {

    const {setLoading} = useAppContext()

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryDepth, setCategoryDepth] = useState(0);
    const [activeIndicator, setActiveIndicator] = useState(false);
    const [parentCategoryId, setParentCategoryId] = useState('');

    const [parentCategoryMenuList, setParentCategoryMenuList] = useState([]);

    const handleAddCategory = () => {
        const category = {categoryName, categoryDescription, depth: categoryDepth, activeIndicator, parentCategoryId}
        console.log(category)
        setLoading(true)
        axios.post(CATEGORIES_URL, category)
            .then(res => {
                console.log(res)

                setLoading(false)
                setModalOpen(false)
                clearFormValues()
            })
    }

    const clearFormValues = () => {
        setCategoryName('')
        setCategoryDescription('')
        setCategoryDepth(0)
        setParentCategoryId('')
        setActiveIndicator(false)
    }

    const disableButton = () => {
        return !categoryName || !categoryDescription
    }

    const handleChangeDepth = (value) => {
        setCategoryDepth(value)
        axios.get(`${GET_CATEGORIES_BY_DEPTH_URL}/`+ (value - 1))
            .then(res => {
                const menuList = []

                res.data.forEach(x => {
                    menuList.push({value: x.categoryId, text: x.categoryName})
                    setParentCategoryMenuList(menuList)
                })
            })
    }

  return <React.Fragment>
            <TextInput id="standard-basic" label="Enter Category Name" color='secondary' value={categoryName} onChange={(e) => setCategoryName(e)}/>
            <TextInput id="standard-basic" label="Enter Category Description" color='secondary' value={categoryDescription} onChange={(e) =>setCategoryDescription(e)}/>
            <InputLabel id="demo-simple-select-label" style={{width: '100%'}}>Category Depth</InputLabel>
      <SelectDropDown
          labelId="cat-depth-id"
          id="cat-depth-id"
          value={categoryDepth}
          onChange={handleChangeDepth}
          menuList={[0,1,2,3,4].map(el => {
              return {value: el, text: el}
          })}
      />

      {categoryDepth > 0
          ?
          <React.Fragment>
              <InputLabel id="demo-simple-select-label" style={{width: '100%'}}>Parent Category</InputLabel>
              <SelectDropDown
                  labelId="parent-cat-id"
                  id="parent-cat-id"
                  value={parentCategoryId}
                  onChange={setParentCategoryId}
                  menuList={parentCategoryMenuList}
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