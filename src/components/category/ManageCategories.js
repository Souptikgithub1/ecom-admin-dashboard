import './ManageCategories.css'
import React, {useEffect, useState} from "react";
import CategoryTree from "../category-tree/CategoryTree";
import {useAppContext} from "../../context/AppContext";
import CategoryTableView from "../../util-components/categoryTable/CategoryTableView";
import {camelToSpace, createCategoryTree} from "../../utils/CommonUtils";
import CardComponent from "../../util-components/card-component/CardComponent";
import Modal from "../../util-components/modal/Modal";
import AddCategory from "../add-category/AddCategory";
import UpdateCategory from "../update-category/UpdateCategory";


const ManageCategories = () => {

    const {categories} = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [catTreeData, setCatTreeData] = useState([]);

    const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [updateCategoryModalOpen, setUpdateCategoryModalOpen] = useState(false);
    const [categoryUpdateInitData, setCategoryUpdateInitData] = useState(null);

    useEffect(() => {
        const catTree = createCategoryTree(categories)
        setCatTreeData(catTree)

        if (!selectedCategory) {
            setSelectedCategory(catTree[0])
        }

    }, [categories, selectedCategory])


    const handleOnComplete = () => {
    }

    const handleUpdateModalOpen = (e) => {
        setUpdateCategoryModalOpen(true)
        setCategoryUpdateInitData(e)
        console.log(e);
    }

    const handleOpenDeleteCategoryAlert = (e) => {
        console.log(e)
    }


    return <div className='container'>
        <CardComponent iconName='category' headerText='Manager Category'>
            <div className="tree-view-category">
                <CategoryTree
                    treeData={catTreeData}
                    onSelectCategory={setSelectedCategory}
                />
            </div>
            <div className="category-edit">
                {!!selectedCategory
                    ? <CategoryTableView
                        tableHeaders={Object.keys(selectedCategory).filter(key => !['children', 'parentCategoryId', 'categoryId'].includes(key)).map((key, index) => { return { id: key, numeric: !!index , disablePadding: false, label: camelToSpace(key) } })}
                        rows={[...selectedCategory['children']]}
                        defaultSortCol={'categoryName'}
                        colsNotToShow={['children', 'parentCategoryId', 'categoryId']}
                        selectedCategory={selectedCategory}
                        handleClickEditBtn={handleUpdateModalOpen}
                        handleClickHeaderBtn={setAddCategoryModalOpen}
                        headerBtnName='Add Child'
                        handleClickDeleteBtn={handleOpenDeleteCategoryAlert}
                    />
                    : ''}

            </div>
        </CardComponent>
        <Modal
            open={addCategoryModalOpen}
            setOpen={setAddCategoryModalOpen}
            header={`add child for ${selectedCategory?.categoryName}`}>
            <div className='add-category-form-container'>
                <AddCategory
                    setModalOpen={setAddCategoryModalOpen}
                    selectedCategory={selectedCategory}
                    onComplete={handleOnComplete}
                />
            </div>
        </Modal>

        <Modal
            open={updateCategoryModalOpen}
            setOpen={setUpdateCategoryModalOpen}
            header={`Update ${categoryUpdateInitData?.categoryName}`}>
            <div className='add-category-form-container'>
                <UpdateCategory
                    setModalOpen={setUpdateCategoryModalOpen}
                    initData={categoryUpdateInitData} />
            </div>
        </Modal>
    </div>
}

export default ManageCategories