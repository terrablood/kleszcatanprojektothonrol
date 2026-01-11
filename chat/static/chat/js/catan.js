
// ez itt a map generálás -->> ezek müködnek
function keveres(l){ // Fisher-Yates-Knuth shuffle
    let i=l.length;
    while(i!=0){
        let j=Math.floor(Math.random()*i);
        i--;
        [l[i], l[j]] = [l[j], l[i]];
    }
    return l;
}
function biomok(){ 
    let a = [];
    // mező 192 -> 1
    // erdő 192 -> 2
    // hegység 128 -> 3
    // mocsár 64 -> 4
    
    for (let i = 0; i < 192; i++) {
        a.push(0);
        // a[i].classList.add('mező');
    }
    for (let i = 0; i < 192; i++) {
        a.push(1);
        // a[i].classList.add('erdő');

    }
    for (let i = 0; i < 128; i++) {
        a.push(2);
        // a[i].classList.add('hegység');

    }
    for (let i = 0; i < 64; i++) {
        a.push(3);
        // a[i].classList.add('mocsár');

    }
    return a;
    
}
function lelohelyek(){
    let a = [];
    for (let i = 0; i < 68; i++) {
        a.push(1);
    }
    for (let i = 0; i < 508; i++) {
        a.push(0);
    }

    return a;
}
function kockaszam(){
    let a = [];
    for (let i = 1; i < 7; i++) {
        for (let j = 0; j < 96; j++) {
        a.push(i);
        }
    }
    return a;
}
function claim(){
    let a = [];
    for (let i = 0; i < (24*24); i++) {
        a.push(0);
    }
    return a;
}
function foglalt(){
    let a = [];
    for (let i = 0; i < (24*24); i++) {
        a.push(0);
    }
    return a;
}
function matrixhajtogatas(biom, lelohely, kockaszam, claim, foglalt)
{
    let index = 0;
    let map = [];
    for (let i = 0; i < 24; i++) {
        let line = [];
        for (let j = 0; j < 24; j++) {
            let cell = [];
            console.log(biom);
            cell.push(biom[index]);
            cell.push(lelohely[index]);
            cell.push(kockaszam[index]);
            cell.push(claim[index]);
            cell.push(foglalt[index]);
            index++;
            line.push(cell);
        }
        map.push(line);
    }
    return map;
}
function divek_letrehozasa(x,y){
    let container = document.querySelector(".container");
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            let div = document.createElement("div");
            div.id = `${i}_${j}`;
            div.onclick = fovaros;//ut,falu,varos,fovaros,ellenorzo_balkatt,expedicio
            container.appendChild(div);
        }
    }
}
function divek_szinezese(map){

    for (let y = 0; y < 24; y++) {
        for (let x = 0; x < 24; x++) {

            let div = document.getElementById(`${x}_${y}`);
            let biom = map[y][x][0];

            if (biom === 0) div.classList.add('mezo');
            if (biom === 1) div.classList.add('erdo');
            if (biom === 2) div.classList.add('hegyseg');
            if (biom === 3) div.classList.add('mocsar');
        }
    }
}
function randommapgen(){
    // a map 24*24 azaz 576 mező
    let a = biomok();
    let biomokk = keveres(a);// ez dönti el hogy melyik biomból menyi van és hol
    let b = lelohelyek();
    let lelohelyee = keveres(b);// ez mutatja, hogy lelőhely-e
    let c = kockaszam();
    let kockaszamm = keveres(c);// ez tárolja,, hogy melyik koordinátának mi a száma
    let d = claim();
    let claimm = keveres(d);// megmutatja, hogy claimelve vvan e és ki által
    let e = foglalt();
    let foglaltt = keveres(e);// megmutatja hogy foglalt-e a terület
    let f = matrixhajtogatas(biomokk,lelohelyee,kockaszamm,claimm,foglaltt)
    return f;
}
// claim elemek -->> mind müködik
function claimlist()
{
    let claims = [];
    return claims;
}
function claimadd(claimlista,x,y,map)
{
    let chunk = [x,y];
    claimlista.push(chunk);
    map[y][x][3] = 1
}
function claimkiírás(claimlista)
{
    if(claimlista.length > 0)
    {
        console.log("vannak claimjeid");
        for (const elem of claimlista) {
            console.log(elem[0],elem[1]);
            
        }
    }
    else 
    {
        console.log("nincsenek climjeid");
    }
}
// ezek csak segédek -->> ezek müködnek
function melyikez(div){ // megszerzi egy div koordinátáit (pozícióját a mapon)
    console.log(div.id)
    let [sx,sy] = div.id.split("_"); // x és y
    
    return [parseInt(sx), parseInt(sy)];
}
function ezadiv(x,y){ // koordináta (pozíció) alapján megkeres egy divet
    return document.getElementById(`${x} ${y}`);
}
function ellenorzo_balkatt(e){
    let vizsgalt = e.target; 
    let [y, x] = melyikez(vizsgalt)
    console.log(x); 
    console.log(y);
}
// ez  a nyersanyag osztás rész -->> müködnek
function kockadobas()
{
    let dobasszam = Math.floor(Math.random() * 6) + 1;
    return dobasszam;
}
function dobaskereses(claimlist,map,dobas)
{
    let lehetsegesek = [];
    for (let y = 0; y < 23; y++) {
        for (let x = 0; x < 23; x++) {
            if(map[y][x][2] == dobas)
            {
                let koordinatak = [y,x];
                koordinatak.push(map[y][x][0]);
                lehetsegesek.push(koordinatak);
            }
        }
    }
    let dobottak = [];
    for (let k = 0; k < claimlist.length; k++) {
        for (let l = 0; l < lehetsegesek.length; l++) {
            if(claimlist[k][0] == lehetsegesek[l][0] && claimlist[k][1] == lehetsegesek[l][1])
            {
                console.log(claimlist[k][0],claimlist[k][1]);
                let kello = claimlist[k];
                kello.push(lehetsegesek[l][2]);
                dobottak.push(kello);
            }
        }
    }
    if(dobottak.length == 0)
    {
        alert("nincsenek claimjeid ezért nem kapsz semmit");
    }
    return dobottak;
}
function melyik_nyersanyag_add(biom_,resourcelista)
{
    
    if(biom_ == 0)//mező
    {
        resourcelista[0]++;
    }
    if(biom_ == 1)//erdő
    {
        resourcelista[1]++;
    }
    if(biom_ == 2)//hegység
    {
        resourcelista[2]++;
    }
    if(biom_ == 3)//mocsár
    {
        resourcelista[3]++;
    }
    
}
function lelohelye(x,y,map)
{
    let v = 0
    if(map[y][x][1] == 1)
    {
        v = 1;
        console.log("teli találat");
    }
    return v;
}
function resourcelist()
{
    let resourcelista = [0,0,0,0,0,0]
    return resourcelista;
}
function nyersanyagosztas(dobott)
{
    let alap = dobaskereses(claimlista,map,dobott);
    for (const elem of alap) 
    {
        melyik_nyersanyag_add(elem[2],nyersanyaglista);
        console.log(elem[2]);
    }
    console.log("széna:",nyersanyaglista[0]);
    console.log("fa:",nyersanyaglista[1]);
    console.log("kö:",nyersanyaglista[2]);
    console.log("szövet:",nyersanyaglista[3]);
    let ores = (banyaim*2);
    nyersanyaglista[4] += ores;
    console.log("fém",nyersanyaglista[4]);
}
// ez a struktúra lehelyezése -->> készek
function ut(e)
{
    if(utaim >= 45)
    {
        alert("túl sok út");
    }
    else if(nyersanyaglista[1] >= 4)//4fa
    {
        let vizsgalt = e.target; 
        let [y, x] = melyikez(vizsgalt)
        console.log(x); 
        console.log(y);
        let szab = foglalte(x,y);
        if(szab == 0)
        {
           let s = kapcsolodike(x,y);
            if(s == 1)
            {
                claimadd(claimlista,x,y,map)
                map[y][x][4] = 1;
                e.target.innerHTML='U';
                nyersanyaglista[1] -= 1;
                utaim++;
            }
            else
            {
                alert("nincs a közelben territórium amihez kapcsolódhatna");
            }
        }
        else
        {
            alert("ez már foglalt");
        }
    }
    else
    {
        alert("nincs elég nyersanyagod az építkezéshez")
        console.log("széna:",nyersanyaglista[0]);
        console.log("fa:",nyersanyaglista[1]);
        console.log("kö:",nyersanyaglista[2]);
        console.log("rost:",nyersanyaglista[3]);
        console.log("fém",nyersanyaglista[4]);
    }
    
}
function falu(e)
{
    if(falvak <=6)
    {
        if(nyersanyaglista[1] >= 15,nyersanyaglista[2] >= 10,nyersanyaglista[0] >=20,nyersanyaglista[3] >= 10)//15fa 10kő 20széna 10szövet
        {
            let vizsgalt = e.target; 
            let [y, x] = melyikez(vizsgalt)
            let szab = foglalte(x,y);
            console.log(x); 
            console.log(y);
            if(x==0||x==23||y==0||y==23)
            {
                console.log("nincs elég hely a territórumnak szóval nem tehetsz id semmit! bocs");
                alert("nincs elég hely a territórumnak szóval nem tehetsz id semmit! bocs");
            }
            else if(szab != 0)
            {
                alert("ez már foglalt");
            }
            else
            {
                let s = kapcsolodike(x,y);
                if(s == 1)
                {
                    claimadd(claimlista,x-1,y-1,map)//1
                    claimadd(claimlista,x,y-1,map)//2
                    claimadd(claimlista,x+1,y-1,map)//3
                    claimadd(claimlista,x-1,y,map)//4
                    claimadd(claimlista,x,y,map)//5
                    claimadd(claimlista,x+1,y,map)//6
                    claimadd(claimlista,x-1,y+1,map)//7
                    claimadd(claimlista,x,y+1,map)//8
                    claimadd(claimlista,x+1,y+1,map)//9
                    map[y][x][4] = 1;
                    e.target.innerHTML='F';
                    nyersanyaglista[5] += 5;
                    nyersanyaglista[1] -= 15;
                    nyersanyaglista[2] -= 10;
                    nyersanyaglista[0] -= 20;
                    nyersanyaglista[3] -= 10;
                    falvak ++;
                    if(nyersanyaglista[5] >= 100)
                    {
                        onclickswitch(semmi);
                    }
                }
                else
                {
                    alert("nincs a közelben territórium amihez kapcsolódhatna");
                }
            
            }
        }
        else
        {
            alert("nincs elég nyersanyagod az építkezéshez")
            console.log("széna:",nyersanyaglista[0]);
            console.log("fa:",nyersanyaglista[1]);
            console.log("kö:",nyersanyaglista[2]);
            console.log("rost:",nyersanyaglista[3]);
            console.log("fém",nyersanyaglista[4]);
        }
    }
    else
    {
        alert("túl sok falvad van kellenek városok is!");
    }
    
    
}
function varos(e)
{
    if(varosaim >= 6)
    {
        alert("túl sok város");
    }
    else if(nyersanyaglista[1] >= 30,nyersanyaglista[2] >= 40,nyersanyaglista[0] >=10,nyersanyaglista[3] >= 20,nyersanyaglista[4] >= 6)
    {// 30fa 40kő 10széna 20szövet 6érc
        let vizsgalt = e.target; 
        let [y, x] = melyikez(vizsgalt)
        let szab = foglalte(x,y);
        console.log(x); 
        console.log(y);
        if(x==0||x==23||y==0||y==23)
        {
            console.log("nincs elég hely a territórumnak szóval nem tehetsz id semmit! bocs");
            alert("nincs elég hely a territórumnak szóval nem tehetsz id semmit! bocs");
        }
        else if(szab != 0)
        {
            alert("ez már foglalt");
        }
        else
        {
            let s = kapcsolodike(x,y);
            if(s == 1)
            {
                claimadd(claimlista,x-1,y-1,map)//1
                claimadd(claimlista,x,y-1,map)//2
                claimadd(claimlista,x+1,y-1,map)//3
                claimadd(claimlista,x-1,y,map)//4
                claimadd(claimlista,x,y,map)//5
                claimadd(claimlista,x+1,y,map)//6
                claimadd(claimlista,x-1,y+1,map)//7
                claimadd(claimlista,x,y+1,map)//8
                claimadd(claimlista,x+1,y+1,map)//9
                map[y][x][4] = 1;
                e.target.innerHTML='V';
                nyersanyaglista[5] += 10;
                nyersanyaglista[1] -= 30;
                nyersanyaglista[2] -= 40;
                nyersanyaglista[0] -= 10;
                nyersanyaglista[3] -= 20;
                nyersanyaglista[4] -= 6;
                if(nyersanyaglista[5] >= 100)
                {
                    onclickswitch(semmi);
                }
                varosaim ++;
            }
            else
            {
               alert("nincs a közelben territórium amihez kapcsolódhatna");
            }
        
        }
    }
    else
    {
        alert("nincs elég nyersanyagod az építkezéshez")
        console.log("széna:",nyersanyaglista[0]);
        console.log("fa:",nyersanyaglista[1]);
        console.log("kö:",nyersanyaglista[2]);
        console.log("rost:",nyersanyaglista[3]);
        console.log("fém",nyersanyaglista[4]);
    }
    
}
function fovaros(e)
{
    let vizsgalt = e.target; 
    let [y, x] = melyikez(vizsgalt)
    console.log(x); 
    console.log(y);
    if(x==0||x==23||x==1||x==22||y==1||y==22||y==0||y==23)
    {
            console.log("nincs elég hely a territórumnak szóval nem tehetsz id semmit! bocs");
            alert("nincs elég hely a territórumnak szóval nem tehetsz id semmit! bocs");
    }
    else
    {
        claimadd(claimlista,x-2,y-2,map)//1
        claimadd(claimlista,x-1,y-2,map)//2
        claimadd(claimlista,x,y-2,map)//3
        claimadd(claimlista,x+1,y-2,map)//4
        claimadd(claimlista,x+2,y-2,map)//5

        claimadd(claimlista,x-2,y-1,map)//1
        claimadd(claimlista,x-1,y-1,map)//2
        claimadd(claimlista,x,y-1,map)//3
        claimadd(claimlista,x+1,y-1,map)//4
        claimadd(claimlista,x+2,y-1,map)//5

        claimadd(claimlista,x-2,y,map)//1
        claimadd(claimlista,x-1,y,map)//2
        claimadd(claimlista,x,y,map)//3
        claimadd(claimlista,x+1,y,map)//4
        claimadd(claimlista,x+2,y,map)//5

        claimadd(claimlista,x-2,y+1,map)//1
        claimadd(claimlista,x-1,y+1,map)//2
        claimadd(claimlista,x,y+1,map)//3
        claimadd(claimlista,x+1,y+1,map)//4
        claimadd(claimlista,x+2,y+1,map)//5

        claimadd(claimlista,x-2,y+2,map)//1
        claimadd(claimlista,x-1,y+2,map)//2
        claimadd(claimlista,x,y+2,map)//3
        claimadd(claimlista,x+1,y+2,map)//4
        claimadd(claimlista,x+2,y+2,map)//5
        map[y][x][4] = 1;
        e.target.innerHTML='FV';
        nyersanyaglista[5] += 25;
        for (let y = 0; y < 24; y++) {
        for (let x = 0; x < 24; x++) {

            let div = document.getElementById(`${x}_${y}`);
            div.onclick = ut;
        }
    }
    }
}
function foglalte(x,y)
{
    let a = 0;
    if(map[y][x][4] > 0)
    {
        a = map[y][x][4];
    }
    return a;
}
function expedicio(e)
{
    if(nyersanyaglista[1] >= 5,nyersanyaglista[0] >= 2,nyersanyaglista[3] >= 2)//5fa 2széna 2szövet
    {
        let vizsgalt = e.target; 
        let [y, x] = melyikez(vizsgalt)
        console.log(x); 
        console.log(y);
        if(x==0||x==23||y==0||y==23)
        {
            console.log("nincs elég felfedezhető terület");
            alert("nincs elég felfedezhető terület");
        }
        else
        {
            nyersanyaglista[1] -= 5;
            nyersanyaglista[0] -= 2;
            nyersanyaglista[3] -= 2;
            let d1 = lelohelye(x-1,y-1,map)
            if(d1 == 1)
            {
                e.target.innerHTML='M';
                console.log("teli találat");
            }
            let d2 = lelohelye(x-1,y-1,map)
            if(d2 == 1)
            {
                e.target.innerHTML='M';
                console.log("teli találat");
            }
            let d3 = lelohelye(x-1,y-1,map)
            if(d3 == 1)
            {
                e.target.innerHTML='M';
                console.log("teli találat");
            }
            let d4 = lelohelye(x-1,y-1,map)
            if(d4 == 1)
            {
                e.target.innerHTML='M';
                console.log("teli találat");
            }
            let d5 = lelohelye(x-1,y-1,map)
            if(d5 == 1)
            {
                e.target.innerHTML='M';
                console.log("teli találat");
            }
            let d6 = lelohelye(x-1,y-1,map)
            if(d6 == 1)
            {
                e.target.innerHTML='M';
                console.log("teli találat");
            }
            let d7 = lelohelye(x-1,y-1,map)
            if(d7 == 1)
            {
                e.target.innerHTML='M';
                console.log("teli találat");
            }
            let d8 = lelohelye(x-1,y-1,map)
            if(d8 == 1)
            {
                e.target.innerHTML='M';
                console.log("teli találat");
            }
            let d9 = lelohelye(x-1,y-1,map)
            if(d9 == 1)
            {
                e.target.innerHTML='M';
                console.log("teli találat");
            }          
        }
    }
    else
    {
        alert("nincs elég nyersanyagod az építkezéshez")
        console.log("széna:",nyersanyaglista[0]);
        console.log("fa:",nyersanyaglista[1]);
        console.log("kö:",nyersanyaglista[2]);
        console.log("rost:",nyersanyaglista[3]);
        console.log("fém",nyersanyaglista[4]);
    }
    
}
function mine(e)
{
    if(nyersanyaglista[1] >= 30,nyersanyaglista[2] >= 10,nyersanyaglista[0] >= 10,nyersanyaglista[3] >= 15)
    {//30fa 10kő 10széna 15szövet
        let vizsgalt = e.target; 
        let [y, x] = melyikez(vizsgalt)
        let szab = foglalte(x,y);
        console.log(x); 
        console.log(y);
        if(x==0||x==23||y==0||y==23)
        {
            console.log("nincs elég felfedezhető terület");
            alert("nincs elég felfedezhető terület");
        }
        else if(szab != 0)
        {
            lert("ez már foglalt");
        }
        else 
        {
            map[y][x][4] = 1;
            e.target.innerHTML='M';
            banyaim+=1;
            console.log("bányák:",banyaim);
        }
        nyersanyaglista[1] -= 30;
        nyersanyaglista[2] -= 10;
        nyersanyaglista[0] -= 10;
        nyersanyaglista[3] -= 15;
    }
    else
    {
        alert("nincs elég nyersanyagod az építkezéshez")
        console.log("széna:",nyersanyaglista[0]);
        console.log("fa:",nyersanyaglista[1]);
        console.log("kö:",nyersanyaglista[2]);
        console.log("rost:",nyersanyaglista[3]);
        console.log("fém",nyersanyaglista[4]);
    }
    
}
function kapcsolodike(x,y)
{
    let valasz = 0;
    if(map[y-1][x-1][3] == 1)//1
    {
        valasz = 1;
    }
    else if(map[y-1][x][3] == 1)//2
    {
        valasz = 1;
    }
    else if(map[y-1][x+1][3] == 1)//3
    {
        valasz = 1;
    }
    else if(map[y][x-1][3] == 1)//4
    {
        valasz = 1;
    }
    
    else if(map[y][x+1][3] == 1)//6
    {
        valasz = 1;
    }
    else if(map[y+1][x-1][3] == 1)//7
    {
        valasz = 1;
    }
    else if(map[y+1][x][3] == 1)//8
    {
        valasz = 1;
    }
    else if(map[y+1][x+1][3] == 1)//9
    {
        valasz = 1;
    }
    return valasz;
}
// az onclick switch!
function onclickswitch(ffff)
{
    for (let y = 0; y < 24; y++) {
        for (let x = 0; x < 24; x++) {

            let div = document.getElementById(`${x}_${y}`);
            div.onclick = ffff;
        }
    }
}
function semmi()
{
    alert("nyertél");
}


divek_letrehozasa(24,24);
let map = randommapgen();
divek_szinezese(map);
let claimlista = claimlist();
let nyersanyaglista = resourcelist();
let banyaim = 0;
let falvak = 0;
let varosaim = 0;
let utaim = 0;
const button = document.getElementById("dobas");
button.addEventListener("click", function () {
    let dobott = kockadobas()
    nyersanyagosztas(dobott)
    alert(dobott);
    
});
/*const button2 = document.getElementById("claimkiir");
button2.addEventListener("click", function () {
    claimkiírás(claimlista);
});*/
const utt = document.getElementById("rout");
utt.addEventListener("click", function () {
    onclickswitch(ut);
});
const village = document.getElementById("village");
village.addEventListener("click", function () {
    onclickswitch(falu);
});
const town = document.getElementById("town");
town.addEventListener("click", function () {
    onclickswitch(varos);
});
const expedition = document.getElementById("expedition");
expedition.addEventListener("click", function () {
    onclickswitch(expedicio);
});
const banya = document.getElementById("minee");
banya.addEventListener("click", function () {
    onclickswitch(mine);
});
