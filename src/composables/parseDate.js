import { ref, toValue } from "vue";
export function parseDate(dateString, format) {

    const date = ref(false);
    const fmt = toValue(format);

    let matches, escapedFormat = fmt.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), posMap = [];

    // check for single day, month and year expression

    if((matches = fmt.match(/\bd\b/gi)) && 1 === matches.length) {
        escapedFormat = escapedFormat.replace('d', '(\\d{1,2})');
    }
    else if((matches = fmt.match(/\bdd\b/gi)) && 1 === matches.length) {
        escapedFormat = escapedFormat.replace('dd', '(\\d{2})');
    }
    else {
        return { date }
    }
    posMap.push( { srcPos: fmt.toLowerCase().indexOf('d'), destPos: 2 });

    if((matches = fmt.match(/\bm\b/gi)) && 1 === matches.length) {
        escapedFormat = escapedFormat.replace('m', '(\\d{1,2})');
    }
    else if((matches = fmt.match(/\bmm\b/gi)) && 1 === matches.length) {
        escapedFormat = escapedFormat.replace('mm', '(\\d{2})');
    }
    else {
        return { date }
    }
    posMap.push( { srcPos: fmt.toLowerCase().indexOf('m'), destPos: 1 });

    if((matches = fmt.match(/\byyyy\b/gi)) && 1 === matches.length) {
        escapedFormat = escapedFormat.replace('yyyy', '(\\d{4})');
    }
    else {
        return { date }
    }
    posMap.push( { srcPos: fmt.toLowerCase().indexOf('y'), destPos: 0 });
    if(!(matches = toValue(dateString).match(escapedFormat))) {
        return { date }
    }

    // remove first match

    matches.shift();

    // bring day, month, year in correct order to allow ISO notation

    posMap.sort( (a, b) => a.srcPos < b.srcPos ? -1 : 1);

    let result = [], part, pos;

    while((part = matches.shift())) {
        pos = posMap.shift();
        result[pos.destPos] = part;
    }

    result = Date.parse(result.join('-'));

    if(result) {
        result = new Date(result);
        date.value = new Date(result.getFullYear(), result.getMonth(), result.getDate(), 0, 0, 0);
    }
    return { date };
}
