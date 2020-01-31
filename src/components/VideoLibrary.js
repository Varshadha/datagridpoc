import React, {Component} from 'react';
import { Icon, Modal, Table, Button, Header, Form, Pagination, Grid } from 'semantic-ui-react'
import UserService from '../services/UserService';
import Toaster from '../Toaster'
class VideoLibrary extends Component{
    constructor(props){
        super(props)
        this.state = { 
            edgeName: '', 
            fileName: '',
            duration : '',
            videoList : [],
            page : 1,
            pageSize : 10,
            pageCount : 2,   
            open: false                     
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getVideoLibrary = this.getVideoLibrary.bind(this)
        this.deleteVideo = this.deleteVideo.bind(this)
        this.close =  this.close.bind(this) 
        this.getVideoLibrary();
    }   
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleSubmit = () => {
        const { id, edgeName, fileName, duration} = this.state
        let updateFlag = this.state.updateFlag
        this.setState({ edgeName: edgeName, fileName: fileName, duration: duration})
        let reqData = {
            "edgeName" : edgeName,
            "fileName" : fileName,
            "duration" : duration           
        }
        if(updateFlag) reqData.id = id
        let me = this;        
        UserService.addUpdateVideoLibrary(reqData,updateFlag,function(err, response){
            if(!err && response ){
                if(updateFlag)                   
                    me.setState({videoList: me.state.videoList.filter(function(item) { 
                        return item.id !== response.id
                    })});
                me.setState({videoList : [...me.state.videoList, response], open: false}) 
                let msg = 'Record added successfully'
                if(updateFlag)
                    msg = "Record updated successfully"
                Toaster.show('success',msg); 
            }else{
                Toaster.show('error',err);
            }
        })
    }
    getVideoLibrary(page){
        let me = this;        
        let reqData = {'page' : page}
        UserService.getVideoLibrary(reqData,function(err, response){
            if(!err && response ){                
                me.setState({videoList : response})
            }else{
                Toaster.show('error',err);
            }
        })
    }
    deleteVideo(itemId){    
        let me = this;    
        UserService.deleteVideo(itemId,function(err, response){
            if(!err && response ){
                me.setState({videoList: me.state.videoList.filter(function(item) { 
                    return item.id !== itemId
                })});
                Toaster.show('success','Record deleted successfully');
            }else{
                Toaster.show('error',err);
            }
        })
    }
    handlePaginationChange = (e, {activePage}) => {
        this.setState({'page' : activePage})
        this.getVideoLibrary(activePage)
    }
    close = () => this.setState({ open: false })
    render(){
        const { id, edgeName, fileName, duration, open} = this.state
        return(
            <div className="main-section-container">
                <div className="screen-head">
                    <div className="page-title">
                        <Header as='h3'>SSP Master</Header>
                    </div>
                    <div className="action-box">
                        <Grid>
                            <Grid.Column mobile={6} tablet={4} computer={12}>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={12} computer={4}> 
                               <Button compact className="blue-btn add-btn right" onClick={() => {this.setState({ open: true,updateFlag: false , edgeName: '', duration: '', fileName:''})}}>Add</Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
               
               <Modal
                size='small'
                open={open}
                onClose={this.close}>
                    <Modal.Header>Add Video</Modal.Header>
                    <Modal.Content image>
                    
                    <Modal.Description>
                        <Header></Header>
                        <Form className="data-form" onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <input
                            type="hidden"                            
                            name='id'
                            value={id}
                            onChange={this.handleChange}
                            />
                            <Form.Input required
                            placeholder='Edge Name'
                            name='edgeName'
                            value={edgeName}
                            onChange={this.handleChange}
                            />
                            <Form.Input required
                            placeholder='File Name'
                            name='fileName'
                            value={fileName}
                            onChange={this.handleChange}
                            />
                            <Form.Input required
                            placeholder='Duration'
                            name='duration'
                            value={duration}
                            onChange={this.handleChange}
                            />
                        </Form.Group>                        
                        <Form.Group>
                            <Form.Button content='Save' />
                            <Form.Button type="button" content='Cancel' onClick={this.close} negative />
                        </Form.Group>
                        </Form>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>

                <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Edge Name</Table.HeaderCell>
                    <Table.HeaderCell>Filename</Table.HeaderCell>
                    <Table.HeaderCell>Duration</Table.HeaderCell>    
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                
                <Table.Body>      
                    {this.state.videoList.map((item,key) =>(
                    <Table.Row key={key}>
                        <Table.HeaderCell>{item.edgeName}</Table.HeaderCell>
                        <Table.HeaderCell>{item.fileName}</Table.HeaderCell>
                        <Table.HeaderCell>{item.duration}</Table.HeaderCell>
                        <Table.HeaderCell>
                        <Icon name='pencil' onClick={() => {this.setState({ id :item.id, edgeName: item.edgeName, fileName: item.fileName, duration: item.duration, open: true, updateFlag :true })}}/>
                        <Icon name='delete' onClick={() => this.deleteVideo(item.id)}/>
                        </Table.HeaderCell>                   
                    </Table.Row>
                    ))}          
                </Table.Body>
                <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='9'>
                    <Pagination secondary    
                        ellipsisItem={{ content : <Icon name='ellipsis horizontal' />, icon :true}}
                        firstItem={{ content : <Icon name='backward' />, icon :true}}
                        lastItem={{ content : <Icon name='forward' />, icon :true}}
                        prevItem={{ content : <Icon name='caret left' />, icon :true}}
                        nextItem={{ content : <Icon name='caret right' />, icon :true}}
                        onPageChange={this.handlePaginationChange}
                        totalPages={this.state.pageCount}
                        defaultActivePage={1}
                    />                    
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Footer>
            </Table>
            </div>
        )            
    }
}
export default VideoLibrary;