// this file should centralize all .js files, objects and calls in order of execution.

document.writeln("<script type='text/javascript' src='src/util.js'></script>");
document.writeln("<script type='text/javascript' src='src/objs/mouse.js'></script>");
document.writeln("<script type='text/javascript' src='src/objs/touch.js'></script>");
document.writeln("<script type='text/javascript' src='src/objs/rectangular.js'></script>");
document.writeln("<script type='text/javascript' src='src/objs/circle.js'></script>");

document.writeln("<script type='text/javascript' src='src/gameLogic.js'></script>");


//document.writeln("<script type='text/javascript' src='src/all.js'></script>");// this is a temporary solution to port an old construction to new days...

document.writeln("<script type='text/javascript' src='src/main.js'></script>");//MAIN should be analogous to a tornado index/main execute the program on port x and direct the execution to other files.. - this is a temporary solution to port an old construction to new days...
