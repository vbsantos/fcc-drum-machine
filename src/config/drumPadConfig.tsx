export interface DrumPadI {
  id: string,
  src: string,
  text: string,
};

export const DRUM_PADS = [
  {
    id: 'Q',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    text: 'Heater 1',
  },
  {
    id: 'W',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    text: 'Heater 2',
  },
  {
    id: 'E',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    text: 'Heater 3',
  },
  {
    id: 'A',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    text: 'Heater 4',
  },
  {
    id: 'S',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    text: 'Clap',
  },
  {
    id: 'D',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    text: 'Open HH',
  },
  {
    id: 'Z',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    text: "Kick 'n Hat",
  },
  {
    id: 'X',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    text: 'Kick',
  },
  {
    id: 'C',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    text: 'Closed HH',
  },
];
