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
        basic.showNumber(vl53l4cd.rdByte(vl53l4cd.eRegister.GPIO__TIO_HV_STATUS))
        i = 0
        status = 0
        vl53l4cd.ranging(vl53l4cd.eSYSTEM__MODE_START.startOneshotRanging)
        while (true) {
            while (!(bit.bitwise(status, bit.eBit.AND, 1) == 1)) {
                status = vl53l4cd.rdByte(vl53l4cd.eRegister.GPIO__TIO_HV_STATUS)
                basic.showNumber(status)
                i += 1
                basic.pause(10)
            }
            distance = vl53l4cd.rdWord(vl53l4cd.eRegister.VL53L1_RESULT__FINAL_CROSSTALK_CORRECTED_RANGE_MM_SD0)
            o4digit.show(distance)
        }
    } else {
        basic.setLedColors(0xff0000, 0x000000, 0x000000)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    b = !(b)
    if (b) {
        vl53l4cd.ranging(vl53l4cd.eSYSTEM__MODE_START.startRanging)
        basic.setLedColors(0x000000, 0x000000, 0x00ff00)
    } else {
        vl53l4cd.ranging(vl53l4cd.eSYSTEM__MODE_START.stopRanging)
        basic.setLedColors(0x000000, 0x000000, 0xff0000)
    }
})
let b = false
let distance = 0
let status = 0
let i = 0
let o4digit: grove.TM1637 = null
let i2cAdresse = pins.pins_i2cAdressen(pins.ei2cAdressen.LaserDistance_x29)
o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
o4digit.set(7)
