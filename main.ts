input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    bw = pins.buffer_create(2)
    pins.buffer_setNumber(bw, NumberFormat.UInt16BE, 0, 150)
    i2cFehler = pins.pins_i2cWriteBuffer(i2cAdresse, bw)
    if (i2cFehler == 0) {
        br = pins.pins_i2cReadBuffer(i2cAdresse, 2)
        basic.showNumber(pins.buffer_getNumber(br, NumberFormat.UInt16BE, 0))
        basic.setLedColor(0x00ff00)
    } else {
        basic.showNumber(i2cFehler)
        basic.setLedColor(0xff0000)
    }
})
let br: Buffer = null
let i2cFehler = 0
let bw: Buffer = null
let i2cAdresse = 0
i2cAdresse = pins.pins_i2cAdressen(pins.ei2cAdressen.LaserDistance_x29)
