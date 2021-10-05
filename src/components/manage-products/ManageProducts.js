import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CardComponent from "../../util-components/card-component/CardComponent";
import CustomInput from "../../creative-components/components/CustomInput/CustomInput";
import './ManageProducts.css'
import {Button, IconButton} from "@material-ui/core";
import $ from 'jquery';
import {PhotoCamera} from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Close';

import {uploadImgPromise} from "../../utils/firebaseUtils";
import {useAppContext} from "../../context/AppContext";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ManageProducts = () => {

    const {addProduct, setLoading} = useAppContext();

    const [selectedTab, setSelectedTab] = useState(0);

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleSelectImages = (files) => {
        const imgs = [];
        /*console.log(files)*/
        Object.keys(files).forEach(key => imgs.push({
            name: files[key].name,
            fileObj: URL.createObjectURL(files[key]),
            file: files[key]
        }) )
        setSelectedImages(prevState => [...prevState, ...imgs])
    }

    const handleUnselectImage = (index) => {
        /*console.log(index)*/
        const imgs = [...selectedImages]
        imgs.splice(index, 1)
        setSelectedImages([...imgs])
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        setLoading(true)
        const uploadPromises = [];
        selectedImages.forEach(img => uploadPromises.push(uploadImgPromise(img)))

        Promise.all(uploadPromises).then(res => {
            const productPayload = {
                    productName,
                    productDescription,
                    price,
                    sellingPrice,
                    rating: 4,
                    images: [...res]
            }
            addProduct(productPayload)
                .then(res => handleChange('', 1))
        })

    }



    return <CardComponent headerText='Manage Products' iconName='add_to_photos' >

        <Box style={{ width: '100%' }}>
            <Box style={{ borderBottom: '1px solid #e1e1e1' }}>
                <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Add Product" {...a11yProps(0)} />
                    <Tab label="View and Products" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={selectedTab} index={0}>
                <form onSubmit={handleSubmitForm}>
                    <div className="form-container">
                        <div className="form-fields-section">
                            <CustomInput
                                autoFoucs='true'
                                labelText="Product Name"
                                id="product_name"
                                formControlProps={{fullWidth: true,}}
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <CustomInput
                                labelText="Product Description"
                                id="product_description"
                                formControlProps={{fullWidth: true,}}
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            />
                            <CustomInput
                                labelText="Product Price"
                                id="product_price"
                                formControlProps={{fullWidth: true,}}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <CustomInput
                                labelText="Selling Price"
                                id="selling_price"
                                formControlProps={{fullWidth: true,}}
                                value={sellingPrice}
                                onChange={(e) => setSellingPrice(e.target.value)}
                            />
                            <input
                                className='js-img-input'
                                accept='image/*'
                                multiple
                                type="file"
                                hidden
                                onChange={(e) => handleSelectImages(e.target.files)}
                                />
                            <div className='upload-img-btn-container'>
                                <Button
                                    style={{width: 'fit-content', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                                    color="secondary"
                                    aria-label="upload picture"
                                    component="span"
                                    onClick={() => $('.js-img-input').click()}>
                                    <PhotoCamera />
                                    <div style={{marginLeft: '0.7rem'}}>upload images</div>
                                </Button>
                            </div>
                            <Button color='secondary' variant='contained' type='submit'>Submit</Button>
                        </div>
                        <div className="image-upload-section">
                            {!!selectedImages && selectedImages.length > 0 && selectedImages.map((image, i) =>
                                <div key={i} className='img-container'>
                                    <div className='unselect-image-btn-container' onClick={() => handleUnselectImage(i)}>
                                        <IconButton aria-label="delete" size="small">
                                            <DeleteIcon color='secondary' fontSize="inherit" />
                                        </IconButton>
                                    </div>
                                    <img className='img-tag'  src={image.fileObj} alt="something"/>
                                </div>)}
                        </div>
                    </div>
                </form>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                Item Two
            </TabPanel>
        </Box>
    </CardComponent>
}

export default ManageProducts