// 1_fetch.js

/**
 * @param {string} url - az url, amiről lekérdezi a szótárat
 * @returns {Promise<Object>} a szótár
 */
async function getch(url){
    const response = await fetch(url);
    const json_promise = await response.json();
    return json_promise;
}
/**
 * lekérdezi a szerverről, hogy a játékos melyik a két lehetséges játékos közül. A kreáló ("egyik"), vagy a csatlakozó ("másik").
 * @returns {Promise<Object>} játékos címkéje
 */
async function melyik_jatekos_vagyok(){
    let szotar = await getch(`${window.location.origin}/yoursweeper/api/get/melyik/jatekid/${get_jatekid()}/`);
    console.log("Melyik játékos vagyok?\n Szerver válasza:");
    console.log(szotar);
    return szotar;
}


