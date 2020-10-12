
from model import connection_to_db
import cgi

class users_table (connection_to_db.connection_to_db):
    
    @classmethod
    def insert_user(cls,name,email,passwd,):
        
        name = str(cgi.escape(name))
        email = str(cgi.escape(email))
        passwdResult = str(cls.hash_password(passwd))
        
        
        res = cls.fetch_data("""select user_id, user_name, user_email from public.user where user_name like %s or user_email like %s""",(name, email,))
        if res == []:
            try:
                cls.insert_data("insert into public.user (user_name, user_email, pw) values (%s, %s, %s)",(name,email,passwdResult,))
            except:
                print ("erro ao gravar usuario, email ja registrado? nome ja registrado?")
                return False
            
        else:
            return False
        newID = cls.fetch_data("select user_id from public.user where user_name like %s and user_email like %s",(name, email,))
        return newID[0]

    @classmethod
    def delete_user(cls,name,email):
        
        name = cgi.escape(name)
        email = cgi.escape(email)
        
        res = cls.fetch_data("select user_id, user_name, user_email from public.user where user_name like %s or user_email like %s",(name, email,))
        if len(res) == 1 :
            userId = cls.fetch_data("select user_id from public.user where user_name like %s or user_email like %s",(name, email,))[0][0]
            cls.delete_data("delete from public.user where user_id=%s",(userId,))
            
        else:
            return False
    @classmethod
    def fetch_users(cls,name,email):
        
        name = "%"+cgi.escape(name.lower())+"%"
        email = cgi.escape(email.lower())
        
        userId = False
        res = cls.fetch_data("""select user_id, user_name, user_email from public.user where user_name like %s and user_email like %s""",(name, email,))
        

        
        #if len(res) > 0 :
            #userId = cls.fetch_data("""select user_id from public.user where user_name like %s and user_email like %s""",(name, email,))
            #cls.fetch_data("delete from user where user_id=%s",(userId,))
            
        
        return res
    
    
    @classmethod
    def fetch_login(cls,name,pw):
        
        name = "%"+cgi.escape(name.lower())+"%"
        #email = cgi.escape(email.lower())
        pw = pw
        
        userId = False
        res = cls.fetch_data("""select user_id, user_name, user_email, pw from public.user where user_name like %s """,(name, ))
        
        
        try :
            if len(res) == 1 :
                if cls.verify_password(res[0][3], pw):
                    return res[0][0]
            #cls.fetch_data("delete from user where user_id=%s",(userId
        except:
            return False
        return userId
        

