import React, {Component} from 'react';
import { Table, Icon, Pagination, Dropdown, Confirm, Image } from 'semantic-ui-react';
import sort from '../assets/images/sort.png';
import editIcon from '../assets/images/edit.svg';
import deleteIcon from '../assets/images/delete.svg';

const rowsOptions = [    
    { key: '5', text: '5', value: '5' },
    { key: '10', text: '10', value: '10' },
    { key: '15', text: '15', value: '15' },
    { key: '20', text: '20', value: '20' }
  ]
class DataTableFirst extends Component{    
    constructor(props){
        super(props)
        this.state = { 
            open: false, 
            itemId :null,
            order : 1 
        }
        this.renderTableData = this.renderTableData.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.updateState = this.updateState.bind(this);        
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSortChange = this.handleSortChange.bind(this)
    }
    handlePagination = (e, {activePage}) =>{
        e.preventDefault();
        this.props.handlePaginationChange(activePage);
    }
    deleteRecord = (itemId) =>{                 
        this.props.deleteGreenList(itemId);
    }
    updateState = (item) =>{ 
        this.props.updateState(item);
    }
    renderTableData(tableDataList) {
        return tableDataList.map((item,key) =>{
            let col = Object.keys(item);      
            return (         
            <Table.Row key={item.id}>
                {col.map((val, index) => {
                    return val !== 'id' ? <Table.HeaderCell key={index}>{item[col[index]]}</Table.HeaderCell> : undefined
                  })}
                <Table.HeaderCell>                   
                    <Image className="editIcon" src={editIcon} alt="editIcon" verticalAlign='middle' onClick={() => this.updateState(item)}/>
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
                <Table.HeaderCell colSpan='2' className="textRight">
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