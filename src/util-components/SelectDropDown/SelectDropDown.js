import {MenuItem, Select} from "@material-ui/core";
import React from "react";

import '../text-input/TextInput.css'

const SelectDropDown = ({categoryDepth, setCategoryDepth, menuList}) => {


  return <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      className='text-field'
      fullWidth
      color='secondary'
      value={categoryDepth}
      MenuProps={{
          style: {zIndex: 99999}
      }}
      onChange={(e) => setCategoryDepth(e.target.value)}
  >
      {menuList.map((depth, index) => <MenuItem key={index} value={index}>{index}</MenuItem>)}
  </Select>
}

export default SelectDropDown