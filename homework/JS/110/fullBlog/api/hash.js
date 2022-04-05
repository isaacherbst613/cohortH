function cryptoHash(...inputs){
    const str = inputs.join('');
    const hash = Array.from(str).reduce((hash, char) => 0 | (31 * hash + char.charCodeAt(0)), 0);
    return hexToHextridec(hash);
}

function compare(a,b){
    const hash = cryptoHash(a);
    const hash2 = cryptoHash(b);
    return hash === hash2;
}


function hexToHextridec(num){
    let dec = parseInt(num, 16);
    return Math.abs(dec).toString(36);
}

module.exports = [cryptoHash, compare];