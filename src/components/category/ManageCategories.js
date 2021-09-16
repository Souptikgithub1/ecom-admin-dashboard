import {
    Button,
    Card,
    CardContent
} from "@material-ui/core";
import './ManageCategories.css'
import {useEffect, useState} from "react";
import CategoryTree from "../category-tree/CategoryTree";
import {useAppContext} from "../../context/AppContext";
import CategoryTableView from "../../util-components/categoryTable/CategoryTableView";
import {camelToSpace, createCategoryTree} from "../../utils/CommonUtils";


const ManageCategories = () => {

    const {setLoading, categories} = useAppContext();

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [catTreeData, setCatTreeData] = useState([]);

    useEffect(() => {
        const catTree = createCategoryTree(categories)
        setCatTreeData(catTree)
        setSelectedCategory(catTree[0])

    }, [categories])




    return <div className='container'>
        <Card variant='elevation' className='manage-categories-container'>
            <CardContent className='card-content'>
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
                            selectedCategory={selectedCategory} />
                        : ''}

                </div>
            </CardContent>
        </Card>


    </div>
}

export default ManageCategories