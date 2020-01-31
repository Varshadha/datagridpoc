import React, {Component} from 'react';
import { Table, Icon, Pagination, Dropdown, Confirm, Image, Form, Input, Button } from 'semantic-ui-react';
import sort from '../assets/images/sort.png';
import editIcon from '../assets/images/edit.svg';
import deleteIcon from '../assets/images/delete.svg';
import saveIcon from '../assets/images/save.svg';

const rowsOptions = [    
    { key: '5', text: '5', value: '5' },
    { key: '10', text: '10', value: '10' },
    { key: '15', text: '15', value: '15' },
    { key: '20', text: '20', value: '20' }
  ]
class DataTable extends Component{    
    constructor(props){
        super(props)
        this.state = { 
            open: false, 
            itemId :null,
            order : 1,
            editable : false,
            updateItem : {} 
        }
        this.renderTableData = this.renderTableData.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.updateState = this.updateState.bind(this);        
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handleUpdateChange = this.handleUpdateChange.bind(this);
    }
    handlePagination = (e, {activePage}) =>{
        e.preventDefault();
        this.props.handlePaginationChange(activePage);
    }
    deleteRecord = (itemId) =>{                 
        this.props.deleteGreenList(itemId);
        this.setState({itemId :null})
    }
    updateState = (item) =>{         
        if(this.state.editable && this.state.itemId == item.id){
            this.props.updateState(item);
            // this.props.handleSubmit(item);
            this.setState({itemId :null})
        }            
        else
        this.setState({ editable: true, itemId : item.id, updateItem : item })
    }
    renderTableData(tableDataList) {
        return tableDataList.map((item,key) =>{
            let col = Object.keys(item);      
            return (         
            <Table.Row key={item.id}>
                {col.map((val, index) => {
                    return val !== 'id' ? (
                    ((this.state.itemId == item.id && this.state.editable) ?
                    <Table.HeaderCell key={index}>

                    <Input
                    name={val}
                    data-id={item.id}                    
                    value={this.state.updateItem[val]}
                    // value={!item.value ? item[col[index]] : item.value}
                    onChange={this.handleUpdateChange}
                    className="inlineInput"
                    />
                    
                    </Table.HeaderCell> : <Table.HeaderCell key={index}>{item[col[index]]}</Table.HeaderCell>
                    )
                    ) : undefined
                  })}
                <Table.HeaderCell>                   
                    <Image className="editIcon" src={(this.state.editable && this.state.itemId == item.id) ? saveIcon : editIcon} alt="editIcon" verticalAlign='middle' onClick={() => this.updateState((this.state.itemId == item.id && this.state.editable) ? this.state.updateItem : item)}/>
                    <Image className="deleteIcon" src={deleteIcon} alt="deleteIcon" verticalAlign='middle' onClick={() => this.setState({ open: true , itemId : item.id})}/>
                </Table.HeaderCell>                   
            </Table.Row>
            )
        })
     }
     handleOnChange = (e, data) => {        
        this.props.updateRowsSize(data.value);
     }
     handleCancel = () => this.setState({ open: false })
     handleConfirm = () => {
        this.setState({ open: false })
        this.deleteRecord(this.state.itemId)
    }
    handleSortChange = (col) => {
        let order = this.state.order;
        this.setState({ order: !order })
        this.props.handleSortChange(col.toLowerCase(),(order) ? 'asc' : 'desc')
    }
    handleChange = (e, data) =>{
        e.preventDefault();
        this.props.handleChange(data.name, data.value);
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.handleSubmit();
    }
    handleUpdateChange = (e, data) => {
        
        // this.setState({...this.state.updateItem, [data.name]: data.value});
        this.setState(prevState => ({
            updateItem: {                   // object that we want to update
                ...prevState.updateItem,    // keep all other key-value pairs
                [data.name]: data.value      // update the value of specific key
            }
        }))
    }

    renderTableRowForm(formDataList) {
        return (
            <Table.Row> 
            {/* <Form onSubmit={this.handleSubmit}> */}
            {formDataList.map((item,key) =>{
            let col = Object.keys(item);      
            return (         
                <Table.HeaderCell key={key}>
                    <Input
                    name={item.column}
                    data-id={key}
                    type={item.type}
                    value={item.value}
                    onChange={this.handleChange}
                    className="inlineInput"
                    // disabled={this.state.editable}
                    />
                </Table.HeaderCell>                
            )
           })}
                <Table.HeaderCell>      
                    <Image className="saveIcon" src={saveIcon} alt="saveIcon" verticalAlign='middle' onClick={this.handleSubmit}/>
                </Table.HeaderCell> 
            </Table.Row>)
     }
     
    render(){
        return(
            <>
            <Confirm
            content='Are you sure you want to delete?'
            open={this.state.open}
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            size='mini'
            />
            <div className="dataTable">
            <Table striped basic='very'>
            <Table.Header>
            <Table.Row>
                {this.props.tableHeaderList.map((item,key) =>(
                    <Table.HeaderCell key={key} className="pl-0 pt-0">{item} 
                    {this.props.sortColumnList.map((i,k) =>{
                        if(item === i ){
                            return <Image key={k} className="sort" src={sort} alt="sort" verticalAlign='middle' onClick={() => this.handleSortChange(i)}/>
                        }                            
                    })} 
                    </Table.HeaderCell>
                ))}                
            </Table.Row>
            </Table.Header>            
            <Table.Body>  
            {this.renderTableRowForm(this.props.formDataList)}   
            {this.renderTableData(this.props.tableDataList)}         
            </Table.Body>
            <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='2'>
                <Pagination secondary    
                    ellipsisItem={{ content : <Icon name='ellipsis horizontal' />, icon :true}}
                    firstItem={{ content : <Icon name='backward' />, icon :true}}
                    lastItem={{ content : <Icon name='forward' />, icon :true}}
                    prevItem={{ content : <Icon name='caret left' />, icon :true}}
                    nextItem={{ content : <Icon name='caret right' />, icon :true}}
                    onPageChange={this.handlePagination}
                    totalPages={this.props.pageCount}
                    defaultActivePage={1}/>                    
                </Table.HeaderCell>
                <Table.HeaderCell colSpan='2' className="rowsPerPage textRight">
                    <span className="pageSize">                    
                        Rows per page {' '}
                        <Dropdown    
                        compact                 
                        selection          
                        options={rowsOptions}
                        defaultValue={rowsOptions[0].value}
                        direction='left'
                        onChange={this.handleOnChange}
                        />
                    </span>                    
                </Table.HeaderCell>
            </Table.Row>
            </Table.Footer>
        </Table>
        </div>
        </>
        )
    }
}
export default DataTable;