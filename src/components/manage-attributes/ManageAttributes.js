import CardComponent from "../../util-components/card-component/CardComponent";
import React, {useEffect} from "react";
import {useAppContext} from "../../context/AppContext";
import CustomTableView from "../../util-components/categoryTable/CustomTableView";
import {camelToSpace} from "../../utils/CommonUtils";

const ManageAttributes = () => {

    const {attributes} = useAppContext();

    useEffect(() => {
        console.log(attributes)
    }, [attributes])

    return <div>
        <CardComponent headerText='Manage Attributes' iconName='ballot' >
            {!!attributes && attributes.length > 0
                ? <CustomTableView
                    tableHeaders={Object
                        .keys(attributes[0])
                        .filter(x => x!=='attributeId')
                        .map((key, index) => { return { id: key, numeric: !!index , disablePadding: false, label: camelToSpace(key) } })}
                    rows={[...attributes]}
                    /*defaultSortCol={'categoryName'}*/
                    colsNotToShow={['attributeId']}
                    headerName={`Attribute Table`}
                    handleClickEditBtn={(e) => console.log(e)}
                    handleClickHeaderBtn={(e) => console.log(e)}
                    headerBtnName='Add Attribute'
                    handleClickDeleteBtn={(e) => console.log(e)}
                /> : ''}
        </CardComponent>
    </div>
}

export default ManageAttributes