// Extrae el año, mes y día de la fecha actual y lo transforma en string
const ANIOHOY =new Date().getFullYear().toString();
// Suma 1 al mes para tener el número de mes de 1 a 12
const MESHOY = new Date().getMonth()+1;
const MESSHOY = MESHOY.toString();
const DIAHOY = new Date().getDate().toString();

// Fecha actual para cálculo
const FECHAHOY1 = new Date(ANIOHOY+"-"+MESSHOY+"-"+DIAHOY).getTime();
console.log(FECHAHOY1);

// Valor de la tasa diaria para cada tipo de plazo fijo
const TIPOSPF = [
    {id: 1, nombre:"REGULADO POR EL BCRA", valortasa: 133},
    {id: 2, nombre:"TRADICIONAL CLIENTES EN $", valortasa: 126},
    {id: 3, nombre:"TRADICIONAL CLIENTES EN u$$", valortasa: 0.10}
]

// Función que calcula los días de plazo desde la Fecha actual Hasta la Fecha de vencimiento ingresada por el usuario 

const diasPlazo = (fV,fH) => parseInt((fV - fH)/(1000*60*60*24));
 
//Función que calcula los intereses con los días de plazo y la tasa
const intereses = (dias,tasa) => dias * (tasa/100)/365;

//Clase con constructor para los datos solicitados en pantalla
class datosSimuladorPF {
    constructor (importe,dd,mm,aa,tasa){
        this.importe = importe;
        this.dd = dd;
        this.mm = mm;
        this.aa = aa;
        this.tasa = tasa
     }
    //Función para determinar la fecha para cálculo 
    fechaVencimientoCalculo () { 
         return new Date(this.aa+"-"+this.mm+"-"+this.dd).getTime();
    };
}

let container = document.createElement("div");
document.body.append(container);
container.classList.add("container");

let containerHeader = document.createElement("div");
containerHeader.classList.add("header");
containerHeader.innerHTML = "<h1>Simulador plazo fijo</h1>";
container.append(containerHeader);

let containerMain = document.createElement("div")
containerMain.classList.add("main");
containerMain.innerHTML = "<h3>Tipo de plazo fijo</h3>";
container.append(containerMain);

let tipospf = [{ item: 1, nombre: "$-Regulado por BCRA" },
{ item: 2, nombre: "$-Tradicional clientes" },
{ item: 3, nombre: "U$$-Tradicional clientes" }];

let menuplazofijo = document.createElement("select");
menuplazofijo.classList.add("menu");
menuplazofijo.setAttribute('id',"pfselect");
for (const tipopf of tipospf) {
     menuplazofijo.innerHTML += `<option value=${tipopf.item}> ${tipopf.nombre}</option>`
};
containerMain.append(menuplazofijo);

containerMain.innerHTML += "<h3>Importe</h3>";
//Importe
let importeplazofijo = document.createElement("input");
importeplazofijo.classList.add("importe")
importeplazofijo.setAttribute('type',"text");
importeplazofijo.setAttribute('value',"");
importeplazofijo.setAttribute('id',"importePF");
importeplazofijo.setAttribute('style',"importe"); 
containerMain.append(importeplazofijo);

containerMain.innerHTML += "<h3>Fecha Vencimiento</h3>";
// Día
let fechaDia = document.createElement("input");
fechaDia.classList.add("fecha");
fechaDia.setAttribute('type',"text");
fechaDia.setAttribute('value',"");
fechaDia.setAttribute('id',"dia");
fechaDia.setAttribute('placeholder',"dd");
fechaDia.setAttribute('style',"fecha");
containerMain.append(fechaDia);
//Mes
let fechaMes = document.createElement("input");
fechaMes.classList.add("fecha");
fechaMes.setAttribute('type',"text");
fechaMes.setAttribute('value',"");
fechaMes.setAttribute('id',"mes");
fechaMes.setAttribute('placeholder',"mm");
fechaMes.setAttribute('style',"fecha");
containerMain.append(fechaMes);
//Año
let fechaAnio = document.createElement("input");
fechaAnio.classList.add("fecha");
fechaAnio.setAttribute('type',"text");
fechaAnio.setAttribute('value',"");
fechaAnio.setAttribute('id',"anio");
fechaAnio.setAttribute('placeholder',"aaaa");
fechaAnio.setAttribute('style',"fecha");
containerMain.append(fechaAnio);

let botonSimular = document.createElement("button");
botonSimular.classList.add("boton");
botonSimular.innerHTML = "Simular";
botonSimular.setAttribute('type',"button");
botonSimular.setAttribute('id',"simular");
botonSimular.setAttribute('style',"boton");
containerMain.append(botonSimular);


// Extrae la tasa a partir de la opción de plazo fijo elegida en el select
let tasa,nombre;
function extraerTasa () {
    for ( const TIPOPF of TIPOSPF ){
        if (TIPOPF.id == opcionElegida.value){
            tasa = TIPOPF.valortasa;
            nombre = TIPOPF.nombre;
            console.log(tasa);        
            break;
        }
    }    
};
const opcionElegida = document.querySelector("#pfselect");
opcionElegida.addEventListener("click",extraerTasa);

function verificarImporte () {
    if ( isNaN(importeIngresado.value) || importeIngresado.value <= "0" ){
        importeIngresado.value = ""; 
    }
    console.log(importeIngresado.value);
    // Guarda el importe en localStorage 
    if (importeIngresado.value !== ""){
        localStorage.setItem('importe',importeIngresado.value);
    }
}
// Recupera el valor de los input guardadados en localStorage(No entendí como pasar los últimos valores guardados a los imput)
 let impLS,diaLS,mesLS,anioLS;
 for (let i = 0; i < localStorage.length; i++) {
     if ( i ===  localStorage.length-1 ) {
         let clave = localStorage.key(i)
         impLS = localStorage.getItem(clave);
         diaLS = localStorage.getItem(clave);
         mesLS = localStorage.getItem(clave);
         anioLS = localStorage.getItem(clave);
     }
}
let importeIngresado = document.querySelector("#importePF");
importeIngresado.addEventListener("change",verificarImporte);

function verificarDia(){
    if ( isNaN(dia.value) || dia.value <= "0" || dia.value >= "32" || (dia.length > 2) ){
        dia.value = ""; 
    } 
    console.log(dia.value); 
    // Guarda el día en localStorage 
    if (dia.value !== ""){
        localStorage.setItem('dia',dia.value);
    }
}
let dia = document.querySelector("#dia");
dia.addEventListener("change",verificarDia);

function verificarMes(){
    if ( isNaN(mes.value) || mes.value <= "0" || mes.value >= "13" || (mes.length > 2) ){
        mes.value = ""; 
    } 
    console.log(mes.value);
    // Guarda el mes en localStorage 
        if (mes.value !== ""){
        localStorage.setItem('mes',mes.value);
    }
}
let mes = document.querySelector("#mes");
mes.addEventListener("change",verificarMes);

function verificarAnio(){
    if ( isNaN(anio.value) || anio.value <= "0" || (anio.length > 4) || anio.value < ANIOHOY ){
        anio.value = ""; 
        } 
    console.log(anio.value);
    // Guarda el año en localStorage 
    if (anio.value !== ""){
        localStorage.setItem('anio',anio.value);
    }
}
let anio = document.querySelector("#anio");
anio.addEventListener("change",verificarAnio);

const datosSimuladorPF1 = new datosSimuladorPF(importeIngresado,dia,mes,anio,tasa);

let interesPorTipoPF;
function calcularIntereses (){
    console.log(dia.value);
    console.log(mes.value);
    console.log(anio.value);
    console.log(importeIngresado.value);
    interesPorTipoPF = ((intereses(diasPlazo( datosSimuladorPF1.fechaVencimientoCalculo(),FECHAHOY1),tasa) * parseFloat(importeIngresado))).toFixed(2);
    console.log(`Días de plazo: ${diasPlazo( datosSimuladorPF1.fechaVencimientoCalculo(),FECHAHOY1)}. Intereses: ${interesPorTipoPF}`)
}                            
const simular = document.querySelector("#simular");
simular.addEventListener("click",calcularIntereses);




