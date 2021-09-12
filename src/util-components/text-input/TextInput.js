import './TextInput.css'
import {TextField} from "@material-ui/core";

const TextInput = ({
                       id='',
                       label='',
                       color='primary' | 'secondary',
                        value,
                        onChange
}) => {
    return <TextField
        className='text-field'
        id={id}
        label={label}
        color={color}
        value={value}
        fullWidth
        onChange={(e) => onChange(e.target.value)}
    />
}

export default TextInput