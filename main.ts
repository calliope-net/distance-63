function WrByte (register: number, byte: number) {
    bw = pins.buffer_create(3)
    pins.buffer_setNumber(bw, NumberFormat.UInt16BE, 0, register)
    pins.buffer_setUint8(bw, 2, byte)
    i2cFehler = pins.pins_i2cWriteBuffer(i2cAdresse, bw)
    if (i2cFehler == 0) {
        basic.setLedColor(0xb09eff)
    } else {
        basic.showNumber(i2cFehler)
        basic.setLedColor(0xff0000)
    }
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    basic.showNumber(vl53l4cd.rdWord(vl53l4cd.eRegister.VL53L1_IDENTIFICATION__MODEL_ID))
    vl53l4cd.sensorInit()
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    basic.showNumber(vl53l4cd.getInterruptPolarity())
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    vl53l4cd.startRanging()
    basic.setLedColors(0x0000ff, 0xff0000, 0xff0000)
    while (vl53l4cd.checkForDataReady() != 0) {
        vl53l4cd.delay(1)
    }
    basic.setLedColors(0x0000ff, 0x00ff00, 0xff0000)
    basic.showNumber(vl53l4cd.getDistance())
    vl53l4cd.clearInterrupt()
    vl53l4cd.stopRanging()
})
function RdWord (register: number) {
    bw = pins.buffer_create(2)
    pins.buffer_setNumber(bw, NumberFormat.UInt16BE, 0, register)
    i2cFehler = pins.pins_i2cWriteBuffer(i2cAdresse, bw)
    if (i2cFehler == 0) {
        br = pins.pins_i2cReadBuffer(i2cAdresse, 2)
        basic.setLedColor(0x00ff00)
        return pins.buffer_getNumber(br, NumberFormat.UInt16BE, 0)
    } else {
        basic.setLedColor(0xff0000)
        return i2cFehler
    }
}
let br: Buffer = null
let i2cFehler = 0
let bw: Buffer = null
let i2cAdresse = 0
i2cAdresse = pins.pins_i2cAdressen(pins.ei2cAdressen.LaserDistance_x29)
