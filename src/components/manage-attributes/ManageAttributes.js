import CardComponent from "../../util-components/card-component/CardComponent";
import React, {useEffect, useState} from "react";
import {useAppContext} from "../../context/AppContext";
import CustomTableView from "../../util-components/categoryTable/CustomTableView";
import {camelToSpace} from "../../utils/CommonUtils";
import Modal from "../../util-components/modal/Modal";
import AddAttribute from "./add-attribute/AddAttribute";

const ManageAttributes = () => {

    const {attributes} = useAppContext();
    const [openAddAttrModal, setOpenAddAttrModal] = useState(false);

    useEffect(() => {
        console.log(attributes)
    }, [attributes])

    const handleAddAttrModalOpen = (e) => {
        setOpenAddAttrModal(true)
    }

    return <div>
        <CardComponent headerText='Manage Attributes' iconName='ballot' >
            {!!attributes && attributes.length > 0
                ? <CustomTableView
                    tableHeaders={Object
                        .keys(attributes[0])
                        .filter(x => x!=='attributeId')
                        .map((key, index) => { return { id: key, numeric: !!index , disablePadding: false, label: camelToSpace(key) } })}
                    rows={[...attributes]}
                    defaultSortCol={'attributeName'}
                    colsNotToShow={['attributeId']}
                    headerName={`Attribute Table`}
                    handleClickEditBtn={(e) => console.log(e)}
                    handleClickHeaderBtn={handleAddAttrModalOpen}
                    headerBtnName='Add Attribute'
                    handleClickDeleteBtn={(e) => console.log(e)}
                /> : ''}
        </CardComponent>


    <AddAttribute
        header='Add Attribute'
        setOpenAddAttrModal={setOpenAddAttrModal}
        openAddAttrModal={openAddAttrModal}
    />
    </div>
}

export default ManageAttributes