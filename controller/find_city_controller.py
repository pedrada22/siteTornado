import tornado
from geopy.geocoders import Nominatim
import json
from timezonefinder import TimezoneFinder
from datetime import datetime
import pytz



def request_control_get (objReqHandler=False):#pass a request handler object.
    
    
    objReqHandler.redirect('/')
    
    
def request_control_post (objReqHandler=False):#pass a request handler object.
    
    request_payload = tornado.escape.json_decode(objReqHandler.request.body)
    geolocator = Nominatim(user_agent="AstroM")
    list_result = geolocator.geocode({"city":str(request_payload)},exactly_one=False)
    resList = []
    #import pdb;pdb.set_trace()
    if type(list_result) == None:
        resList.append(["Nenhuma cidade encontrada com o nome passado.",(0,0),])
    else:
        for i in list_result:
            resList.append([i[0],i[1],])
    objReqHandler.write(json.dumps(resList))
    
