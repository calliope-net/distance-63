
namespace vl53l4cd { // advanced.ts

    //% group="HEX" advanced=true
    //% block="toHex %value %format" weight=9
    export function toHex(value: number, format: NumberFormat) {
        let buffer = Buffer.create(Buffer.sizeOfNumberFormat(format))
        buffer.setNumber(format, 0, value)
        return buffer.toHex()
    }

    //% group="HEX" advanced=true
    //% block="fromHex %hex %format" weight=9
    export function fromHex(hex: string, format: NumberFormat) {
        return Buffer.fromHex(hex).getNumber(format, 0)
    }

} // advanced.ts
