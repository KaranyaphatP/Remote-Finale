let Y_Axis = 0
let X_Axis = 0
let Servo = 0
radio.setGroup(118)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
let mode = 1
basic.showString("M")
led.stopAnimation()
loops.everyInterval(1000, function () {
    if (mode == 0) {
        basic.showString("A")
        led.stopAnimation()
    }
})
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        radio.sendValue("servo", 180)
        Servo = 180
    } else if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        radio.sendValue("servo", 0)
        Servo = 0
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        radio.sendValue("servo", 90)
        Servo = 90
    }
})
basic.forever(function () {
    X_Axis = -1 * (pins.analogReadPin(AnalogPin.P2) - 517)
    Y_Axis = -1 * (pins.analogReadPin(AnalogPin.P1) - 518)
})
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        if (mode == 0) {
            mode = 1
            radio.sendValue("mode", 1)
            basic.showString("M")
            led.stopAnimation()
        } else if (mode == 1) {
            mode = 0
            radio.sendValue("mode", 0)
            basic.showString("A")
            led.stopAnimation()
        }
    }
})
basic.forever(function () {
    if (Y_Axis > 250 && (X_Axis > -100 && X_Axis < 100)) {
        radio.sendValue("Angle", 90)
    } else if (Y_Axis < -250 && (X_Axis > -100 && X_Axis < 100)) {
        radio.sendValue("Angle", 270)
    } else {
        if (Y_Axis > -100 && Y_Axis < 100 && X_Axis > 250) {
            radio.sendValue("Angle", 0)
        } else {
            if (Y_Axis > -100 && Y_Axis < 100 && X_Axis < -250) {
                radio.sendValue("Angle", 180)
            } else {
                if (Y_Axis > 250 && X_Axis < -250) {
                    radio.sendValue("Angle", 135)
                } else {
                    if (Y_Axis > 250 && X_Axis > 250) {
                        radio.sendValue("Angle", 45)
                    } else {
                        if (Y_Axis < -250 && X_Axis < -250) {
                            radio.sendValue("Angle", 225)
                        } else {
                            if (Y_Axis < -250 && X_Axis > 250) {
                                radio.sendValue("Angle", 315)
                            } else if (Y_Axis > -3 && Y_Axis < 3 && (X_Axis > -3 && X_Axis < 3)) {
                                radio.sendValue("Angle", 1000)
                            }
                        }
                    }
                }
            }
        }
    }
})
basic.forever(function () {
    if (mode == 1) {
        if (Y_Axis > 250 && (X_Axis > -100 && X_Axis < 100)) {
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
            led.stopAnimation()
        } else if (Y_Axis < -250 && (X_Axis > -100 && X_Axis < 100)) {
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `)
            led.stopAnimation()
        } else {
            if (Y_Axis > -100 && Y_Axis < 100 && X_Axis > 250) {
                basic.showLeds(`
                    . . # . .
                    . . . # .
                    # # # # #
                    . . . # .
                    . . # . .
                    `)
                led.stopAnimation()
            } else {
                if (Y_Axis > -100 && Y_Axis < 100 && X_Axis < -250) {
                    basic.showLeds(`
                        . . # . .
                        . # . . .
                        # # # # #
                        . # . . .
                        . . # . .
                        `)
                    led.stopAnimation()
                } else {
                    if (Y_Axis > 250 && X_Axis < -250) {
                        basic.showLeds(`
                            # # # # .
                            # # . . .
                            # . # . .
                            # . . # .
                            . . . . #
                            `)
                        led.stopAnimation()
                    } else {
                        if (Y_Axis > 250 && X_Axis > 250) {
                            basic.showLeds(`
                                . # # # #
                                . . . # #
                                . . # . #
                                . # . . #
                                # . . . .
                                `)
                            led.stopAnimation()
                        } else {
                            if (Y_Axis < -250 && X_Axis < -250) {
                                basic.showLeds(`
                                    . . . . #
                                    # . . # .
                                    # . # . .
                                    # # . . .
                                    # # # # .
                                    `)
                                led.stopAnimation()
                            } else {
                                if (Y_Axis < -250 && X_Axis > 250) {
                                    basic.showLeds(`
                                        # . . . .
                                        . # . . #
                                        . . # . #
                                        . . . # #
                                        . # # # #
                                        `)
                                    led.stopAnimation()
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})
