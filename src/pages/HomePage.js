import React, {Component} from 'react';
import { browserHistory, Router } from 'react-router';
import { Container, Image, Menu, Segment, Grid, Divider, Icon,Dropdown } from "semantic-ui-react";
import BusinessRule from '../components/BusinessRule';
import SspMaster from '../components/SspMaster';
import Edge from '../components/Edge';
import MasterNetworkZone from '../components/MasterNetworkZone';
import GreenList from '../components/GreenList';
import VideoLibrary from '../components/VideoLibrary';
import logo from '../assets/images/logo.png';
import avatar from '../assets/images/user.png';
class HomePage extends Component{
      
    constructor(props){
      super(props);
      this.state = { 
        activeItem: 'master-network',
        pathName : this.props.location.pathname, 
        userName : 'John'       
      }
     
      this.logout = this.logout.bind(this);
      if(!localStorage.getItem('currentUser')){
          browserHistory.push('/auth/login')
      }  
    }
    
    componentWillReceiveProps(newProps){
      if(newProps && newProps.location && newProps.location.pathname){
        this.setState({pathName : newProps.location.pathname})
      }
    }

    handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name });
      browserHistory.push('/'+name);
    }

    getPage(path){
      switch(path){
        case '/master-network' :
          return <MasterNetworkZone />
        case '/business' :
          return <BusinessRule />
        case '/ssp-master' :
          return <SspMaster />
        case '/edge' :
          return <Edge />        
        case '/green-list' :
          return <GreenList />
        case '/video-library' :
          return <VideoLibrary />       
        default :
          return <MasterNetworkZone />
      }
    }
    logout(){      
      localStorage.clear();
      browserHistory.push('/auth/login')
    }
    componentWillUnmount(){
      
    }
    render(){
      const { activeItem } = this.state
        return (          
            <div className="app">              
              <Segment className="homepage-segment" vertical>
                <Container fluid className="homepage-container">
                  <Grid className="homepage-grid">
                  {/* <Grid.Row className="header-section">
                      <Grid.Column mobile={6} tablet={4} computer={4}>
                        <Image className="logo" src="https://react.semantic-ui.com/logo.png" alt="logo" />
                       </Grid.Column>
                       <Grid.Column mobile={10} tablet={12} computer={12} className="pl-0">
                          <div className="top-header-menu">
                              <div className="user-name">
                                Welcome, John!
                              </div>
                          </div>
                       </Grid.Column>
                  </Grid.Row>  */}
                  <Grid.Row className="main-dashboard-section pt-0 pb-0">
                    <Grid.Column mobile={16} tablet={4} computer={4}  style={{ paddingTop: 0 }} className="sidebar">
                      <div className="left-menu" >
                      <Image className="logo" src={logo} alt="logo" />
                      <div className="user-name">
                        <Image className="avatar" src={avatar} alt="avatar"/>   
                        <div className="user-setting">
                        <Dropdown text={'Welcome, '+this.state.userName+'!'}   className='icon' fluid>
                          <Dropdown.Menu className="right" >
                            <Dropdown.Item onClick={this.logout}>                              
                              <span className='text'>Logout</span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>             
                        </div>           
                      </div>
                      <Divider />
                      <Menu vertical secondary>
                        <Menu.Item
                          name='master-network'
                          active={activeItem === 'master-network'}
                          onClick={this.handleItemClick}
                        >
                          <Icon name='connectdevelop' />
                          Master Network Zone
                        </Menu.Item>
                        <Menu.Item
                          name='business'
                          active={activeItem === 'business'}
                          onClick={this.handleItemClick}
                        >
                          <Icon name='address card outline' />
                          Business Rules
                        </Menu.Item>
                        <Menu.Item
                          name='ssp-master'
                          active={activeItem === 'ssp-master'}
                          onClick={this.handleItemClick}
                        >
                          <Icon name='laptop' />
                          SSP Master
                        </Menu.Item>
                        {/* <Menu.Item
                          name='edge'
                          active={activeItem === 'edge'}
                          onClick={this.handleItemClick}
                        >
                          <Icon name='server' />
                          Edge Server
                        </Menu.Item> */}
                        <Menu.Item
                          name='video-library'
                          active={activeItem === 'video-library'}
                          onClick={this.handleItemClick}
                        >
                          <Icon name='file video outline' />
                          Video Library
                        </Menu.Item>
                        <Menu.Item
                          name='green-list'
                          active={activeItem === 'green-list'}
                          onClick={this.handleItemClick}
                        >
                          <Icon name='content' />
                          EverGreen Content
                        </Menu.Item>
                      </Menu>
                      </div>
                     </Grid.Column>
                     <Grid.Column mobile={16} tablet={12} computer={12} >
                      {this.getPage(this.state.pathName)}
                     </Grid.Column>
                  </Grid.Row>
                  </Grid>
                  </Container>
              </Segment>
            </div>
            )            
    }
}
export default HomePage;