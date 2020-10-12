//#####################################################CIRCULO!!!!!!!INICIO

var objetoCirculoMethod = {};
var imgsCarregadasCirculo = false;
objetoCirculoMethod.caminho = 'nada';
//alert(objetoRetMethod.caminho);
objetoCirculoMethod.carregaImg = function(context1,img)
{
    //img = new Image();
    this.img.onload = function(img){
    // qualquer acao depois de carregar img 100%
    //context1.drawImage(img,this.x,this.y,this.w,this.h);
    imgsCarregadasCirculo = true;
    };
    this.img.src = this.figura;
    //alert(this.figura);
};


objetoCirculoMethod.move = function(delta)//movimento de formiguinhas.
{
    //this.x =  this.x + ((this.velocidade*Math.cos(this.direcaoGraus*(Math.PI/180)))*(delta/1000));
    //this.y =  this.y + ((this.velocidade*Math.sin(-this.direcaoGraus*(Math.PI/180)))*(delta/1000));
    this.prevFrameX = this.x;
    this.prevFrameY = this.y;
    var vecX = this.velocidade*Math.cos(this.direcaoGraus*(Math.PI/180));
    var vecY = this.velocidade*Math.sin(this.direcaoGraus*(Math.PI/180));
    var gravVecX = grav.intencidade*Math.cos(grav.direcaoGraus*(Math.PI/180));
    var gravVecY = grav.intencidade*Math.sin(grav.direcaoGraus*(Math.PI/180));
    var frictionVecX = friction.intencidade*Math.cos(-this.direcaoGraus*(Math.PI/180));
    var frictionVecY = friction.intencidade*Math.sin(-this.direcaoGraus*(Math.PI/180));
    var resultVecX = vecX+gravVecX-frictionVecX;
    var resultVecY = vecY+gravVecY+frictionVecY;
    var resultDirecao = (Math.atan2(resultVecY,resultVecX))*(180/Math.PI);
    var resultVelocidade = (Math.sqrt((resultVecX*resultVecX) +(resultVecY*resultVecY)));
    this.velocidade = resultVelocidade;
    this.direcaoGraus = resultDirecao;

    this.x =  this.x + ((resultVelocidade*Math.cos(resultDirecao*(Math.PI/180)))*(delta/1000));
    this.y =  this.y + ((resultVelocidade*Math.sin(-resultDirecao*(Math.PI/180)))*(delta/1000));
    this.cx = this.x + this.r;
    this.cy = this.y + this.r;
};

var objetoCirculo = function (r,figura){

    var results = {};
    results.img = new Image();
    results.x = -50.0;
    results.y = -50.0;
    results.r = parseFloat(r);
    results.h = parseFloat(2*r);
    results.w = parseFloat(2*r);
    results.cx = parseFloat(results.x+r);
    results.cy = parseFloat(results.y+r);
    results.velocidade = 1.0;
    results.direcaoGraus = 0.0;
    results.posInicialX = -50.0;
    results.posInicialY = -50.0;
    results.peso = 1.00;
    results.figura = figura;//'file:///C:/Repositorios/TowerDefenseCanvasClassic/indv.png';
    results.carregaImg = objetoCirculoMethod.carregaImg;
    results.move = objetoCirculoMethod.move;
    results.txtLivre = '';

    results.prevFrameX = -50.0;
    results.prevFrameY = -50.0;

    return results;
};
//#####################################################CIRCULO!!!!!!!FIM









    function reflexaoCirculos (ob1,ob2)//pode ficar cada vez menos fiel o quao rapido estiver se movendo
    {
        
        let theta1 = (ob1.direcaoGraus)*(Math.PI/180);
        let theta2 = (ob2.direcaoGraus)*(Math.PI/180);
        let phi = Math.atan2(ob2.cy - ob1.cy, ob1.cx - ob2.cx);//observe que tem que ser ao contrario  no x...??? 2 dias pra descobrir isso...
        let m1 = ob1.peso;
        let m2 = ob2.peso;
        let v1 = ob1.velocidade;
        let v2 = ob2.velocidade;
        
        let dx1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
        let dy1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
        let dx2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
        let dy2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);
        
        
        ob1.direcaoGraus =  (Math.atan2(dy1F, dx1F)*(180/Math.PI));
        ob1.velocidade = (Math.sqrt((dx1F*dx1F) +(dy1F*dy1F)));
        ob2.direcaoGraus =  (Math.atan2(dy2F, dx2F)*(180/Math.PI));
        ob2.velocidade = (Math.sqrt((dx2F*dx2F) +(dy2F*dy2F)));

        staticCollision(ob1, ob2)

        
    }


    function staticCollision(ob1, ob2, emergency=false)
    {
        
        let overlap = ob1.r + ob2.r - Math.sqrt(((ob1.cx-ob2.cx)**2)+((ob1.cy-ob2.cy)**2)) ;
        let smallerObject = ob1.r < ob2.r ? ob1 : ob2;
        let biggerObject = ob1.r >= ob2.r ? ob1 : ob2;
    
        // When things go normally, this line does not execute.
        // "Emergency" is when staticCollision has run, but the collision
        // still hasn't been resolved. Which implies that one of the objects
        // is likely being jammed against a corner, so we must now move the OTHER one instead.
        // in other words: this line basically swaps the "little guy" role, because
        // the actual little guy can't be moved away due to being blocked by the wall.
        if (emergency) [smallerObject, biggerObject] = [biggerObject, smallerObject]
        
        let theta = Math.atan2((biggerObject.cy - smallerObject.cy), (biggerObject.cx - smallerObject.cx));
        smallerObject.cx -= overlap * Math.cos(theta);
        smallerObject.cy -= overlap * Math.sin(theta);
        smallerObject.x = smallerObject.cx - smallerObject.r;
        smallerObject.y = smallerObject.cy - smallerObject.r;
    
    
        if (Math.sqrt(((ob1.cx-ob2.cx)**2)+((ob1.cy-ob2.cy)**2)) < ob1.r + ob2.r) 
        {
            // we don't want to be stuck in an infinite emergency.
            // so if we have already run one emergency round; just ignore the problem.
            if (!emergency) staticCollision(ob1, ob2, true)
        }
        
    }


    function colisaoSimplesCirculo(listaObjs)
    {

        var listaColisoes = [];
        var novaDirecao = [];
        var conf = false;
        var listaPula = [];
        for (i in listaObjs)
        {
            for (j in listaObjs)
            {
                if(i==j){continue;}
                if(contains.call(listaPula,''+j+''+i)){continue;}

                var tam1 = parseFloat((listaObjs[j].cx-listaObjs[i].cx)*(listaObjs[j].cx-listaObjs[i].cx) + (listaObjs[j].cy-listaObjs[i].cy)*(listaObjs[j].cy-listaObjs[i].cy));
                var dist1 = parseFloat((listaObjs[j].r+listaObjs[i].r)*(listaObjs[j].r+listaObjs[i].r));

                if ( tam1 <= dist1 )
                {
                    //alert(tam1+" "+dist1);
                    //alert(Math.sqrt(tam1)+" "+Math.sqrt(dist1));
                    listaColisoes.push([listaObjs[i],listaObjs[j]]);
                    //novas direcoes
                    reflexaoCirculos(listaObjs[i],listaObjs[j]);
                    
                    listaPula.push(''+i+''+j);
                    conf = true;
                    //alert("alabama 4"+res);
                }
            }
        }
        return [conf,listaColisoes]
    }


    // Draw something and prevent the default scrolling when touch movement is detected
    
