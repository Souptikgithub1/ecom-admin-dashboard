import {MenuItem, Select} from "@material-ui/core";
import React from "react";

import '../text-input/TextInput.css'

const SelectDropDown = ({labelId, id, value, setValue, menuList}) => {


  return <Select
      labelId={labelId}
      id={id}
      className='text-field'
      fullWidth
      color='secondary'
      value={value}
      MenuProps={{
          style: {zIndex: 99999}
      }}
      onChange={(e) => setValue(e.target.value)}
  >
      {menuList.map((itemVal, index) => <MenuItem key={index} value={itemVal}>{itemVal}</MenuItem>)}
  </Select>
}

export default SelectDropDown