import React, {Component} from 'react';
import { Modal, Button, Header, Grid, Form, Input, Icon } from 'semantic-ui-react'
import UserService from '../services/UserService';
import DataTable from './DataTable';
import DataForm from './DataForm';
import Toaster from '../Toaster'
class GreenList extends Component{
    constructor(props){
        super(props)
        this.state = { 
            id: undefined,
            name: '', 
            duration: '',
            usageCount: '',
            greenList : [],
            page : 1,
            pageSize : 10,
            pageCount : 2,  
            rows : 5,
            tableHeaderList : ["Name","Duration","Usage Count","Action"],
            sortColumnList : ["Name"],            
            open: false,
            nameSearch : '',
            durationSearch : '',
            sortCol : '',
            sortOrder : 'asc'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getGreenList = this.getGreenList.bind(this)
        this.deleteGreenList = this.deleteGreenList.bind(this)
        this.updateState = this.updateState.bind(this)
        this.close =  this.close.bind(this)
        this.updateRowsSize = this.updateRowsSize.bind(this)
        this.getGreenList(this.state.page,this.state.rows);
    }    
    handleSearchSubmit = () => {
        const { nameSearch, durationSearch } = this.state
        this.setState({ nameSearch: nameSearch, durationSearch: durationSearch })
        let reqData = {}
        reqData.name = nameSearch
        if(durationSearch){
            reqData.duration = durationSearch
        }
        let me = this;
        UserService.searchGreenList(reqData,function(err, response){
            if(!err && response ){                
                me.setState({greenList : response})
            }else{                
                Toaster.show('error',err);
            }
        })
    }

    handleChange = (name, value) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { id, name, duration, usageCount} = this.state
        let updateFlag = this.state.updateFlag
        this.setState({ name: name, duration: duration, usageCount:usageCount})
        let reqData = {
            "name" : name,            
            "duration" : duration,
            "usageCount" : usageCount,           
        }
        if(updateFlag) reqData.id = id
        let me = this;        
        UserService.addUpdateGreenList(reqData,updateFlag,function(err, response){
            if(!err && response ){
                if(updateFlag)                   
                    me.setState({greenList: me.state.greenList.filter(function(item) { 
                        return item.id !== response.id
                    })});
                me.setState({greenList : [...me.state.greenList, response], open: false})
                me.setState({name: '', duration: ''})

                let msg = 'Record added successfully'
                if(updateFlag)
                    msg = "Record updated successfully"
                Toaster.show('success',msg); 
            }else{
                Toaster.show('error',err.message);
            }
        })
    }
    getGreenList(page,limit,col,order){
        let me = this;        
        let reqData = {'page' : page || this.state.page, 'limit' : limit || this.state.rows, 'col' : col || this.state.sortCol, 'order' : order || this.state.sortOrder}
        UserService.getGreenList(reqData,function(err, response){
            if(!err && response ){
                me.setState({greenList : response})
            }else{
                Toaster.show('error',err.message);
            }
        })
    }
    deleteGreenList(itemId){    
        let me = this;    
        UserService.deleteGreenList(itemId,function(err, response){
            if(!err && response ){
                me.setState({greenList: me.state.greenList.filter(function(item) { 
                    return item.id !== itemId
                })});
                Toaster.show('success','Record deleted successfully');
            }else{
                Toaster.show('error',err.message);
            }
        })
    }
    handlePaginationChange = (activePage) => {
        this.setState({'page' : activePage})
        this.getGreenList(activePage)
    }
    updateState(item){
        // this.setState({ id :item.id, name: item.name, duration: item.duration, usageCount: item.usageCount, open: true, updateFlag :true })
        this.setState({ id :item.id, name: item.name, duration: item.duration, usageCount: item.usageCount, updateFlag :true })
    }    
    close = () => this.setState({ open: false })

    updateRowsSize(value){
        this.setState({ 'rows' : value })
        this.getGreenList(this.state.page,value);
    }
    handleSortChange = (col,order) => {
        this.setState({'sortCol' : col, 'sortOrder' : order})
        this.getGreenList(null,null,col,order)
    }
    render(){
        const { id, name, duration, usageCount, open, nameSearch, durationSearch} = this.state
        const formData = {"id": id, "name": name, "duration": duration, "usageCount": usageCount}
        const formName = "GreenList"      
        const formDataList = [
            {"column" : "name", "type" : "text", "value" : this.state.name}, 
            {"column" : "duration", "type" : "text", "value" : this.state.duration}
        ]
        return(
            <div className="main-section-container">
                <div className="screen-head">
                    <div className="page-title">
                        <Header as='h3'>EverGreen Content</Header>
                    </div>
                    <div className="action-box">
                        <Grid>
                            <Grid.Column mobile={6} tablet={4} computer={12}>
                            <Form className="search-form" onSubmit={this.handleSearchSubmit}>
                            <Form.Group>
                                <Input icon placeholder='Enter File Name'
                                name='nameSearch'
                                value={nameSearch}
                                onChange={this.handleChange} className="searchInputField">
                                <input />
                                <Icon name='search' />
                                </Input>
                                <Form.Input
                                placeholder='Duration'
                                name='durationSearch'
                                value={durationSearch}
                                onChange={this.handleChange}
                                className="searchInputField"
                                />
                                <Form.Button content='Search'  className="searchButton"/>
                            </Form.Group>
                            </Form>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={12} computer={4}> 
                            <Button compact className="blue-btn add-btn right" onClick={() => {this.setState({open: true, updateFlag: false , name: '', duration: '', usageCount:''})}} >Add</Button>
                            </Grid.Column>
                        </Grid>
                    </div>
                </div>
                <Modal
                size='small'
                open={open}
                onClose={this.close}>
                    <Modal.Header>Add into EverGreen Content</Modal.Header>
                    <Modal.Content image>                    
                    <Modal.Description>
                        <Header></Header>
                        <DataForm formDataList={formData} 
                        formName={formName}
                        handleChange={this.handleChange} 
                        handleSubmit={this.handleSubmit} 
                        cancel={this.close}
                        />
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
                <DataTable 
                tableHeaderList={this.state.tableHeaderList} 
                tableDataList={this.state.greenList} 
                sortColumnList={this.state.sortColumnList}
                pageCount={this.state.pageCount} 
                updateState={this.updateState}
                deleteGreenList={this.deleteGreenList} 
                handlePaginationChange={this.handlePaginationChange} 
                updateRowsSize={this.updateRowsSize}
                handleSortChange={this.handleSortChange} 
                formDataList = {formDataList}
                handleChange = {this.handleChange}
                handleSubmit = {this.handleSubmit}
                />                
            </div>
        )            
    }
}
export default GreenList;