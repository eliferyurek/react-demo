export const channel = [
    {
      value: 1,
      label: "CAN1"
    },
    {
      value: 2,
      label: "CAN2",
    }
];

export const baudrate = [
    {
      value: 1,
      label: "10K"
    },
    {
      value: 2,
      label: "20K",
    },
    {
      value: 3,
      label: "50K"
    },
    {
      value: 4,
      label: "125K",
    },
    {
      value: 5,
      label: "250K"
    },
    {
      value: 6,
      label: "500K",
    },
    {
      value: 7,
      label: "800K"
    },
    {
      value: 8,
      label: "1000K",
    },
];

export const node_id = [];

for (var i = 1; i < 128; i++) {
    node_id.push({value: i, label: i});
}

export const stopbits = [
    {
      value: 1,
      label: "1"
    },
    {
      value: 2,
      label: "1.5",
    },
    {
        value: 3,
        label: "2",
    }
];

export const port = [
    {
      value: 1,
      label: "COM1"
    },
    {
      value: 2,
      label: "COM2",
    }
];


export const databits = [];

for (var j = 8; j > -1; j--) {
    databits.push({value: j, label: j});
}

export const parity = [
    {
      value: 1,
      label: "None"
    },
    {
      value: 2,
      label: "Odd",
    },
    {
        value: 3,
        label: "Even",
    },
    {
      value: 4,
      label: "Mark",
    },
    {
        value: 5,
        label: "Space",
    }
];

export const baudratetest = [
    {
      value: 1,
      label: "9600"
    },
    {
      value: 2,
      label: "14400",
    },
    {
      value: 3,
      label: "19200"
    },
    {
      value: 4,
      label: "28800",
    },
    {
      value: 5,
      label: "31250"
    },
    {
      value: 6,
      label: "38400",
    },
    {
      value: 7,
      label: "57600"
    },
    {
      value: 8,
      label: "115200",
    },
    {
      value: 9,
      label: "230400",
    },
    {
      value: 10,
      label: "460800"
    },
    {
      value: 11,
      label: "921600",
    },
];

export const emulation = [
    {
      value: 1,
      label: "Emulate"
    },
    {
      value: 2,
      label: "Don't Emulate (SDO Only)",
    },
    {
        value: 3,
        label: "Watch Message Traffic Only",
    }
];

export const serial = [
    {
      value: 1,
      label: "1"
    },
    {
      value: 2,
      label: "2",
    }
];

export const canbus = [];

for (var i = 1; i < 7; i++) {
    canbus.push({value: i, label: i});
}