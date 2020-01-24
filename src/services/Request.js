import Ajax from 'robe-ajax';
import {BASE_URL} from '../Constants'
class Request {
    static getHeader() {
        // let userToken = JSON.parse(localStorage.getItem('userToken'));
        let userToken = 'cvcvfdfdf';
        let headers = {
            'authorization' : userToken
        }       
        return headers;
    }

    static call(service, {data, method}, cb){
        let reqData = data; 
        let headers = Request.getHeader();

        return Ajax.ajax({
            url : BASE_URL + service,
            method : method,
            headers : headers,
            data : (method === 'get' || method === 'delete') ? undefined : JSON.stringify(reqData),
            processData : true,
            cache : true,
            contentType : 'application/json',
            dataType : 'JSON'
        }).done((data, status, xhr) => {
            let err;
            if(data){                
                cb(null, data)            
            }else{
                err = 'Data not found'
                cb({code : 0, message : err})
            }
        }).fail((data) => {
            cb({code : 0, message : 'Network Error'})
        })
    }
}
 export default Request;