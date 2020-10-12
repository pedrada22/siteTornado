//Inicio objeto retangular..
var imgsCarregadasRet = false;
var objetoRetMethod = {};
objetoRetMethod.caminho = 'nada';
//alert(objetoRetMethod.caminho);
objetoRetMethod.carregaImg = function(context1,img)
{
//img = new Image();
    this.img.onload = function(img){
    // qualquer acao depois de carregar img 100%
    //context1.drawImage(img,this.x,this.y,this.w,this.h);
    imgsCarregadasRet = true;
    };
    this.img.src = this.figura;
    //alert(this.figura);
};

var max = -1;
objetoRetMethod.move = function(delta)//movimento de formiguinhas.
{
    //fazendo gravidade para ver como fica...INICIO

    var vecX = this.velocidade*Math.cos(this.direcaoGraus*(Math.PI/180));
    var vecY = this.velocidade*Math.sin(this.direcaoGraus*(Math.PI/180));
    var gravVecX = grav.intencidade*Math.cos(grav.direcaoGraus*(Math.PI/180));
    var gravVecY = grav.intencidade*Math.sin(grav.direcaoGraus*(Math.PI/180));
    var resultVecX = vecX+gravVecX;
    var resultVecY = vecY+gravVecY;
    var resultDirecao = (Math.atan2(resultVecY,resultVecX))*(180/Math.PI);
    var resultVelocidade = (Math.sqrt((resultVecX*resultVecX) +(resultVecY*resultVecY)));
    this.velocidade = resultVelocidade;
    this.direcaoGraus = resultDirecao;
    if (max > 0)
    {
      console.log("velocidade: "+this.velocidade);
      console.log("direcaoGraus: "+this.direcaoGraus);
      console.log("intencidade: "+grav.intencidade);
      console.log("GRAV direcaoGraus: "+grav.direcaoGraus);
      console.log("vecY: "+vecY);
      console.log("gravVecX: "+gravVecX);
      console.log("gravVecY: "+gravVecY);
      console.log("resultVecX: "+resultVecX);
      console.log("resultVecY: "+resultVecY);
      console.log("resultDirecao: "+resultDirecao);
      console.log("resultVelocidade: "+resultVelocidade);
      console.log("nda");
      max = max -1;
    }

    this.x =  this.x + ((resultVelocidade*Math.cos(resultDirecao*(Math.PI/180)))*(delta/1000));
    this.y =  this.y + ((resultVelocidade*Math.sin(-resultDirecao*(Math.PI/180)))*(delta/1000));
    this.cx = this.x + this.w/2;
    this.cy = this.y + this.h/2;

    //fazendo gravidade para ver como fica...Fim

    //TODO Travar velocidades abaixo de 0.67 para 0

    //this.x =  this.x + ((resultVelocidade*Math.cos(-resultDirecao*(Math.PI/180)))*(delta/1000));
    //this.y =  this.y + ((resultVelocidade*Math.sin(resultDirecao*(Math.PI/180)))*(delta/1000));
};

var objetoRet = function (w,h,figura){

    var results = {};
    results.img = new Image();
    results.x = -50;
    results.y = -50;
    results.w = w;
    results.h = h;
    results.cx = -50//this.x+(w/2);
    results.cy = -50//this.y+(h/2);
    results.velocidade = 1.0;
    results.direcaoGraus = 0.0;
    results.posInicialX = -50;
    results.posInicialY = -50;
    results.peso = 0.001;
    results.figura = figura;//'file:///C:/Repositorios/TowerDefenseCanvasClassic/indv.png';
    results.carregaImg = objetoRetMethod.carregaImg;
    results.move = objetoRetMethod.move;
    results.txtLivre = '';
    return results;


//Fim objeto retangular..

};



function colisaoSimplesRetangulo(listaObjs)
{
    offset=0//serve para prover um gap
    var listaColisoes = [];
    var conf = false;//se nao houver colisoes sera = false
    var listaPula = [];
    for (i in listaObjs)
    {
        for (j in listaObjs)
        {
            if(i==j){continue}
            if(contains.call(listaPula,''+j+''+i)){continue;}//colisao triangulo
            if (listaObjs[i].x < listaObjs[j].x + listaObjs[j].w)
            {
                if (listaObjs[i].x + listaObjs[i].w > listaObjs[j].x)
                {
                    if (listaObjs[i].y < listaObjs[j].y + listaObjs[j].h)
                    {
                        if (listaObjs[i].h + listaObjs[i].y > listaObjs[j].y)
                        {
                            listaColisoes.push([listaObjs[i],listaObjs[j]]);
                            conf = true;
                            listaPula.push(''+i+''+j);

                        }
                    }
                }
            }
        }
    }
    return [conf,listaColisoes]
}
