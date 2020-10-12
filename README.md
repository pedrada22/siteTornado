# siteTornado
Is a set of web site apps or things related. Full of examples of stuff that can be served trough tornado.
(tornado is a python based web server that does it all magestically)
To run it, i suggest to do the usual python enviroment with virtualenv and pip to download the requirements file:

in project ./ source folder:\
<code>
pip install -r requirements.txt
</code>\
then: \
<code>
python index.py
</code>\
and you are good to go.\
initially setted to serve at http://localhost:8888/
examples at:

* http://localhost:8888 - 
[**post** and **get** examples passing information on form submit](http://localhost:8888)

* http://localhost:8888/public/game.html
[My attempt to do a html5 canvas game framework](http://localhost:8888/public/game.html)
Feel free to clone it and maybe add more functionalities like sprites, masks(map movement)...
