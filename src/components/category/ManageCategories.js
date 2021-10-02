import './ManageCategories.css'
import {useEffect, useState} from "react";
import CategoryTree from "../category-tree/CategoryTree";
import {useAppContext} from "../../context/AppContext";
import CategoryTableView from "../../util-components/categoryTable/CategoryTableView";
import {camelToSpace, createCategoryTree} from "../../utils/CommonUtils";
import CardComponent from "../../util-components/card-component/CardComponent";


const ManageCategories = () => {

    const {categories} = useAppContext();

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [catTreeData, setCatTreeData] = useState([]);

    useEffect(() => {
        const catTree = createCategoryTree(categories)
        setCatTreeData(catTree)

        if (!selectedCategory) {
            setSelectedCategory(catTree[0])
        }

    }, [categories, selectedCategory])




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
                        tableHeaders={Object.keys(selectedCategory)
                            .filter(key => !['children', 'parentCategoryId', 'categoryId'].includes(key))
                            .map((key, index) => { return { id: key, numeric: !!index , disablePadding: false, label: camelToSpace(key) } })}
                        rows={[...selectedCategory['children']]}
                        defaultSortCol={'categoryName'}
                        colsNotToShow={['children', 'parentCategoryId', 'categoryId']}
                        selectedCategory={selectedCategory} />
                    : ''}

            </div>
        </CardComponent>
    </div>
}

export default ManageCategories