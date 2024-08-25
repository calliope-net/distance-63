input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (vl53l4cd.sensorInit() == 0) {
        while (true) {
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
let distance = 0
let o4digit: grove.TM1637 = null
let i2cAdresse = pins.pins_i2cAdressen(pins.ei2cAdressen.LaserDistance_x29)
o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
o4digit.set(7)
