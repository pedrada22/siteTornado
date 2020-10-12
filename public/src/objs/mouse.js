
var objetoMouseMethod = {};

objMouse = function ()
{
    var results = {};
    results.onScreen = false;
    //results.wasOnScreenLastMouseDown = false;
    results.x = 0;
    results.y = 0;
    results.h = 1;
    results.w = 1;
    results.mouseDownStartTime=0.0;
    results.posMouseDownX = 0.0;
    results.posMouseDownY = 0.0;
    results.previousMouseTime = 0.0;
    results.posMouseUpX = -50;
    results.posMouseUpY = -50;
    results.objsUnderMouseDown = [];

    return results;
}

function clicouObj(listaObjs,objetoMouse)//da forma que esta o unico objeto retornado eh o ultimo que for desenhado
{    // isso implica em passar uma listaObjs ordenada por ordem de desenho sendo que o ultimo desenhado eh o ultimo da lista.
    offset=0//serve para prover um gap
    var listaColisoes = [];
    var conf = false;
    var j = objetoMouse;
    //var listaPula = [];
    for (i in listaObjs)
    {


        if (listaObjs[i].x < j.posMouseDownX + j.w &&
        listaObjs[i].x + listaObjs[i].w > j.posMouseDownX &&
        listaObjs[i].y < j.posMouseDownY + j.h &&
        listaObjs[i].h + listaObjs[i].y > j.posMouseDownY)
        {
            listaColisoes = [listaObjs[i],j];
            conf = true;
        }

    }
    return [conf,listaColisoes]
}
// Keep track of the mouse button being pressed and draw a dot at current location
    function sketchpad_mouseDown() {
        mouseDown=1;
        aleatorioPressMouse = Math.ceil(Math.random()*6)-1;
        
        theMouse.mouseDownStartTime=Date.now();
        theMouse.posMouseDownX = mouseX;
        theMouse.posMouseDownY = mouseY;
        res = clicouObj(listaDeObjs,theMouse);
        if (res[0])
        {
            for (iii of res[1])
            {
                theMouse.objsUnderMouseDown.push(iii);
                
            }
        }
        
    }

    // Keep track of the mouse button being released
    function sketchpad_mouseUp() {
        mouseDown=0;
        
        theMouse.previousMouseTime = Date.now() - theMouse.mouseDownStartTime;
        theMouse.posMouseUpX = mouseX;
        theMouse.posMouseUpY = mouseY;
        
        if (theMouse.onScreen && theMouse.objsUnderMouseDown.length == 0)
        {
            
            var circ1 = objetoCirculo(10,"src/loadables/circulo.png");

            circ1.cx = theMouse.posMouseDownX;
            circ1.cy = theMouse.posMouseDownY;
            circ1.x = circ1.cx-circ1.r;
            circ1.y = circ1.cy-circ1.r;
            circ1.peso = 0.001;

            circ1.carregaImg(context);
            circ1.direcaoGraus = Math.atan2((theMouse.posMouseUpY-theMouse.posMouseDownY),(theMouse.posMouseDownX - theMouse.posMouseUpX))*(180/Math.PI);
            circ1.velocidade = 5*Math.sqrt(((theMouse.posMouseUpY-theMouse.posMouseDownY)**2)+((theMouse.posMouseUpX-theMouse.posMouseDownX)**2));

            listaDeObjs.push(circ1);
            listaDeCirculos.push(circ1);
            totalObjs = totalObjs+1;
            totalCirculos = totalCirculos+1;
            if (totalObjs > maxObjs || totalCirculos > maxObjs)
            {
                    listaDeObjs.shift();//remove o primeiro elemento
                    listaDeCirculos.shift();
                    totalObjs = totalObjs-1;
                    totalCirculos = totalCirculos-1;
            }
        }
        linesToDraw = [];//reset on mouse up
        theMouse.objsUnderMouseDown = [];//reset
    }

    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    function canvasMouseMove(e) {
        // Update the mouse co-ordinates when moved
        getMousePos(e);
        theMouse.x = mouseX;
        theMouse.y = mouseY;
        //theMouse.onScreen = true;
        if (mouseDown)
        {
            linesToDraw = [[theMouse.posMouseDownX,theMouse.posMouseDownY,theMouse.x,theMouse.y]];
        }
        for (i of theMouse.objsUnderMouseDown)
        {
            i.x = mouseX-(i.w/2);
            i.y = mouseY-(i.h/2);
            i.velocidade = 0;
            i.direcaoGraus = 0;
        }
    }

// Get the current mouse position relative to the top-left of the canvas
function getMousePos(e) {
    if (!e)
        var e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
 }
function canvasMouseAway(e)
{
    theMouse.onScreen = false;
}

function canvasMouseIn(e)
{
    theMouse.onScreen = true;
}

// Draw something when a touch start is detected
function canvasTouchStart() {
    dedo = objTouch();
    // Update the touch co-ordinates
    getTouchPos();

    //drawDot(ctx,touchX,touchY,12);

    dedo.x=touchX;
    dedo.y=touchY;
    //dedo.updateDirVel();
    dedo.posInicialX = touchX;
    dedo.posInicialY = touchY;
    dedo.posAnteriorX = touchX;
    dedo.posAnteriorY = touchY;
    dedo.touchStartTime=Date.now();
    dedo.previousTouchTime = Date.now();
    //dedo.updateDirVel();

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
}
