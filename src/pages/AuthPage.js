import React, {Component} from 'react';
import { browserHistory, Router } from 'react-router';
import { Container, Segment, Grid, Header, Image } from 'semantic-ui-react'
import logo from '../assets/images/logo.png';
class AuthPage extends Component{
      
    constructor(props){
      super(props);
      this.state = {}     
      if(!localStorage.getItem('currentUser')){
          browserHistory.push('/auth/login')
      }  
    }   
    
    render(){
        return (          
            <div className="app">              
              <Segment className="authpage-segment" vertical>
                <Container fluid className="authpage-container">
                  <Grid className="authpage-grid" centered verticalAlign='middle' >                  
                       <Grid.Column className="pl-0 auth-box" mobile={10} tablet={8} computer={6}>
                        <Header as='h2' textAlign='center' className="login-header">
                        <Image className="logo" src={logo} alt="logo" />
                        Log-in to your account
                        </Header>
                       {this.props.children}
                       </Grid.Column>                  
                  </Grid>
                  </Container>
              </Segment>
            </div>
            )            
    }
}
export default AuthPage;