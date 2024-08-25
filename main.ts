input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (vl53l4cd.sensorInit() == 0) {
        while (!(input.buttonIsPressed(Button.B))) {
            o4digit.show(vl53l4cd.readAbstandR())
        }
    } else {
        basic.setLedColors(0xff0000, 0x000000, 0x000000)
    }
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    if (vl53l4cd.sensorInit() == 0) {
        while (!(input.buttonIsPressed(Button.B))) {
            vl53l4cd.startRanging()
            basic.pause(5)
            distance = vl53l4cd.getDistance()
            basic.pause(5)
            vl53l4cd.stopRanging()
            o4digit.show(distance)
        }
    } else {
        basic.setLedColors(0xff0000, 0x000000, 0x000000)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    o4digit.clear()
    o4digit.bit(vl53l4cd.getInterruptPolarity(), 3)
    o4digit.bit(vl53l4cd.rdByte(vl53l4cd.eRegister.GPIO__TIO_HV_STATUS), 1)
})
let distance = 0
let o4digit: grove.TM1637 = null
let i2cAdresse = pins.pins_i2cAdressen(pins.ei2cAdressen.LaserDistance_x29)
o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
o4digit.set(7)
