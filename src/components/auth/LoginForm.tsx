import { View, Text, StyleSheet, TextInput, Button, GestureResponderEvent } from 'react-native';
import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { user, userDetails } from '../../utils/userInformation';
import useAuth from '../../hooks/useAuth';


export default function LoginForm() {

    const [errorUser, setErrorUser] = useState('');
    const { login } = useAuth();

    const datosForm = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validateYupSchema()),
        validateOnChange: false,
        onSubmit: (formValue) => {
            const {email} = formValue;
            if(email !== user.email){
                setErrorUser('Wrong email')
            } else {
                login(userDetails);
            }
        },
    });

    return (
        <View>
            <Text style={styles.titleLogin} >Login</Text>
            <TextInput 
                placeholder='email'
                style={styles.inputLogin}
                autoCapitalize='none'
                value={datosForm.values.email}
                onChangeText= { (text : string) => datosForm.setFieldValue('email', text)}
            />

            <View style={styles.margingButton}>
                <Button 
                    title='Login'
                    onPress = {datosForm.handleSubmit}  
                />
            </View>

            <Text style={styles.errorLogin} > {datosForm.errors.email} </Text>

            <Text style={styles.errorLogin}> {errorUser} </Text>
        </View>
    )
}

function initialValues(){
    return{
        email: "",
    }
}

function validateYupSchema() {
    return {
        email: Yup.string().required("Username required"),
    }
}

const styles = StyleSheet.create({
    titleLogin: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 15,
    },
    inputLogin:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    errorLogin: {
        textAlign: 'center',
        color: '#f00',
        marginTop:20,
    },
    margingButton: {
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});