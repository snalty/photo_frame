import uinput, time

device = uinput.Device([uinput.KEY_N, uinput.BTN_LEFT])

def next_photo():
  device.emit_click(uinput.KEY_N)
  return True

def mouse_click():
    device.emit_click(uinput.BTN_LEFT)
    return True
