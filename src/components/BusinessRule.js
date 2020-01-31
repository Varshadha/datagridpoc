import React, {Component} from 'react';
import { Icon, Modal, Table, Button, Header, Form, Pagination, Grid, Input  } from 'semantic-ui-react'
import UserService from '../services/UserService';
import Toaster from '../Toaster'

class BusinessRule extends Component{
    constructor(props){
        super(props)
        this.state = { 
            ruleObj : {
                id : undefined,
                businessRule : "",
                network: "",
                zone: "",
                ruleType: "",
                ruleValue: "",
                includeExclude : "",
                value: "",
                sequence: ""
            },
            networkSearch: '', 
            zoneSearch: '',
            businessRules : [],
            page : 1,
            pageSize : 15,
            pageCount : 2,                        
            open: false,
            updateFlag : false, 
        }
        this.initialState = { ...this.state } 
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAddChange = this.handleAddChange.bind(this)
        this.handleAddSubmit = this.handleAddSubmit.bind(this)
        this.getAllBusinessRules = this.getAllBusinessRules.bind(this)
        this.deleteBusinessRule = this.deleteBusinessRule.bind(this)
        this.close =  this.close.bind(this)
        this.getAllBusinessRules();
    }   
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleAddChange = (e, { name, value }) => {
        let newObject = this.state.ruleObj;
        newObject[name] = value;
        this.setState({
            ruleObj: newObject 
        })
    }    
    handleSubmit = () => {
        const { networkSearch, zoneSearch } = this.state
        this.setState({ networkSearch: networkSearch, zoneSearch: zoneSearch })
        let reqData = {}
        reqData.network = networkSearch
        if(zoneSearch){
            reqData.zone = zoneSearch
        }
        let me = this;
        UserService.searchBusinessRules(reqData,function(err, response){
            if(!err && response ){                
                me.setState({businessRules : response})
            }else{
                Toaster.show('error',err);
            }
        })
    }
    handleAddSubmit = () => {
        const { id, businessRule, network, zone, ruleType, ruleValue, includeExclude, value, sequence} = this.state.ruleObj
        let updateFlag = this.state.updateFlag
        this.setState({ ruleObj : { id : id, businessRule : businessRule, network:network, zone:zone, ruleType:ruleType, ruleValue:ruleValue, includeExclude:includeExclude, value:value, sequence:sequence} })        
        let reqData = {
            "businessRule" : businessRule,
            "network" : network,
            "zone" : zone,
            "ruleType" : ruleType,
            "ruleValue" : ruleValue,
            "includeExclude" : includeExclude,
            "value" : value,
            "sequence" : sequence
        }
        if(updateFlag) reqData.id = id
        let me = this;        
        UserService.addUpdateBusinessRule(reqData,updateFlag,function(err, response){
            if(!err && response ){
                if(updateFlag)                   
                    me.setState({businessRules: me.state.businessRules.filter(function(item) { 
                        return item.id !== response.id
                    })});
                me.setState({businessRules : [...me.state.businessRules, response], open: false}) 

                let msg = 'Record added successfully'
                if(updateFlag)
                    msg = "Record updated successfully"
                Toaster.show('success',msg); 
            }else{
                Toaster.show('error',err);
            }
        })
    }
    getAllBusinessRules(page){
        let me = this;        
        let reqData = {'page' : page}
        UserService.getBusinessRules(reqData,function(err, response){
            if(!err && response ){                
                me.setState({businessRules : response})
            }else{
                Toaster.show('error',err);
            }
        })
    }
    deleteBusinessRule(itemId){    
        let me = this;    
        UserService.deleteBusinessRule(itemId,function(err, response){
            if(!err && response ){
                me.setState({businessRules: me.state.businessRules.filter(function(item) { 
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
        this.getAllBusinessRules(activePage)
    }
    close = () => this.setState({ open: false })
    render(){
        const { networkSearch, zoneSearch, open} = this.state
        const { id, businessRule, network, zone, ruleType, ruleValue, includeExclude, value, sequence} = this.state.ruleObj
        
        return(
            <div className="main-section-container">
                <div className="screen-head">
                    <div className="page-title">
                        <Header as='h3'>Business Rules</Header>
                    </div>
                    <div className="action-box">
                        <Grid>
                            <Grid.Column mobile={6} tablet={4} computer={12}>
                            <Form className="search-form" onSubmit={this.handleSubmit}>
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
                            <Button compact className="blue-btn add-btn right"  onClick={() => {this.setState({ open: true,updateFlag: false , ruleObj : this.initialState })}}>Add</Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
                

                
                <Modal 
                size='small'
                open={open}
                onClose={this.close}>
                    <Modal.Header>Add Business Rule</Modal.Header>
                    <Modal.Content image>                    
                    <Modal.Description>
                        <Header></Header>
                        <Form className="data-form" onSubmit={this.handleAddSubmit}>
                        <Form.Group>
                            <input
                            type="hidden"                            
                            name='id'
                            value={id}
                            onChange={this.handleAddChange}
                            />
                            <Form.Input required
                            placeholder='Business Rule'
                            name='businessRule'
                            value={businessRule}
                            onChange={this.handleAddChange}
                            />
                            <Form.Input required
                            placeholder='Network'
                            name='network'
                            value={network}
                            onChange={this.handleAddChange}
                            />
                            <Form.Input required
                            placeholder='Zone'
                            name='zone'
                            value={zone}
                            onChange={this.handleAddChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input required
                            placeholder='Rule Type'
                            name='ruleType'
                            value={ruleType}
                            onChange={this.handleAddChange}
                            />
                            <Form.Input required
                            placeholder='Rule Value'
                            name='ruleValue'
                            value={ruleValue}
                            onChange={this.handleAddChange}
                            />
                            <Form.Input required
                            placeholder='Include/Exclude'
                            name='includeExclude'
                            value={includeExclude}
                            onChange={this.handleAddChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input required
                            placeholder='Value'
                            name='value'
                            value={value}
                            onChange={this.handleAddChange}
                            />
                            <Form.Input required
                            placeholder='Sequence'
                            name='sequence'
                            value={sequence}
                            onChange={this.handleAddChange}
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
                    <Table.HeaderCell>Business Rule</Table.HeaderCell>
                    <Table.HeaderCell>Network</Table.HeaderCell>
                    <Table.HeaderCell>Zone</Table.HeaderCell>
                    <Table.HeaderCell>Rule Type</Table.HeaderCell>
                    <Table.HeaderCell>Rule Value</Table.HeaderCell>
                    <Table.HeaderCell>Include/Exclude</Table.HeaderCell>
                    <Table.HeaderCell>Value</Table.HeaderCell>
                    <Table.HeaderCell>Sequence</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                
                <Table.Body>      
                    {this.state.businessRules.map((item,key) =>(
                    <Table.Row key={key}>
                        <Table.HeaderCell>{item.businessRule}</Table.HeaderCell>
                        <Table.HeaderCell>{item.network}</Table.HeaderCell>
                        <Table.HeaderCell>{item.zone}</Table.HeaderCell>
                        <Table.HeaderCell>{item.ruleType}</Table.HeaderCell>
                        <Table.HeaderCell>{item.ruleValue}</Table.HeaderCell>
                        <Table.HeaderCell>{item.includeExclude}</Table.HeaderCell>
                        <Table.HeaderCell>{item.value}</Table.HeaderCell>
                        <Table.HeaderCell>{item.sequence}</Table.HeaderCell>
                        <Table.HeaderCell>
                        <Icon name='pencil' onClick={() => {this.setState({ ruleObj : {id:item.id,  businessRule: item.businessRule, network: item.network, zone: item.zone, ruleType: item.ruleType, ruleValue: item.ruleValue, includeExclude: item.includeExclude, value: item.value, sequence: item.sequence}, open: true, updateFlag :true })}}/>
                        <Icon name='delete' onClick={() => this.deleteBusinessRule(item.id)}/>
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
export default BusinessRule;