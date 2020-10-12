import psycopg2

import hashlib, binascii, os



USER = "postgres"
PASSWORD = "a654321"
HOST = "localhost"
PORT = "5432"
DATABASE = "pedrada"

class connection_to_db:
    
    @staticmethod
    def insert_data(query,params,):
        """
        
        query = \""" INSERT INTO mobile (ID, MODEL, PRICE) VALUES (%s,%s,%s)\"""
        params = (5, 'One Plus 6', 950)#note that it is a tuple, not a list
        
        """
        #import pdb;pdb.set_trace()
        try:
            connection = psycopg2.connect(user=USER,
                                           password=PASSWORD,
                                           host=HOST,
                                           port=PORT,
                                           database=DATABASE)
            cursor = connection.cursor()
            
            cursor.execute(query, params)
            connection.commit()
            count = cursor.rowcount
            print (count, "Record inserted successfully into mobile table")
        except (Exception, psycopg2.Error) as error :
            if(connection):
                print("Failed to insert record into mobile table", error)
        finally:
            #closing database connection.
            if(connection):
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")
    
    @staticmethod
    def update_data(query_to_check, query_to_update, params_to_check, params):
        """
        
        query_to_check -> query para ver se ha alguem para ser updateado
        query_to_update -> query para fazer o update
        params_to_check -> parametros para se fazer a checagem se o update acha alguem
        params -> parametros que serao argumentos de 
        
        examples: 
        query_to_check = \"""select * from mobile where id = %s\"""
        query_to_update = \"""Update mobile set price = %s where id = %s\"""
        params_to_check = (341,)
        params = (25.90,341,)
        
        TODO: WRITE IT IN ENGLISH!!
        
        """
        try:
            connection = psycopg2.connect(user=USER,
                                           password=PASSWORD,
                                           host=HOST,
                                           port=PORT,
                                           database=DATABASE)
            cursor = connection.cursor()
            print("Table Before updating record ")
            
            cursor.execute(query_to_check, params_to_check)
            record = cursor.fetchone()
            print(record)
            
            # Update single record now

            cursor.execute(query_to_update, params)
            connection.commit()
            count = cursor.rowcount
            print(count, "Record Updated successfully ")
            
            record = cursor.fetchone()
            print(record)
        except (Exception, psycopg2.Error) as error:
            print("Error in update operation", error)
        finally:
            # closing database connection.
            if (connection):
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")
                
    @staticmethod
    def delete_data(sql_delete_query,params,):
        """
        
        sql_delete_query = \"""Delete from mobile where id = %s\"""
        params = (5, 'One Plus 6', 950)#note that it is a tuple, not a list
        
        """
        try:
            connection = psycopg2.connect(user=USER,
                                           password=PASSWORD,
                                           host=HOST,
                                           port=PORT,
                                           database=DATABASE)
            cursor = connection.cursor()
            cursor.execute(sql_delete_query, params)
            connection.commit()
            count = cursor.rowcount
            print(count, "Record deleted successfully ")
        except (Exception, psycopg2.Error) as error:
            print("Error in Delete operation", error)
        finally:
            # closing database connection.
            if (connection):
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")
                
    
    @staticmethod
    def fetch_data (query, params,):
        connection = False
        try:
            connection = psycopg2.connect(user=USER,
                                           password=PASSWORD,
                                           host=HOST,
                                           port=PORT,
                                           database=DATABASE)
            cursor = connection.cursor()
            cursor.execute(query,params)
            print("Selecting rows from table")
            result = cursor.fetchall() 
            
            return result
        except (Exception, psycopg2.Error) as error :
            print ("Error while fetching data from PostgreSQL", error)
        finally:
            #closing database connection.
            if(connection):
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")

    @staticmethod
    def hash_password(password):
        """Hash a password for storing."""
        salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
        pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),salt, 100000)
        pwdhash = binascii.hexlify(pwdhash)
        return (salt + pwdhash).decode('ascii')
    
    @staticmethod
    def verify_password(stored_password, provided_password):
        """Verify a stored password against one provided by user"""
        salt = stored_password[:64]
        stored_password = stored_password[64:]
        pwdhash = hashlib.pbkdf2_hmac('sha512', 
                                      provided_password.encode('utf-8'), 
                                      salt.encode('ascii'), 
                                      100000)
        pwdhash = binascii.hexlify(pwdhash).decode('ascii')
        return pwdhash == stored_password
