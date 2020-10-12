

//var global    //var global    //var global    //var global    //var global    //var global    //var global
var dedo = objTouch();
var theMouse = objMouse();
var touchX = 0;
var touchY = 0;
var mouseX,mouseY,mouseDown=0;
var colisaoResult = [];
var firstRender = Date.now();
var presentTime = Date.now();
var lastRender = Date.now();
var delta = 0;
var listaDeObjs = [];
var listaDeCirculos = [];
var colisaoTelaResult=[];
//var global    //var global    //var global    //var global    //var global    //var global    //var global


var canvas = [];
var context = [];
var canvasBg = [];
var contextBg = [];
var canvasHUD = [];
var contextHUD = [];
var tamanhoCanvasHUDH = 0;
var tamanhoCanvasHUDW = 0;
var tamanhoCanvasFgH  = 0;
var tamanhoCanvasFgW = 0;
var tamanhoCanvasBgH = 0;
var tamanhoCanvasBgW = 0;
var totalObjs = 0;
var totalCirculos = 0;
var maxObjs = 20;
var dirIniObjs = 90;
var velIniObjs = 5;
var linesToDraw = [];//increment with lists of initial and final pos.. such as [[5,3,8,2],[2,4,1,3]...] each [5,3,8,2] being a line to be drawn [initialX,initialY,finalXfinalY]...

function init ()
{
    canvas = document.getElementById("canvas");
    if (canvas.getContext){context = canvas.getContext("2d")};

    canvasBg = document.getElementById("canvasbg");
    if (canvas.getContext){contextBg = canvasBg.getContext("2d")};

    canvasHUD = document.getElementById("canvasHUD");
    if (canvas.getContext){contextHUD = canvasBg.getContext("2d")};


    // React to mouse events on the canvas, and mouseup on the entire document
    canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
    canvas.addEventListener('mousemove', canvasMouseMove, false);
    window.addEventListener('mouseup', sketchpad_mouseUp, false);
    canvas.addEventListener("mouseleave", canvasMouseAway, false);
    canvas.addEventListener("mouseenter", canvasMouseIn, false);

    // React to touch events on the canvas
    canvas.addEventListener('touchstart', canvasTouchStart, false);
    canvas.addEventListener('touchmove', canvasTouchMove, false);
    canvas.addEventListener("touchend",canvasTouchEnd, false);

    tamanhoCanvasHUDH = contextHUD.canvas.clientHeight;
    tamanhoCanvasHUDW = contextHUD.canvas.clientWidth;

    tamanhoCanvasFgH = context.canvas.clientHeight;
    tamanhoCanvasFgW = context.canvas.clientWidth;

    tamanhoCanvasBgH = contextBg.canvas.clientHeight;
    tamanhoCanvasBgW = contextBg.canvas.clientWidth;

    //seta bg...
    var imgbg = new Image();
    imgbg.onload = function(){
    //qualquer acao depois de carregar img 100%
        contextBg.drawImage(imgbg,0,0,tamanhoCanvasBgW,tamanhoCanvasBgH);
    };
    imgbg.src = 'src/loadables/poolTable.png';
    //seta bg fim
    
    ///////debug zone
    //var circ3 = objetoCirculo(15,"src/loadables/circulo.png");
    //var circ2 = objetoCirculo(150,"src/loadables/circulo2.png");
    //
    //circ3.x = 200;
    //circ3.y = 200;
    //circ2.x = 300;
    //circ2.y = 227;
    //circ2.txtLivre = 'verde';
    //circ3.txtLivre = 'preto';
    //
    //circ3.cx = circ3.x+circ3.r;
    //circ3.cy = circ3.y+circ3.r;
    //circ2.cx = circ2.x+circ2.r;
    //circ2.cy = circ2.y+circ2.r;
    //
    //circ3.velocidade = 00;
    //circ2.velocidade = 00;
    //circ2.peso = 0.05;
    //circ3.direcaoGraus = 0;
    //circ2.direcaoGraus = 180;
    //
    //circ3.carregaImg(context);
    //circ2.carregaImg(context);
    //
    //listaDeObjs.push(circ3);
    //listaDeCirculos.push(circ3);
    //listaDeObjs.push(circ2);
    //listaDeCirculos.push(circ2);
    //totalObjs = totalObjs+1;
    //totalCirculos = totalCirculos+1;
    ////////debug zone
    
    render();
}



function render()//executed every frame.
{
    
    
    context.clearRect(0,0,tamanhoCanvasFgW,tamanhoCanvasFgH) //devera limpar o quadro completo, neste caso o foreground.
    
    presentTime = Date.now() - firstRender;
    delta = Date.now() - lastRender;
    lastRender = Date.now();
    
    colisaoTelaResult = colisaoSimplesTela(listaDeObjs,tamanhoCanvasFgW,tamanhoCanvasFgH);
    objTocadoResult = tocouObj(listaDeObjs,dedo);
    resultColisaoCirculos = colisaoSimplesCirculo(listaDeObjs);
    
    if (objTocadoResult[0])//toque dos dedos
    {
    
        //alert('touch');
        //alert(objTocadoResult[1][1].direcaoGraus);
        //objTocadoResult[1][0].direcaoGraus = dirFinal;
        //objTocadoResult[1][0].velocidade = velFinal;
    }
    if (colisaoTelaResult[0])//colisao com tela.
    {
        for (k in colisaoTelaResult[1])
        {
            colisaoTelaResult[1][k].posInicialX = colisaoTelaResult[1][k].x
            colisaoTelaResult[1][k].posInicialY = colisaoTelaResult[1][k].y
            if (colisaoTelaResult[2][k] == 'xr' || colisaoTelaResult[2][k] == 'xl')
            {
                colisaoTelaResult[1][k].direcaoGraus = ((-colisaoTelaResult[1][k].direcaoGraus)+180);//-(colisaoTelaResult[1][k].direcaoGraus);//poderi ser +180 ou -180 ou valor+180mod360...
                //colisaoTelaResult[1][k].velocidade = colisaoTelaResult[1][k].velocidade - (colisaoTelaResult[1][k].velocidade/2)
            }
            if (colisaoTelaResult[2][k] == 'yu' || colisaoTelaResult[2][k] == 'yd')
            {
                colisaoTelaResult[1][k].direcaoGraus = (-colisaoTelaResult[1][k].direcaoGraus);//-(colisaoTelaResult[1][k].direcaoGraus);//poderi ser +180 ou -180 ou valor+180mod360...
            }
            //reseta posicao...
            if (colisaoTelaResult[2][k] == 'xr')
            {
                colisaoTelaResult[1][k].x = tamanhoCanvasFgW-colisaoTelaResult[1][k].w;
            }
            else if(colisaoTelaResult[2][k] == 'xl')
            {
                colisaoTelaResult[1][k].x = 0;
            }
            else if (colisaoTelaResult[2][k] == 'yu')
            {
                colisaoTelaResult[1][k].y = 0;
            }
            else if (colisaoTelaResult[2][k] == 'yd')
            {
                colisaoTelaResult[1][k].y = tamanhoCanvasFgH-colisaoTelaResult[1][k].h;
            }
            else
            {
                alert("DOOM! " + colisaoTelaResult[2][k]);
            }
        }
    }

    i=0;
    while(i<totalObjs)
    {
        listaDeObjs[i].move(delta)
        //if (imgsCarregadasRet){// && imgsCarregadasCirculo){
        if (imgsCarregadasCirculo)
        {
            context.drawImage(listaDeObjs[i].img,listaDeObjs[i].x,listaDeObjs[i].y,listaDeObjs[i].w,listaDeObjs[i].h);
        }
        i++;
    }
    drawLinesFromList(context,linesToDraw);
    requestAnimationFrame(render);
}

