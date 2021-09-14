import {
    Button,
    Card,
    CardContent
} from "@material-ui/core";
import './ManageCategories.css'
import {useEffect, useState} from "react";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../../util-components/modal/Modal";
import AddCategory from "../add-category/AddCategory";
import axios from 'axios';
import {CATEGORIES_URL} from "../../utils/ApiConstants";
import CategoryTree from "../category-tree/CategoryTree";
import {useAppContext} from "../../context/AppContext";
import TableView from "../../util-components/table/TableView";
import {camelToSpace} from "../../utils/CommonUtils";


const parentCats = ['Electronics', 'Tvs & Appliances', 'Men', 'Women']

const ManageCategories = () => {

    const {setLoading} = useAppContext();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [categories, setCategories] = useState([]);

    const [catTreeData, setCatTreeData] = useState([]);

    useEffect(() => {
        setLoading(true)
        getCategories()
    }, [])

    const handleOnComplete = () => {
        getCategories()
    }


    const getCategories = () => {
        axios.get(CATEGORIES_URL).then(res => {
            setCategories(res.data)
            const catTree = [];
            res.data.filter(cat => cat.depth === 0)
                .forEach(cat0 => {

                    cat0['children'] = []
                    catTree.push(cat0)
                    res.data.filter(cat => cat.depth === 1 && cat.parentCategoryId === cat0.categoryId)
                        .forEach(cat1 => {

                            cat1['children'] = []
                            cat0['children'].push(cat1)
                            res.data.filter(cat => cat.depth === 2 && cat.parentCategoryId === cat1.categoryId)
                                .forEach(cat2 => {

                                    cat2['children'] = []
                                    cat1['children'].push(cat2)
                                    res.data.filter(cat => cat.depth === 3 && cat.parentCategoryId === cat2.categoryId)
                                        .forEach(cat3 => {

                                            cat3['children'] = []
                                            cat2['children'].push(cat3)
                                        })
                                })
                        })
                })
            setCatTreeData(catTree)
            setLoading(false)
        })
    }


    return <div className='container'>

        <div className='add-category-container'>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => setModalOpen(true)}
            >Add Category</Button>
        </div>

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
                        ? <TableView
                            tableHeaders={Object.keys(selectedCategory)
                                .filter(key => !['children', 'parentCategoryId', 'categoryId'].includes(key))
                                .map((key, index) => { return { id: key, numeric: !!index , disablePadding: false, label: camelToSpace(key) } })}
                            rows={[...selectedCategory['children']]}
                            headerName={selectedCategory.categoryName} />
                        : ''}

                </div>
            </CardContent>
        </Card>

        <Modal
            open={modalOpen}
            setOpen={setModalOpen}
            header='Add Category'>
            <div className='add-category-form-container'>
                <AddCategory
                    setModalOpen={setModalOpen}
                    onComplete={handleOnComplete}
                />
            </div>
        </Modal>
    </div>
}

export default ManageCategories