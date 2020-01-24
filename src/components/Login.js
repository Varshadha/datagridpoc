import React, {Component} from 'react';
import UserService from '../services/UserService';
// import DataForm from './DataForm';
import Toaster from '../Toaster'
import { browserHistory } from 'react-router';
import {Form} from 'semantic-ui-react';
class Login extends Component{
    constructor(props){
        super(props)
        this.state = { 
            email: '', 
            password: '',                     
            errors : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleValidation = this.handleValidation.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)      
        
    }

    handleChange = (e, {name, value}) => this.setState({ [name]: value })
    handleValidation(){
        var email = this.state.email
        var password = this.state.password
        var errors  = {}
        var formValid = true

        if(!password){
            formValid = false
            errors['password'] ='Password can not be empty'
            Toaster.show('error',errors['password']);
        }else if(password.length < 8){
            formValid = false
            errors['password'] ='Password length should me more than 8 characters'
            Toaster.show('error',errors['password']);
        }
        if(!email){
            formValid = false
            errors['email'] ='Email can not be empty'
            Toaster.show('error',errors['email']);
        }
        return formValid
    }

    handleSubmit = () => { 
        const { email, password} = this.state       
        this.setState({ email: email, password: password})
        let reqData = {
            "email" : email,            
            "password" : password                      
        }        
        if(this.handleValidation()){
            if(email == 'qtt@cybage.com' && password == 'Password'){
                localStorage.setItem('userToken',JSON.stringify('token_abcdefghij'))
                localStorage.setItem('currentUser','CurrentUser')
                browserHistory.push('/master-network')
            }else{
                Toaster.show('error','Login failed wrong user credentials.');
            }
            
            // UserService.login(reqData,function(err, response){
            //     if(!err && response){               
            //         localStorage.setItem('userToken',JSON.stringify(response.token))
            //         localStorage.setItem('currentUser',JSON.stringify(response.user))
            //         if(response.user)
            //             browserHistory.push('/master-network')
            //     }else{
            //         Toaster.show('error',err.message);
            //     }
            // })
        }      
        
    }
    render(){         
        const { email, password } = this.state
        // const formData = {"email": email, "password": password}
        // const formName = "Login"        
        return(
            <div className="main-section-container">                
            <Form className="data-form" onSubmit={this.handleSubmit}>
                        <Form.Group>                           
                            <Form.Input required
                            type="email"
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={this.handleChange}
                            width={16}/>
                        </Form.Group>  
                        <Form.Group>  
                            <Form.Input required
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={this.handleChange}
                            width={16}/>
                        </Form.Group>                        
                        <Form.Group>
                            <Form.Button fluid content='Login' width={16}/>
                        </Form.Group>
                        </Form>
                {/* <DataForm formDataList={formData} 
                    formName={formName}
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit} 
                    /> */}
            </div>
        )
            
    }
}
export default Login;