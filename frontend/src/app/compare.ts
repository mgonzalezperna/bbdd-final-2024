export function compare(a: number | String, b: number | String, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}