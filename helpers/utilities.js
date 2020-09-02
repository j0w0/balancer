function addZero(i) {
    if(i < 10) {
        i = "0" + i;
    }
    return i;
}

function formatDate(date) {
    const d = new Date(date);
    const month = addZero(d.getMonth() + 1);
    const day = addZero(d.getDate());
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

module.exports = {
    formatDate
}