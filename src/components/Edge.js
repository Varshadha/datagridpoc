import React, {Component} from 'react';
import { Icon, Modal, Table, Button, Header, Form, Pagination, Grid } from 'semantic-ui-react'
import UserService from '../services/UserService';

class Edge extends Component{
    constructor(props){
        super(props)
        this.state = { 
            id: undefined,
            edgeName: '', 
            ipAddress: '',
            edgeList : [],
            page : 1,
            pageSize : 10,
            pageCount : 3,    
            open: false                    
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getAllEdges = this.getAllEdges.bind(this)
        this.deleteEdge = this.deleteEdge.bind(this)
        this.close =  this.close.bind(this)
        this.getAllEdges();
    }   
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleSubmit = () => {
        const { id, edgeName, ipAddress} = this.state
        let updateFlag = this.state.updateFlag
        this.setState({ edgeName: edgeName, ipAddress: ipAddress})
        let reqData = {
            "edgeName" : edgeName,
            "ipAddress" : ipAddress           
        }
        if(updateFlag) reqData.id = id
        let me = this;        
        UserService.addUpdateEdge(reqData,updateFlag,function(err, response){
            if(!err && response ){
                if(updateFlag)                   
                    me.setState({edgeList: me.state.edgeList.filter(function(item) { 
                        return item.id !== response.id
                    })});
                me.setState({edgeList : [...me.state.edgeList, response], open: false}) 
            }else{
                console.log('Error : ',err);
            }
        })
    }
    getAllEdges(page){
        let me = this;        
        let reqData = {'page' : page}
        UserService.getEdges(reqData,function(err, response){
            if(!err && response ){                
                me.setState({edgeList : response})
            }else{
                console.log('Error : ',err);
            }
        })
    }
    handlePaginationChange = (e, {activePage}) => {
        this.setState({'page' : activePage})
        this.getAllEdges(activePage)
    }
    deleteEdge(itemId){    
        let me = this;    
        UserService.deleteEdge(itemId,function(err, response){
            if(!err && response ){
                me.setState({edgeList: me.state.edgeList.filter(function(item) { 
                    return item.id !== itemId
                })});
            }else{
                console.log('Error : ',err);
            }
        })
    }
    close = () => this.setState({ open: false })
    render(){
        const { id, edgeName, ipAddress, open} = this.state
        return(
            <div className="main-section-container">
                <div className="screen-head">
                    <div className="page-title">
                        <Header as='h3'>Edge Server</Header>
                    </div>
                    <div className="action-box">
                        <Grid>
                            <Grid.Column mobile={6} tablet={4} computer={12}>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={12} computer={4}> 
                               <Button compact className="blue-btn add-btn right"  onClick={() => {this.setState({ open: true,updateFlag: false , edgeName: '', ipAddress: '' })}}>Add</Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
                
                <Modal 
                size='small'
                open={open}
                onClose={this.close}>
                    <Modal.Header>Add Edge</Modal.Header>
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
                            placeholder='IP Address'
                            name='ipAddress'
                            value={ipAddress}
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
                    {this.state.edgeList.map((item,key) =>(
                    <Table.Row key={key}>
                        <Table.HeaderCell>{item.edgeName}</Table.HeaderCell>                        
                        <Table.HeaderCell>{item.ipAddress}</Table.HeaderCell>
                        <Table.HeaderCell>
                        <Icon name='pencil' onClick={() => {this.setState({ id :item.id, edgeName: item.edgeName, ipAddress: item.ipAddress, open: true, updateFlag :true })}}/>
                        <Icon name='delete' onClick={() => this.deleteEdge(item.id)}/>
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
export default Edge;