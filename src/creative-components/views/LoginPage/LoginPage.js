import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "../../components/Header/Header.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";

import styles from "../../assets/jss/material-kit-react/views/loginPage.js";

import image1 from "../../assets/img/big1.jpeg";
import image2 from "../../assets/img/bg.jpg";
import image3 from "../../assets/img/bg2.jpg";
import image4 from "../../assets/img/bg3.jpg";
import image5 from "../../assets/img/bg7.jpg";
import {useAppContext} from "../../../context/AppContext";
import {useHistory} from "react-router-dom";
import {SUCCESS} from "../../../utils/StringConstants";

const useStyles = makeStyles(styles);


export default function LoginPage(props) {

    const {login, showSnackBar} = useAppContext()

    const history = useHistory();

    const [images, setImages] = useState([])
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
      setTimeout(function () {
          setCardAnimation("");
      }, 700);
  }, [])

    useEffect(() => {
        setImages([image1, image2, image3, image4, image5, image1, image2, image3, image4, image5 ])
        setImages([...images])
    }, [])


  const classes = useStyles();
  const { ...rest } = props;

    const emailInputProps = {
        type: "email",
        endAdornment: (
            <InputAdornment position="end">
                <Email className={classes.inputIconsColor} />
            </InputAdornment>
        ),
    };

    const passwordInputProps = {
        type: "password",
        endAdornment: (
            <InputAdornment position="end">
                <Icon className={classes.inputIconsColor}>
                    lock_outline
                </Icon>
            </InputAdornment>
        ),
        autoComplete: "off",
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        login({email, password}).then((res) => {
            if (res === SUCCESS) history.push('/admin/categories')
            else showSnackBar({message: 'Wrong Credentials!!', color: 'error', show: true})
        })

    }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="E-com Admin Portal"
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image5 + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmitLogin}>
                  <CardHeader color="rose" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <CardBody>
                    {/*<CustomInput
                      labelText="First Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />*/}
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{fullWidth: true,}}
                      inputProps={emailInputProps}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      formControlProps={{fullWidth: true,}}
                      inputProps={passwordInputProps}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type='submit' simple color="rose" size="lg" >
                      Let's Go
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
