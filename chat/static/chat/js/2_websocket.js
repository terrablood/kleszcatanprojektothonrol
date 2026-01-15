// 2_websocket.js


function socket_megnyilt(){
    valtozok_kuldese({'message': 'betöltött nálam az oldal.'});
}
/**
 * @param {Object} szotar - a változók és értékeik egy szótárban
 */
function valtozok_kuldese(szotar){
    ws.send(JSON.stringify(szotar));
}
/**
 * @param {MessageEvent} e 
 */
function valtozok_fogadasa(e) {
    const szotar = JSON.parse(e.data);


    if ('message' in szotar) {
        chatlog.value += szotar.message + '\n';
    }

    if ('jatek_allapot_update' in szotar){
        const uj_allapot = parseInt(szotar.jatek_allapot_update);
        if(jatek_allapota === MEG_NEM_INDULT_EL && uj_allapot === MOST_MEGY && ki_vagy_te === 'egyik' )
        {
            divek_letrehozasa('ellenfel', masik_palya, 15, 15);   
        }
        jatek_allapota = parseInt(szotar.jatek_allapot_update);
    }

    if ('kattintott_mezo_x' in szotar && 'kattintott_mezo_y' in szotar && 'felderitesek' in szotar){
        const az_ellenfel = ellenfele(ki_vagy_te);

        
    }


};
/**
 * @param {CloseEvent} e 
 */
function socket_bezarult(e) {
    console.error('Chat socket váratlanul bezárult');
};

/////////////////////////////// FŐPROGRAM /////////////////////////////////////////

const ws = new WebSocket(`ws://${window.location.host}/ws/play/${get_jatekid()}/`); // ennek legyen meg a paraméteres párja a routing.py-ban!

ws.addEventListener('message', valtozok_fogadasa);
ws.addEventListener('close', socket_bezarult);
ws.addEventListener('open', socket_megnyilt);
