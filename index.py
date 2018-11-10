#import tornado.ioloop
#import tornado.web
#import os
#
#public_root = os.path.join(os.path.dirname(__file__), 'public')
#
#class MainHandler(tornado.web.RequestHandler):
#    def get(self):
#        self.render("mainLoop.html")
#
#def make_app():
#    return tornado.web.Application([
#        (r"/", MainHandler),
#        (r'/(.*)', tornado.web.StaticFileHandler, {'path': public_root}),
#    ])
#
#if __name__ == "__main__":
#    app = make_app()
#    app.listen(8888)
#    tornado.ioloop.IOLoop.current().start()


import os
import tornado.ioloop
import tornado.web as web

public_root = os.path.join(os.path.dirname(__file__), '.')

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        parametro1 = 'par 1'
        parametro2 = 'par 2'
        self.render('index.html', parametro1=parametro1, parametro2=parametro2)

    def post(self):
        parametro1 = self.get_body_argument("imp1")
        parametro2 = self.get_body_argument("imp2")
        self.render('index.html', parametro1=parametro1, parametro2=parametro2)
        
        
handlers = [
    (r'/', MainHandler),
    (r'/(.*)', tornado.web.StaticFileHandler, {'path': public_root}),
]

settings = dict(
    debug=True,
    static_path=public_root,
    template_path=public_root
)

application = web.Application(handlers, **settings)

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
    
    
