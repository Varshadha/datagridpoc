import React, {Component} from 'react';
import { Icon, Modal, Table, Button, Header, Form, Pagination, Grid } from 'semantic-ui-react'
import UserService from '../services/UserService';

class SspMaster extends Component{
    constructor(props){
        super(props)
        this.state = { 
            id: undefined,
            sspName: '', 
            endPoint: '',
            sspList : [],
            page : 1,
            pageSize : 10,
            pageCount : 2,       
            open : false                 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getSspMaster = this.getSspMaster.bind(this)
        this.deleteSspMaster = this.deleteSspMaster.bind(this)
        this.close =  this.close.bind(this)    
        this.getSspMaster();
    }   
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleSubmit = () => {
        const { id, sspName, endPoint} = this.state
        let updateFlag = this.state.updateFlag
        this.setState({ sspName: sspName, endPoint: endPoint})
        let reqData = {
            "sspName" : sspName,
            "endPoint" : endPoint           
        }
        if(updateFlag) reqData.id = id
        let me = this;        
        UserService.addUpdateSspMaster(reqData,updateFlag,function(err, response){
            if(!err && response ){
                if(updateFlag)                   
                    me.setState({sspList: me.state.sspList.filter(function(item) { 
                        return item.id !== response.id
                    })});
                me.setState({sspList : [...me.state.sspList, response], open: false}) 
            }else{
                console.log('Error : ',err);
            }
        })
    }
    getSspMaster(page){
        let me = this;        
        let reqData = {'page' : page}
        UserService.getSspMaster(reqData,function(err, response){
            if(!err && response ){                
                me.setState({sspList : response})
            }else{
                console.log('Error : ',err);
            }
        })
    }
    deleteSspMaster(itemId){    
        let me = this;    
        UserService.deleteSspMaster(itemId,function(err, response){
            if(!err && response ){
                me.setState({sspList: me.state.sspList.filter(function(item) { 
                    return item.id !== itemId
                })});
            }else{
                console.log('Error : ',err);
            }
        })
    }
    handlePaginationChange = (e, {activePage}) => {
        this.setState({'page' : activePage})
        this.getSspMaster(activePage)
    }
    close = () => this.setState({ open: false })
    render(){
        const { id, sspName, endPoint, open} = this.state
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
                               <Button compact className="blue-btn add-btn right" onClick={() => {this.setState({ open: true,updateFlag: false , sspName: '', endPoint: ''})}}>Add</Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
                <Modal
                size='small'
                open={open}
                onClose={this.close}>
                    <Modal.Header>Add SSP Master</Modal.Header>
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
                            placeholder='SSP Name'
                            name='sspName'
                            value={sspName}
                            onChange={this.handleChange}
                            />
                            <Form.Input required
                            placeholder='End Point'
                            name='endPoint'
                            value={endPoint}
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
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>End Point</Table.HeaderCell>                   
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                
                <Table.Body>      
                    {this.state.sspList.map((item,key) =>(
                    <Table.Row key={key}>
                        <Table.HeaderCell>{item.sspName}</Table.HeaderCell>                        
                        <Table.HeaderCell>{item.endPoint}</Table.HeaderCell>
                        <Table.HeaderCell>
                            <Icon name='pencil' onClick={() => {this.setState({ id :item.id, sspName: item.sspName, endPoint: item.endPoint, open: true, updateFlag :true })}} />
                            <Icon name='delete' onClick={() => this.deleteSspMaster(item.id)}/>
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
export default SspMaster;