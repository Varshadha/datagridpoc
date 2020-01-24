import React, {Component} from 'react';
import { Form } from 'semantic-ui-react';

class DataForm extends Component{
    constructor(props){
        super(props)
        this.state = {}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancel = this.cancel.bind(this);       

    }
    handleChange = (e, { name, value }) =>{
        e.preventDefault();
        this.props.handleChange(name, value);
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.handleSubmit();
    }
    cancel() {          
        this.props.cancel();
    }    
    renderFormField(formDataList) {        
        let col = Object.keys(formDataList);      
        return (  
            <Form.Group>     
            {col.map((val, index) => {
                return (<Form.Input key={index}
                placeholder={col[index]}
                name={col[index]}
                value={formDataList[col[index]]}
                onChange={this.handleChange}
                type={(col[index] === 'id') ? 'hidden' : 'text'}
                />)                
                })}         
            </Form.Group>      
        )
     }
     
    render(){        
        return(        
        <Form className={(this.props.formName) + 'data-form'} onSubmit={this.handleSubmit}>
            {this.renderFormField(this.props.formDataList)} 
            <Form.Group>
                <Form.Button content='Save' />
                <Form.Button  type="button" content='Cancel' onClick={this.cancel} negative/>
            </Form.Group>
        </Form>
        )
    }
}
export default DataForm;