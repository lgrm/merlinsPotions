window.onload = init;

function init() {

    const thumb = document.querySelectorAll('.thumbnails');
    const lghtImg = document.querySelector('.lightbox-img');
    const lght = document.getElementsByClassName('lightbox')[0];
    const btnCl = document.getElementsByClassName('btn-close')[0];
    const prod = document.getElementById('nameProd');
    const efect = document.getElementById('efectProd');
    const ingred = document.getElementById('ingr');
    const preco = document.getElementById('preco');
    const btnMenu = document.getElementById('menuSide');
    const nav = document.getElementById('navMenu');
    const bag = document.getElementById('number');
    let remove = document.getElementById('btnRemove');
    var total = parseInt(bag.textContent);

    for (let el of thumb) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            modal = el.firstChild;
            var indice = modal.getAttribute('data-title');
            let imagem = modal.getAttribute('href');
            lghtImg.setAttribute('src', imagem);
            lght.setAttribute('data-state', 'visible');

            loadPotion(indice);
            verifyBag();
        });
    }

    document.getElementById('btnAdd').addEventListener('click',function(){        
        total += 1;
        bag.textContent = total;
        verifyBag();
    });
    remove.addEventListener('click',function(){
        if(total > 0){
            total -= 1;
        bag.textContent = total;
        }
        verifyBag()
    });

    function loadPotion(indice) {
        const json = new XMLHttpRequest();
        json.open('GET', 'js/potions.json')

        json.onload = function () {
            let data = JSON.parse(this.response);
            for (let prop in data.potions) {
                if (prop == indice) {
                    prod.innerHTML = data.potions[prop].name;
                    efect.innerHTML = data.potions[prop].effect;
                    ingred.innerHTML = data.potions[prop].ingredients;
                    preco.innerHTML = data.potions[prop].price;
                }
            }
        }
        json.send();
    }

    function verifyBag(){
        if(bag.textContent <= 0){
            remove.style.display = 'none';
        }else{
            remove.style.display = 'inline';
        }
    }
    window.addEventListener('click',function(e){
        if(e.target == lght){
            lght.setAttribute('data-state', 'hidden');
        }
    })

    btnCl.onclick = () => lght.setAttribute('data-state', 'hidden');

    btnMenu.onclick = () => nav.classList.toggle('open');
}