

import tornado
from model import users_table


def request_control_get (objReqHandler=False):#pass a request handler object.
    if objReqHandler:
        objReqHandler.render('register.html', name1="", email1="")
    
def request_control_post (objReqHandler=False):#pass a request handler object.
    if objReqHandler:
        name = objReqHandler.get_body_argument("ui_usr_name")
        email = objReqHandler.get_body_argument("ui_usr_email")
        pw = objReqHandler.get_body_argument("ui_usr_pw")
        
        data = users_table.users_table.fetch_users(name,email)
        
        if data:
            pobjReqHandler.render('register.html', name1="ja existe", email1="nao sera registrado")
        else:
            users_table.users_table.insert_user(name,email,pw)
            #objReqHandler.render('login.html', name1=name, email1=email,)
            objReqHandler.redirect('/login')
        
        
        
    
class Register_controller:
    
    pass
