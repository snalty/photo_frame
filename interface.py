import uinput, time

device = uinput.Device([uinput.KEY_N])


def next_photo():
  device.emit_click(uinput.KEY_N)
  return True
