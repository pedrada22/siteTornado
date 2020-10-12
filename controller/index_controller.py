

import tornado



def request_control_get (objReqHandler=False):#pass a request handler object.
    if objReqHandler:
        
        objReqHandler.render('index.html')
        
def request_control_post (objReqHandler=False):#pass a request handler object.
    if objReqHandler:
        
        objReqHandler.render('index.html')
        
class Index_controller:
    
    pass
