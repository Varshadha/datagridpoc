import React, {Component} from 'react';
import { Table, Icon, Pagination } from 'semantic-ui-react';

class DataTable extends Component{
    constructor(props){
        super(props)
        this.state = {}
        this.renderTableData = this.renderTableData.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.updateState = this.updateState.bind(this);
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
                    <Icon name='pencil' onClick={() => this.updateState(item)}/>
                    <Icon name='delete' onClick={() => this.deleteRecord(item.id)}/>
                </Table.HeaderCell>                   
            </Table.Row>
            )
        })
     }
    render(){
        return(
            <Table>
            <Table.Header>
            <Table.Row>
                {this.props.tableHeaderList.map((item,key) =>(
                    <Table.HeaderCell key={key}>{item}</Table.HeaderCell>
                ))}                
            </Table.Row>
            </Table.Header>
            <Table.Body>  
            {this.renderTableData(this.props.tableDataList)}         
            </Table.Body>
            <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='4'>
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
            </Table.Row>
            </Table.Footer>
        </Table>
        )
    }
}
export default DataTable;