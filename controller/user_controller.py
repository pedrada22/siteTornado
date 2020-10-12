

import tornado
from model import users_table


def request_control_get (objReqHandler=False):#pass a request handler object.
    if objReqHandler:
        #import pdb;pdb.set_trace()
        name = ""
        pw = ""
        objReqHandler.render('login.html', name=name, pw=pw)
        
def request_control_post (objReqHandler=False):#pass a request handler object.
    if objReqHandler:
        #import pdb;pdb.set_trace()
        name = objReqHandler.get_body_argument("ui_usr_name")
        email = ""#objReqHandler.get_body_argument("ui_usr_pw")
        pw = objReqHandler.get_body_argument("ui_usr_pw")

        
        data = users_table.users_table.fetch_login(name,pw)
        
        if data:
            objReqHandler.set_secure_cookie("user_data", str(data))
            objReqHandler.redirect("/mapa")

        else:
            print ("not autenticated")
            name="nao autenticado"
            pw="tente novamente"
            objReqHandler.render('login.html', name=name, pw=pw,)
    
class User_controller:
    
    pass
    
