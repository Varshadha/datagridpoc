import Request from './Request';

class UserService {
    static login(reqData, cb){
        // Request.call('users/login',{data : reqData, method : 'post'}, cb);
        Request.call('users/'+reqData.id,{data : reqData, method : 'post'}, cb);
    }
    static logout(reqData, cb){
        Request.call('users/logout/'+reqData.id,{data : '', method : 'get'}, cb);
    }
    static getMasterNetworkZoneList(reqData,cb){
        let page = reqData.page
        Request.call('masterNetworkZoneList/?_page='+page+'&_limit=3',{data : '', method : 'get'}, cb);
    } 
    static addUpdateMasterNetworkZone(reqData,updateFlag,cb){     
        if(updateFlag)  
            Request.call('masterNetworkZoneList/'+reqData.id,{data : reqData, method : 'put'}, cb);
        else
            Request.call('masterNetworkZoneList',{data : reqData, method : 'post'}, cb);
    } 
    static deleteMasterNetworkZone(Id,cb){     
        Request.call('masterNetworkZoneList/'+Id,{data : '', method : 'delete'}, cb);        
    } 
    static searchMasterNetworkZone(reqData,cb){
        let network = reqData.network
        let zone = reqData.zone
        let queryStr = '';
        if(zone && network)
            queryStr = 'cueNet='+network+'&cueZone='+zone;
        else if(!zone && network)
            queryStr = 'cueNet='+network;
        else if(zone && !network)
            queryStr = 'cueZone='+zone; 
        else 
            queryStr = ''  
        Request.call('masterNetworkZoneList/?'+queryStr,{data : '', method : 'get'}, cb);
    }
    static getBusinessRules(reqData,cb){
        let page = reqData.page
        Request.call('businessRules/?_page='+page+'&_limit=4',{data : '', method : 'get'}, cb);
    }
    static addUpdateBusinessRule(reqData,updateFlag,cb){     
        if(updateFlag)  
            Request.call('businessRules/'+reqData.id,{data : reqData, method : 'put'}, cb);
        else
            Request.call('businessRules',{data : reqData, method : 'post'}, cb);
    }
    static deleteBusinessRule(Id,cb){     
        Request.call('businessRules/'+Id,{data : '', method : 'delete'}, cb);        
    } 
    static searchBusinessRules(reqData,cb){
        let network = reqData.network
        let zone = reqData.zone
        let queryStr = '';
        if(zone && network)
            queryStr = 'network='+network+'&zone='+zone;
        else if(!zone && network)
            queryStr = 'network='+network;
        else if(zone && !network)
            queryStr = 'zone='+zone; 
        else 
            queryStr = ''  
        Request.call('businessRules/?'+queryStr,{data : '', method : 'get'}, cb);
    }
    static getSspMaster(reqData,cb){
        let page = reqData.page
        Request.call('sspMaster/?_page='+page+'&_limit=3',{data : '', method : 'get'}, cb);
    }
    static addUpdateSspMaster(reqData,updateFlag,cb){     
        if(updateFlag)  
            Request.call('sspMaster/'+reqData.id,{data : reqData, method : 'put'}, cb);
        else
            Request.call('sspMaster',{data : reqData, method : 'post'}, cb);
    }
    static deleteSspMaster(Id,cb){     
        Request.call('sspMaster/'+Id,{data : '', method : 'delete'}, cb);        
    } 
    static searchSspMaster(reqData,cb){
        let sspName = reqData.sspName
        let queryStr = '';
        if(sspName)
            queryStr = 'sspName='+sspName;       
        else 
            queryStr = ''
        Request.call('sspMaster/?'+queryStr,{data : '', method : 'get'}, cb);
    }
    static getEdges(reqData,cb){
        let page = reqData.page
        Request.call('edge/?_page='+page+'&_limit=2',{data : '', method : 'get'}, cb);
    }  
    static addUpdateEdge(reqData,updateFlag,cb){     
        if(updateFlag)  
            Request.call('edge/'+reqData.id,{data : reqData, method : 'put'}, cb);
        else
            Request.call('edge',{data : reqData, method : 'post'}, cb);
    }
    static deleteEdge(Id,cb){     
        Request.call('edge/'+Id,{data : '', method : 'delete'}, cb);        
    } 
    static searchEdge(reqData,cb){
        let edgeName = reqData.edgeName
        let ipAddress = reqData.ipAddress
        let queryStr = '';
        if(ipAddress && edgeName)
            queryStr = 'edgeName='+edgeName+'&ipAddress='+ipAddress;
        else if(!ipAddress && edgeName)
            queryStr = 'edgeName='+edgeName;
        else if(ipAddress && !edgeName)
            queryStr = 'ipAddress='+ipAddress; 
        else 
            queryStr = ''
        Request.call('edge/?'+queryStr,{data : '', method : 'get'}, cb);
    }
    static getGreenList(reqData,cb){
        let page = reqData.page
        let limit = reqData.limit
        let col = reqData.col
        let order = reqData.order
        let sortStr = ''
        if(col)
            sortStr = '&_sort='+col+'&_order='+order
        Request.call('greenList/?_page='+page+'&_limit='+limit+sortStr,{data : '', method : 'get'}, cb);
    }   
    static addUpdateGreenList(reqData,updateFlag,cb){     
        if(updateFlag)  
            Request.call('greenList/'+reqData.id,{data : reqData, method : 'put'}, cb);
        else
            Request.call('greenList',{data : reqData, method : 'post'}, cb);
    } 
    static deleteGreenList(Id,cb){     
        Request.call('greenList/'+Id,{data : '', method : 'delete'}, cb);   
    } 
    static searchGreenList(reqData,cb){
        let name = reqData.name
        let duration = reqData.duration
        let queryStr = '';
        if(duration && name)
            queryStr = 'name='+name+'&duration='+duration;
        else if(!duration && name)
            queryStr = 'name='+name;
        else if(duration && !name)
            queryStr = 'duration='+duration; 
        else 
            queryStr = ''
        Request.call('greenList/?'+queryStr,{data : '', method : 'get'}, cb);
    }
    static getVideoLibrary(reqData,cb){
        let page = reqData.page
        Request.call('videoLibrary/?_page='+page+'&_limit=5',{data : '', method : 'get'}, cb);
    }     
    static addUpdateVideoLibrary(reqData,updateFlag,cb){     
        if(updateFlag)  
            Request.call('videoLibrary/'+reqData.id,{data : reqData, method : 'put'}, cb);
        else
            Request.call('videoLibrary',{data : reqData, method : 'post'}, cb);
    } 
    static deleteVideo(Id,cb){     
        Request.call('videoLibrary/'+Id,{data : '', method : 'delete'}, cb);        
    } 
    
}

export default UserService;