import {Card, CardContent, Icon} from "@material-ui/core";
import './CardComponent.css'

const CardComponent = ({iconName, headerText, children}) => {
  return <Card variant='elevation' className='card-container'>
      <CardContent className='card-content'>
          <div className='card-header'>
              <Icon className='card-header-icon'>{iconName}</Icon>
              <span className='card-header-text'>{headerText}</span>
          </div>
          <div className="card-body">
              {children}
          </div>
      </CardContent>
  </Card>
}

export default CardComponent