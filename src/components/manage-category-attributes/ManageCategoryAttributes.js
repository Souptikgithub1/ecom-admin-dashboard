import React, {useEffect, useState} from 'react';
import CardComponent from "../../util-components/card-component/CardComponent";
import CategoryTree from "../category-tree/CategoryTree";
import {useAppContext} from "../../context/AppContext";
import {camelToSpace, createCategoryTree} from "../../utils/CommonUtils";
import CustomTableView from "../../util-components/categoryTable/CustomTableView";
import axios from "axios";
import {CATEGORY_ATTRIBUTES_SEARCH_URL} from "../../utils/ApiConstants";
import AddCategoryAttribute from "./add-category-attribute/AddCategoryAttribute";

const colsNotToShow = [
    'children',
    'parentCategoryId',
    'categoryId',
    'categoryAttributeId',
    'categoryName',
    'categoryDescription',
    'attributeId',
    'depth',
    'activeIndicator'
]

const ManageCategoryAttributes = () => {

    const {categories} = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [catTreeData, setCatTreeData] = useState([]);

    const [categoryAttributes, setCategoryAttributes] = useState([])

    const [categoryAttributeFormModalOpen, setCategoryAttributeFormModalOpen] = useState(false)

    useEffect(() => {
        const catTree = createCategoryTree(categories)
        setCatTreeData(catTree)

        if (!selectedCategory) {
            setSelectedCategory(catTree[0])
        }

    }, [categories, selectedCategory])

    useEffect(() => {
        if (!!selectedCategory) {
            axios.post(`${CATEGORY_ATTRIBUTES_SEARCH_URL}/${selectedCategory.categoryId}`)
                .then(res => {
                    console.log(res.data)
                    setCategoryAttributes(res.data)
                })
        }
    }, [selectedCategory])

    const handleUpdateModalOpen = (e) => {
      console.log(e)
    }

    const handleOpenDeleteCategoryAlert = (e) => {
        console.log(e)
    }

    const handleOpenAddModal = () => {
        console.log('open')
        setCategoryAttributeFormModalOpen(true)
    }

  return <React.Fragment>
      <CardComponent headerText='Manage Category Attributes' iconName='add_to_photos' >
          <div className="tree-view-category">
              <CategoryTree
                  treeData={catTreeData}
                  onSelectCategory={setSelectedCategory}
              />
          </div>
          <div className="add-category-attribute">
              {
                  <CustomTableView
                      tableHeaders={!categoryAttributes || categoryAttributes.length <= 0 ? '' : Object.keys(categoryAttributes[0])
                          .filter(key => !colsNotToShow
                              .includes(key)).map((key, index) => { return { id: key, numeric: !!index , disablePadding: false, label: camelToSpace(key) } })}
                      rows={[...categoryAttributes]}
                      defaultSortCol={'categoryName'}
                      colsNotToShow={colsNotToShow}
                      headerName={`Attributes associated with ${selectedCategory?.categoryName}`}
                      handleClickEditBtn={handleUpdateModalOpen}
                      handleClickHeaderBtn={handleOpenAddModal}
                      headerBtnName='Add Attribute'
                      handleClickDeleteBtn={handleOpenDeleteCategoryAlert}
                  />
                  }
          </div>

          <AddCategoryAttribute
              header='Add Attribute'
              setOpen={setCategoryAttributeFormModalOpen}
              open={categoryAttributeFormModalOpen} />
      </CardComponent>
  </React.Fragment>
}

export default ManageCategoryAttributes