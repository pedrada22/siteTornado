//////algorithmo de achar objs em listas INICIO
var contains = function(needle) {
// Per spec, the way to identify NaN is that it is not equal to itself
var findNaN = needle !== needle;
var indexOf;

if(!findNaN && typeof Array.prototype.indexOf === 'function') {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function(needle) {
        var i = -1, index = -1;

        for(i = 0; i < this.length; i++) {
            var item = this[i];

            if((findNaN && item !== item) || item === needle) {
                index = i;
                break;
            }
        }

        return index;
    };
}

return indexOf.call(this, needle) > -1;
};//http://stackoverflow.com/questions/7378228/check-if-an-element-is-present-in-an-array    - resposta no meio
//////algorithmo de achar objs em listas FIM

function drawLinesFromList(aContext,listOfLines)// draw html canvas lines.
//arg aContext  - is the canvas context
//arg listOfLines is a list of lines in the format [[initX,initY,finalX,finalY],[line2],..]
//is used to draw/render all the lines that are on the list on each frame... as seen in render.js
{
    for (i of listOfLines)
    {
        aContext.beginPath();
        aContext.moveTo(i[0], i[1], 0);
        aContext.lineTo(i[2], i[3]);
        aContext.stroke();
    }
     
}

function colisaoSimplesTela(listaObjs,telaW,telaH)
{
    offset=0//serve para prover um gap
    var listaColisoes = [];
    var listaEixo = [];
    var conf = false;
    //var listaPula = [];
    for (i in listaObjs)
    {
        //if(i==j){continue}
        //if(contains.call(listaPula,''+i)){continue;}//colisao triangulo
        if (listaObjs[i].x + listaObjs[i].w > telaW)
        {
            listaColisoes.push(listaObjs[i]);
            listaEixo.push('xr');
            conf = true;
            continue;
        }
        if (listaObjs[i].x < 0)
        {
            listaColisoes.push(listaObjs[i]);
            listaEixo.push('xl');
            conf = true;
            continue;
        }
        if (listaObjs[i].y + listaObjs[i].h > telaH)
        {
            listaColisoes.push(listaObjs[i]);
            listaEixo.push('yd');
            conf = true;
            continue;
        }
        if (listaObjs[i].y < 0)
        {
            listaColisoes.push(listaObjs[i]);
            listaEixo.push('yu');
            conf = true;
            continue;
        }//listaPula.push(''+i);
    }
    return [conf,listaColisoes,listaEixo]
}


function arredondaInt(somenum){
    //aseguir tecnica rapida com bitwise para transformar em num int
    // With a bitwise or.
    rounded = (0.5 + somenum) | 0;
    // A double bitwise not.
    rounded = ~~ (0.5 + somenum);
    // Finally, a left bitwise shift.
    rounded = (0.5 + somenum) << 0;
    return rounded;
    //acima tecnica rapida com bitwise para transformar em num int
}
