const monthNames = [
    "January", "February", "March", "April",
    "May", "June","July", "August",
    "September", "October", "November", "December"
];

const weekNames = [
    "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday"
];

function addZero(i) {
    if(i < 10) {
        i = "0" + i;
    }
    return i;
}

function formatDate(date) {
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function formatDateLong(date) {
    const month = monthNames[date.getMonth()];
    const day = addZero(date.getDate());
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

module.exports = {
    formatDate,
    formatDateLong
}