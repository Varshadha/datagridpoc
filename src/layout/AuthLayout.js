import React, {Component} from 'react';

class AuthLayout extends Component{
    render(){
        return (
            <div className="auth-layout">
                {this.props.children}
            </div>
            )            
    }
}
export default AuthLayout;