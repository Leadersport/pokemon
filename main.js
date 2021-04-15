import { pokemon } from './pokemon.js';

console.log(pokemon)

function $getEl(id){
    return document.getElementById(id);
}

const $btn = $getEl('btn-kick');

const $logs = document.querySelector('#logs');

const $buttonsArr = document.querySelectorAll('button.button');

const charakter = {
    name: 'Pikachu',
    defaultHp: 100,
    damageHp: 100,
    elHp: $getEl('health-character'),
    elProgress: $getEl('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPlife: renderHPlife,
    renderProgressBarHp: renderProgressBarHp,
}

const enemy = {
    name: 'Charmander',
    defaultHp: 100,
    damageHp: 100,
    elHp: $getEl('health-enemy'),
    elProgress: $getEl('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPlife: renderHPlife,
    renderProgressBarHp: renderProgressBarHp,
}

for(let i = 0; i < $buttonsArr.length; i++){
    $buttonsArr[i].addEventListener('click', function(){
        console.log('Kick');
        charakter.changeHP(random(10*i));
        enemy.changeHP(random(10*1));
    })
    let foo = countBtnClick($buttonsArr[i]);
    foo(6);
}

function countBtnClick(button){
    let count = 0;
    let $limit = button.children[0];
    return function(limit){
        $limit.innerText = '('+limit+')';
        button.addEventListener('click', function(){

            if(limit-1 === 0){
                button.disabled = true;
                alert('Stop Click' + button.id);
                $limit.innerText = 0;
            }else{
                limit--;
                count++;
                $limit.innerText = limit;
            }
        })
    }
}



function init(){
    console.log('Start game');
    charakter.renderHP();
    enemy.renderHP();
}

function renderHP(){
    this.renderHPlife();
    this.renderProgressBarHp();
}

function renderHPlife(){
    this.elHp.innerText = this.defaultHp + ' / ' + this.damageHp;
}

function renderProgressBarHp(){
    this.elProgress.style.width = this.damageHp*100/this.defaultHp + '%';
}

function changeHP(count){
    this.damageHp -= count;

    const log = this === enemy ? generateLog(this, charakter) : generateLog(this, enemy);

    renderLog(log);

    if (this.damageHp <= count){
        this.damageHp = 0;
        alert(this.name + ' Lose!');
        $btn.disabled = true;
    }

    this.renderHP();
}

function random(num){
    return Math.ceil(Math.random() * num)
}

function generateLog(firstPerson, secondPerson){
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. ${firstPerson.damageHp-firstPerson.defaultHp}, [${firstPerson.damageHp}/${firstPerson.defaultHp}]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. ${firstPerson.damageHp-firstPerson.defaultHp}, [${firstPerson.damageHp}/${firstPerson.defaultHp}]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. ${firstPerson.damageHp-firstPerson.defaultHp}, [${firstPerson.damageHp}/${firstPerson.defaultHp}]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. ${firstPerson.damageHp-firstPerson.defaultHp}, [${firstPerson.damageHp}/${firstPerson.defaultHp}]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. ${firstPerson.damageHp-firstPerson.defaultHp}, [${firstPerson.damageHp}/${firstPerson.defaultHp}]`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. ${firstPerson.damageHp-firstPerson.defaultHp}, [${firstPerson.damageHp}/${firstPerson.defaultHp}]`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. ${firstPerson.damageHp-firstPerson.defaultHp}, [${firstPerson.damageHp}/${firstPerson.defaultHp}]`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника ${firstPerson.damageHp-firstPerson.defaultHp}, [${firstPerson.damageHp}/${firstPerson.defaultHp}]`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. ${firstPerson.damageHp-firstPerson.defaultHp}, [${firstPerson.damageHp}/${firstPerson.defaultHp}]`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. ${firstPerson.damageHp-firstPerson.defaultHp}, [${firstPerson.damageHp}/${firstPerson.defaultHp}]`
    ];

    return logs[random(logs.length) - 1];
}

function renderLog(text){
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
}




init();