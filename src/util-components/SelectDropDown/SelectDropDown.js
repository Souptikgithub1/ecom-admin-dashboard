import {MenuItem, Select} from "@material-ui/core";
import React from "react";

import '../text-input/TextInput.css'

const SelectDropDown = ({labelId, id, value, onChange, menuList}) => {


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
      onChange={(e) => onChange(e.target.value)}
  >
      {menuList.map((item, index) => <MenuItem key={index} value={item.value}>{item.text}</MenuItem>)}
  </Select>
}

export default SelectDropDown