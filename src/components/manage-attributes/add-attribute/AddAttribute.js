import Modal from "../../../util-components/modal/Modal";
import React, {useState} from "react";
import CustomInput from "../../../creative-components/components/CustomInput/CustomInput";
import {Button} from "@material-ui/core";
import {useAppContext} from "../../../context/AppContext";
import {SUCCESS} from "../../../utils/StringConstants";

const AddAttribute = ({open, setOpen, header}) => {

    const [attributeName, setAttributeName] = useState('')
    const [uomField, setUomField] = useState('')
    const [validValueField, setvalidValueField] = useState('')
    const [dataType, setDataType] = useState('')
    const [attributeGroup, setAttributeGroup] = useState('')

    const {addAttribute} = useAppContext();

    const handleSubmitAddAttributeForm = (e) => {
        e.preventDefault()
        const attrPayload = {
            attributeName,
            dataType,
            uoms: [...uomField.split('\n')],
            validValues: [...validValueField.split('\n')],
            attributeGroup
        }

       addAttribute(attrPayload).then(res => {
            clearFormData()
            if (res === SUCCESS) {
                setOpen(false)
            }
       })
    }

    const clearFormData = () => {
        setAttributeName('')
        setUomField('')
        setvalidValueField('')
        setDataType('')
        setAttributeGroup('')
    }


    return <Modal
        open={open}
        setOpen={setOpen}
        header={header}>
        <form className='custom-form-container' onSubmit={handleSubmitAddAttributeForm}>
            <CustomInput
                labelText="Enter Attribute Name..."
                id="attribute_name"
                formControlProps={{fullWidth: true,}}
                value={attributeName}
                onChange={(e) =>setAttributeName(e.target.value)}
            />

            <CustomInput
                labelText="Enter Unit of Measures..."
                textArea
                id="uoms"
                formControlProps={{fullWidth: true,}}
                value={uomField}
                onChange={(e) => setUomField(e.target.value)}
            />
            <CustomInput
                labelText="Enter Valid Values..."
                textArea
                id="valid_values"
                formControlProps={{fullWidth: true,}}
                value={validValueField}
                onChange={(e) => setvalidValueField(e.target.value)}
            />

            <CustomInput
                labelText="Enter Data Type..."
                id="data_type"
                formControlProps={{fullWidth: true,}}
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
            />

            <CustomInput
                labelText="Enter Attribute Group..."
                id="data_type"
                formControlProps={{fullWidth: true,}}
                value={attributeGroup}
                onChange={(e) => setAttributeGroup(e.target.value)}
            />
            <Button
                //disabled={disableButton()}
                    type='submit'
                    variant="contained"
                    color="secondary" fullWidth>
                Submit
            </Button>
        </form>
    </Modal>
}

export default AddAttribute