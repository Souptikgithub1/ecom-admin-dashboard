import {
    Button,
    Switch
} from "@material-ui/core";
import React, {useState} from "react";
import '../../util-components/text-input/TextInput.css'
import './AddCategory.css'
import {useAppContext} from "../../context/AppContext";
import CustomInput from "../../creative-components/components/CustomInput/CustomInput";


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
          <div className="add-category-form-container">
              <CustomInput
                  labelText="Enter Category Name"
                  id="category_name"
                  formControlProps={{fullWidth: true,}}
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
              />

              <CustomInput
                  labelText="Enter Category Description"
                  id="category_description"
                  formControlProps={{fullWidth: true,}}
                  value={categoryDescription}
                  onChange={(e) =>setCategoryDescription(e.target.value)}
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
              <Button disabled={disableButton()}
                      type='submit'
                      variant="contained"
                      color="secondary" fullWidth>
                  Submit
              </Button>
          </div>
      </form>
  </React.Fragment>
}

export default AddCategory