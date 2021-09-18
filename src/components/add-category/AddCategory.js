import TextInput from "../../util-components/text-input/TextInput";
import {
    Button,
    Switch
} from "@material-ui/core";
import React, {useState} from "react";
import '../../util-components/text-input/TextInput.css'
import './AddCategory.css'
import {useAppContext} from "../../context/AppContext";


const AddCategory = ({setModalOpen, onComplete, selectedCategory}) => {

    const {addCategory} = useAppContext()

    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [activeIndicator, setActiveIndicator] = useState(true);

    const handleAddCategory = (e) => {
        e.preventDefault()
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
      <form onSubmit={handleAddCategory}>
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
          <Button disabled={disableButton()}
                  type='submit'
                  variant="contained"
                  color="secondary" fullWidth>
              Submit
          </Button>
      </form>
  </React.Fragment>
}

export default AddCategory