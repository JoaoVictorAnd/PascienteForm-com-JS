function handlerInput(masks, max, event) {
    var c = event.target;
    var v = c.value.replace(/\D/g, '');
    var m = c.value.length > max ? 1 : 0;
    VMasker(c).unMask();
    VMasker(c).maskPattern(masks[m]);
    c.value = VMasker.toPattern(v, masks[m]);
}

//R.G.
var rgMask = ['99.999.999-9', '99.999.999-99'];
var rg = document.getElementById('rg');
VMasker(rg).maskPattern(rgMask[0]);
rg.addEventListener('input', handlerInput.bind(undefined, rgMask, 9), false);

//CNS
var cnsMask = ['999999999999', '999999999999'];
var cns = document.getElementById('cns');
VMasker(cns).maskPattern(cnsMask[0]);
cns.addEventListener('input', handlerInput.bind(undefined, cnsMask, 12), false);

// telefone
var telefoneMask = ['+99 (99) 9999-99999', '+99 (99) 99999-9999'];
var telefone = document.querySelector('input[attrname=fone]');
VMasker(telefone).maskPattern(telefoneMask[0]);
telefone.addEventListener('input', handlerInput.bind(undefined, telefoneMask, 17), false);

//cep
function limpaCep() {
    document.getElementById('endereco').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}

function meu_callback(cont){
    if(!("erro" in cont)) {
        document.getElementById('endereco').value=(cont.logradouro);
        document.getElementById('bairro').value=(cont.bairro);
        document.getElementById('cidade').value=(cont.localidade);
        document.getElementById('uf').value=(cont.uf);
    } else{
        limpaCep();
        alert("CEP INCORRETO OU NÃO ENCONTRADO !!!");
    }
}

function procuraCep(val){
    var cep = val.replace(/\D/g, '');
    if(cep != ""){
        var validarCep = /^[0-9]{8}$/;
        if(validarCep.test(cep)){
           document.getElementById('cep').value = cep.substring(0,5)
           +"-"
           +cep.substring(5);
           document.getElementById('endereco').value="...";
           document.getElementById('bairro').value="...";
           document.getElementById('cidade').value="...";
           document.getElementById('uf').value="...";

           var script = document.createElement('script');
           script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
           document.body.appendChild(script);

        } else{
            limpaCep();
            alert("FORMATO DE CEP INVÁLIDO !!!");
        }
    } else{
        limpaCep();
    }
};

window.onload = function() {
    var numeroInput = document.getElementById('numero');
    numeroInput.addEventListener('input', function() {
        if (this.value.length > this.maxLength) {
            this.value = this.value.slice(0, this.maxLength);
        }
    });
}

//email
const form = document.querySelector('form');
const botaoEnviar = document.getElementById('submit');

const validarEmail = (email) => {
    var validar = /\S+@\S+\S+.\S+/;
    return validar.test(email);
}

botaoEnviar.addEventListener('click', function(event) {
    var email = document.getElementById('email').value;
    var r = validarEmail(email);
    if(r){
        form.reset();
    } else{
        alert("EMAIL INVÁLIDO !!!");
    }
    event.preventDefault(); 
});