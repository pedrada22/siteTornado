
//objeto forca para gravidade e afins. INICIO/////////////////
var objetoForca = function (direcao,intencidade){

    var results = {};
    results.direcaoGraus = direcao;
    results.intencidade = intencidade;
    return results;
};
var grav = objetoForca(270,0);
var friction = objetoForca(270,1.7);
//objeto forca para gravidade e afins. FIM////////////////////

function resetPoolTable()
{
    listaDeObjs = [];
    totalObjs = 0;
}

