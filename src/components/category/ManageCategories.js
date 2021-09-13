import {
    alpha, Button,
    Card,
    CardContent, Collapse, makeStyles, SvgIcon, withStyles,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import './ManageCategories.css'
import {TreeItem, TreeView} from "@material-ui/lab";
import {useSpring, animated} from "react-spring";
import {useEffect, useState} from "react";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../../util-components/modal/Modal";
import AddCategory from "../add-category/AddCategory";
import axios from 'axios';
import {CATEGORIES_URL} from "../../utils/ApiConstants";
import CategoryTree from "../category-tree/CategoryTree";



const treeData = [
    {
        name: 'Global Item',
        children: [
            {
                name: 'Electronics',
                children: [
                    {
                        name: 'Mobiles',
                        children: [
                            {name: 'Mi'},
                            {name: 'Realme'},
                            {name: 'OPPO'}
                        ]
                    },
                    {
                        name: 'Laptops',
                        children: [
                            {name: 'Lightweight Laptops'},
                            {name: 'Gaming Laptops'}
                        ]
                    }
                ]
            },
            {
                name: 'Tv & Appliances',
                children: [
                    {name: 'Television'},
                    {
                        name: 'Air Conditioners',
                        children: [
                            {name: 'Inverter ACs'},
                            {name: 'Window ACs'},
                            {name: 'Split ACs'}
                        ]
                    },
                    {name: 'Kitchen Appliances'}
                ]
            },
            {name: 'Men'},
            {name: 'Women'}
        ]
    }
]

const parentCats = ['Electronics', 'Tvs & Appliances', 'Men', 'Women']

const ManageCategories = () => {


    const [category, setCategory] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
    }, [])


    const getCategories = () => {
        axios.get(CATEGORIES_URL).then(res => {
            setCategories(res.data)

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
                        treeData={treeData}
                        onSelectCategory={setCategory}
                        />
                </div>
                <div className="category-edit">
                    Edit {category}
                    {categories.map(cat => <div key={cat.categoryId}>{cat.categoryName}</div>)}
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
                    onComplete={(event) => getCategories()}
                />
            </div>
        </Modal>
    </div>
}

export default ManageCategories