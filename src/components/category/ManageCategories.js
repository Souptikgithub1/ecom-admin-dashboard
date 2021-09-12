import {
    alpha, Button,
    Card,
    CardContent, Collapse, makeStyles, SvgIcon, withStyles,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import './ManageCategories.css'
import {TreeItem, TreeView} from "@material-ui/lab";
import {useSpring, animated} from "react-spring";
import {useState} from "react";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../../util-components/modal/Modal";
import AddCategory from "../add-category/AddCategory";

function MinusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props) {
    return (
        <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

function TransitionComponent(props) {
    const style = useSpring({
        from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
        to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

TransitionComponent.propTypes = {
    /**
     * Show the component; triggers the enter or exit states
     */
    in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3,
        },
    },
    group: {
        marginLeft: 7,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
});

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

const ManageCategories = () => {

    const classes = useStyles();
    const [category, setCategory] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const handleClickOnTreeItem = (level) => {
        setCategory(level.name)
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
                    <TreeView
                        className={classes.root}
                        defaultExpanded={['1']}
                        defaultCollapseIcon={<MinusSquare />}
                        defaultExpandIcon={<PlusSquare />}
                        defaultEndIcon={<CloseSquare />}
                    >
                        {
                            treeData.map((l1, il1) => {
                                return <StyledTreeItem key={il1+''} nodeId={il1+''} label={l1.name} onClick={() => handleClickOnTreeItem(l1)}>
                                    {!!l1.children
                                        ? l1.children.map((l2, il2) =>
                                        <StyledTreeItem key={''+il1+il2} nodeId={''+il1+il2} label={l2.name} onClick={() => handleClickOnTreeItem(l2)}>
                                            {!!l2.children ? l2.children.map((l3, il3) => <StyledTreeItem key={''+il1+il2+il3} nodeId={''+il1+il2+il3} label={l3.name} onClick={() => handleClickOnTreeItem(l3)}>
                                                {!!l3.children ? l3.children.map((l4, il4) => <StyledTreeItem key={''+il1+il2+il3+il4} nodeId={''+il1+il2+il3+il4} label={l4.name} onClick={() => handleClickOnTreeItem(l4)}></StyledTreeItem>) : ''}
                                            </StyledTreeItem>) : ''}
                                        </StyledTreeItem>) : ''
                                    }
                                </StyledTreeItem>
                            })
                        }

                    </TreeView>
                </div>
                <div className="category-edit">
                    Edit {category}
                </div>

            </CardContent>
        </Card>

        <Modal
            open={modalOpen}
            setOpen={setModalOpen}
            header='Add Categories'
            style={{width: '40rem'}}
        >
            <div className='add-category-form-container'>
                <AddCategory setModalOpen={setModalOpen}/>
            </div>
        </Modal>
    </div>
}

export default ManageCategories