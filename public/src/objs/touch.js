var objetoTouchMethod = {};

objetoTouchMethod.updateDirVel = function()//movimento de formiguinhas.
{
    this.direcaoGraus =  (Math.atan2((-this.posInicialY+this.y),(-this.posInicialX+this.x)))*(180/Math.PI);
    this.velocidade =  (Math.sqrt((this.x-this.posInicialX)*(this.x-this.posInicialX) +(this.y-this.posInicialY)*(this.y-this.posInicialY)))/((Date.now() - this.touchStartTime)/1000);
};

objTouch = function ()
{
    var results = {};
    results.naTela = false;
    results.x = 0;
    results.y = 0;
    results.h = 5;
    results.w = 5;
    results.velocidade = 0.0;
    results.direcaoGraus = 0.0;
    results.touchStartTime=0.0;
    results.posInicialX = -50;
    results.posInicialY = -50;
    results.previousTouchTime = 0.0;
    results.posAnteriorX = -50;
    results.posAnteriorY = -50;

    results.updateDirVel = objetoTouchMethod.updateDirVel;

    return results;
}

function tocouObj(listaObjs,objetoTouch)//da forma que esta o unico objeto retornado eh o ultimo que for desenhado
{    // isso implica em passar uma listaObjs ordenada por ordem de desenho sendo que o ultimo desenhado eh o ultimo da lista.
    offset=0//serve para prover um gap
    var listaColisoes = [];
    var conf = false;
    var j = objetoTouch;
    //var listaPula = [];
    for (i in listaObjs)
    {


        if (listaObjs[i].x < j.x + j.w &&
        listaObjs[i].x + listaObjs[i].w > j.x &&
        listaObjs[i].y < j.y + j.h &&
        listaObjs[i].h + listaObjs[i].y > j.y)
        {
            listaColisoes = [listaObjs[i],j];
            conf = true;
        }

    }
    return [conf,listaColisoes]
}

function canvasTouchMove(e) {
    // Update the touch co-ordinates
    getTouchPos(e);

    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    //drawDot(ctx,touchX,touchY,12);


    dedo.x=touchX;
    dedo.y=touchY;
    dedo.updateDirVel();
    dedo.previousTouchTime = Date.now();
    dedo.posAnteriorX = touchX;
    dedo.posAnteriorY = touchY;

    var laranja = objetoRet(30,30,'src/loadables/Laranja.png');
    laranja.direcaoGraus = 360*Math.random();
    laranja.x = touchX;
    laranja.y = touchY;
    laranja.posInicialX = touchX;
    laranja.posInicialY = touchY;
    laranja.carregaImg(context);

    listaDeObjs.push(laranja);
    totalObjs = totalObjs+1;
    if (totalObjs > maxObjs)
    {
        listaDeObjs.shift();//remove o primeiro elemento
        totalObjs = totalObjs-1;
    }

    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();


}
var dirFinal = 0;
var velFinal = 0;

function canvasTouchEnd (e) {
    // Update the touch co-ordinates
    getTouchPos(e);

    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    //drawDot(ctx,touchX,touchY,12);



    dedo.x=touchX;
    dedo.y=touchY;
    dedo.updateDirVel();
    dedo.previousTouchTime = Date.now();
    dedo.posAnteriorX = touchX;
    dedo.posAnteriorY = touchY;

    dirFinal = dedo.direcaoGraus;
    velFinal = dedo.velocidade;

    dedo.x=-10;
    dedo.y=-10;
    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();
}

// Get the touch position relative to the top-left of the canvas
// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
function getTouchPos(e) {
    if (!e)
        var e = event;

    if(e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
}
