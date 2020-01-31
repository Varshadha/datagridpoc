import React, {Component} from 'react';
import { Icon, Modal, Table, Button, Header, Form, Pagination, Grid, Input } from 'semantic-ui-react'
import UserService from '../services/UserService';
import Toaster from '../Toaster'

class MasterNetworkzone extends Component{
    constructor(props){
        super(props)
        this.state = { 
            id : undefined,
            adServerId: '',
            qttMasterkey: '',
            cueNet: '',                         
            cueZone: '',
            MNZList : [],
            page : 1,
            pageSize : 10,
            pageCount : 2,    
            open : false,
            updateFlag : false,  
            networkSearch: '', 
            zoneSearch: '',                  
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getMNZL = this.getMNZL.bind(this)    
        this.close =  this.close.bind(this)    
        this.getMNZL();
        this.deleteMNZ = this.deleteMNZ.bind(this)
    }   
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleSearchSubmit = () => {
        const { networkSearch, zoneSearch } = this.state
        this.setState({ networkSearch: networkSearch, zoneSearch: zoneSearch })
        let reqData = {}
        reqData.network = networkSearch
        if(zoneSearch){
            reqData.zone = zoneSearch
        }
        let me = this;
        UserService.searchMasterNetworkZone(reqData,function(err, response){
            if(!err && response ){                
                me.setState({MNZList : response})
            }else{
                Toaster.show('error',err);
            }
        })
    }
    handleSubmit = () => {
        const { id, adServerId, qttMasterkey, cueNet, cueZone } = this.state
        let updateFlag = this.state.updateFlag
        this.setState({ adServerId: adServerId, qttMasterkey: qttMasterkey, cueNet : cueNet, cueZone: cueZone})
        let reqData = {
            "adServerId" : adServerId,
            "qttMasterkey" : qttMasterkey,
            "cueNet" : cueNet,
            "cueZone" : cueZone
        }
        if(updateFlag) reqData.id = id
        let me = this;        
        UserService.addUpdateMasterNetworkZone(reqData,updateFlag,function(err, response){
            if(!err && response ){
                if(updateFlag)                   
                    me.setState({MNZList: me.state.MNZList.filter(function(item) { 
                        return item.id !== response.id
                    })});
                me.setState({MNZList : [...me.state.MNZList, response], open: false}) 
                let msg = 'Record added successfully'
                if(updateFlag)
                    msg = "Record updated successfully"
                Toaster.show('success',msg); 
            }else{
                Toaster.show('error',err);
            }
        })
    }
    getMNZL(page){
        let me = this;        
        let reqData = {'page' : page}
        UserService.getMasterNetworkZoneList(reqData,function(err, response){
            if(!err && response ){
                me.setState({MNZList : response})
            }else{
                Toaster.show('error',err);
            }
        })
    }
    handlePaginationChange = (e, {activePage}) => {
        this.setState({'page' : activePage})
        this.getMNZL(activePage)
    }
    openEditModal(item){
        let me = this;  
        me.setState({adServerId: item.adServerId, qttMasterkey: item.qttMasterkey, cueNet: item.cueNet, cueZone: item.cueZone, open: true, updateFlag :true})     
    }
    deleteMNZ(itemId){    
        let me = this;    
        UserService.deleteMasterNetworkZone(itemId,function(err, response){
            if(!err && response ){
                me.setState({MNZList: me.state.MNZList.filter(function(item) { 
                    return item.id !== itemId
                })});
                Toaster.show('success','Record deleted successfully');
            }else{
                Toaster.show('error',err);
            }
        })
    }
    close = () => this.setState({ open: false })
    render(){
        const { id, adServerId, qttMasterkey, cueNet, cueZone, open, networkSearch, zoneSearch } = this.state
        return(
            <div className="main-section-container">
                <div className="screen-head">
                    <div className="page-title">
                        <Header as='h3'>Master Network Zone List</Header>
                    </div>
                    <div className="action-box">
                        <Grid>
                            <Grid.Column mobile={6} tablet={4} computer={12}>
                            <Form className="search-form" onSubmit={this.handleSearchSubmit}>
                            <Form.Group>
                                <Input icon 
                                 placeholder='Network'
                                 name='networkSearch'
                                 value={networkSearch}
                                 onChange={this.handleChange} className="searchInputField">
                                <input />
                                <Icon name='search' />
                                </Input>
                                
                                <Input icon 
                                placeholder='Zone'
                                name='zoneSearch'
                                value={zoneSearch}
                                onChange={this.handleChange}className="searchInputField">
                                <input />
                                <Icon name='search' />
                                </Input>                                
                                <Form.Button content='Search' className="searchButton"/>
                            </Form.Group>
                            </Form>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={12} computer={4}> 
                            <Button compact className="blue-btn add-btn right" onClick={() => {this.setState({ open: true,updateFlag: false , adServerId: '', qttMasterkey: '', cueNet:'', cueZone: '' })}}>Add</Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
                
                <Modal
                size='small'
                open={open}
                onClose={this.close}>
                    <Modal.Header>Add Master Network Zone</Modal.Header>
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
                            placeholder='AdServer Id'
                            name='adServerId'
                            value={adServerId}
                            onChange={this.handleChange}
                            />
                            <Form.Input required 
                            placeholder='QTT Master Key'
                            name='qttMasterkey'
                            value={qttMasterkey}
                            onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input required 
                            placeholder='Cue Network'
                            name='cueNet'
                            value={cueNet}
                            onChange={this.handleChange}
                            />
                            <Form.Input required 
                            placeholder='Cue Zone'
                            name='cueZone'
                            value={cueZone}
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
                    <Table.HeaderCell>Ad Server Id</Table.HeaderCell>
                    <Table.HeaderCell>QTT Master Key</Table.HeaderCell>
                    <Table.HeaderCell>Cue Net</Table.HeaderCell>
                    <Table.HeaderCell>Cue Zone</Table.HeaderCell>  
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                
                <Table.Body>      
                    {this.state.MNZList.map((item,key) =>(
                    <Table.Row key={key}>
                        <Table.HeaderCell>{item.adServerId}</Table.HeaderCell>                        
                        <Table.HeaderCell>{item.qttMasterkey}</Table.HeaderCell>
                        <Table.HeaderCell>{item.cueNet}</Table.HeaderCell>
                        <Table.HeaderCell>{item.cueZone}</Table.HeaderCell>
                        <Table.HeaderCell><Icon name='pencil' onClick={() => {this.setState({ id :item.id, adServerId: item.adServerId, qttMasterkey: item.qttMasterkey, cueNet: item.cueNet, cueZone: item.cueZone, open: true, updateFlag :true })}} />
                        <Icon name='delete' onClick={() => this.deleteMNZ(item.id)}/>
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
export default MasterNetworkzone;