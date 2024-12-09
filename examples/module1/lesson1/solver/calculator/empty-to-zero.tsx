export default function convertEmptyToZero(value: string | number) {
    return !value ? 0 : Number(value)
}