import { ref, toValue } from 'vue'
export function useParseDate(dateString, format) {

    const date = ref(null)
    const fmt = toValue(format)
    const fmtLower = fmt.toLowerCase()
    const dateStr = toValue(dateString)

    let regex = fmtLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // check for a single day, month and year expression

    let dayToken, monthToken

    // days

    if (fmtLower.includes('dd')) {
        regex = regex.replace('dd', '(\\d{2})')
        dayToken = 'dd'
    } else if (fmtLower.includes('d')) {
        regex = regex.replace('d', '(\\d{1,2})')
        dayToken = 'd'
    } else {
        return { date }
    }

    // month

    if (fmtLower.includes('mm')) {
        regex = regex.replace('mm', '(\\d{2})')
        monthToken = 'mm'
    } else if (fmtLower.includes('m')) {
        regex = regex.replace('m', '(\\d{1,2})')
        monthToken = 'm'
    } else {
        return { date }
    }

    if (!fmtLower.includes('yyyy')) {
        return { date }
    }

    // year

    regex = regex.replace('yyyy', '(\\d{4})')

    // check for format match

    const match = dateStr.match(new RegExp(`^${regex}$`))
    if (!match) {
        return { date }
    }

    // bring day, month, year in correct order to allow ISO notation

    const order = [
        { token: 'yyyy', pos: fmtLower.indexOf('y') },
        { token: monthToken, pos: fmtLower.indexOf('m') },
        { token: dayToken, pos: fmtLower.indexOf('d') }
    ].sort((a, b) => a.pos - b.pos)

    const values = {}
    for (let i = 0; i < order.length; ++i) {
        values[order[i].token] = match[i + 1]
    }

    const result = new Date(Number(values['yyyy']), Number(values[monthToken]) - 1, Number(values[dayToken]))

    if (!isNaN(result)) {
        date.value = result
    }

    return { date }
}
