
import os
import tornado.ioloop
import cgi
import tornado.web as web

from controller import user_controller
from controller import register_controller
from controller import index_controller

public_root = os.path.join(os.path.dirname(__file__), '.')

class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("user_data")

class UserHandler(BaseHandler):
    def get(self):
        user_controller.request_control_get(self)

    def post(self):
        user_controller.request_control_post(self)

class RegisterHandler(tornado.web.RequestHandler):
    
    def get(self):
        register_controller.request_control_get(self)

    def post(self):
        register_controller.request_control_post(self)

class MainHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        index_controller.request_control_get(self)

    @tornado.web.authenticated
    def post(self):
        index_controller.request_control_post(self)

class NotFoundHandler(tornado.web.RequestHandler):
    def get(self, *args):
        self.render('404.html')

    def post(self, *args):
        self.render('404.html')


handlers = [
    (r'/', MainHandler),
    (r'/login', UserHandler),
    (r'/register', RegisterHandler),
    (r'/public/(.*)', tornado.web.StaticFileHandler, {'path': public_root+'/public'}),
    (r'/(.*)', NotFoundHandler),
]

settings = dict(
    debug=True,
    login_url = "/login",
    cookie_secret="my_cookie_random_value",
    xsrf_cookies= True,
    static_path=public_root+'/public',
    template_path=public_root+'/view',
)

application = web.Application(handlers, **settings)

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
    
    
