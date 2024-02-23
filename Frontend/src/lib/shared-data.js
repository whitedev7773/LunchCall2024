import  { writable } from 'svelte/store'

export const common_interval = writable();

export const remain1 = writable();
export const remain2 = writable();

export const banner_interval = writable();

export const bg_color = writable("#0984e3");
export const setting = writable({
  call_start: {
    hour: "..",
    minute: ".."
  },
  order: [
    ["..", ".."],
    ["..", ".."],
    ["..", ".."]
  ],
  show_second: [
    "..",
    "..",
    ".."
  ],
  delay: [
    "..",
    "..",
    ".."
  ],
  is_mute: false,
  voice: "Note",
  geolocation: {
    lat: null,
    lon: null
  },
  last_save: {
    year: "..", month: "..", day: "..",
    hour: "..", minute: "..", second: ".."
  }
});

export const display = writable({
  showindex: 0,
  mainmessage: "대기중",
  submessage: "아직 수업시간이에요",
  timemessage: "Time Here",
  face: ":D",
  remain: 100,
  timetable: []
});

export const weather_interval = writable();
export const weather = writable([
  {
    low: "..",
    high: ".."
  },
  {
    date: {
      month: "..",
      day: "..",
      day_name: ".."
    },
    weather: {
      icon: "01",
      status: "..",
      desc: "..",
      icon: "01"
    }
  },
  {
    date: {
      month: "..",
      day: "..",
      day_name: ".."
    },
    weather: {
      icon: "01",
      status: "..",
      desc: "..",
      icon: "01"
    }
  },
  {
    date: {
      month: "..",
      day: "..",
      day_name: ".."
    },
    weather: {
      icon: "01",
      status: "..",
      desc: "..",
      icon: "01"
    }
  },
  {
    date: {
      month: "..",
      day: "..",
      day_name: ".."
    },
    weather: {
      icon: "01",
      status: "..",
      desc: "..",
      icon: "01"
    }
  },
  {
    date: {
      month: "..",
      day: "..",
      day_name: ".."
    },
    weather: {
      icon: "01",
      status: "..",
      desc: "..",
      icon: "01"
    }
  },
  {
    date: {
      month: "..",
      day: "..",
      day_name: ".."
    },
    weather: {
      icon: "01",
      status: "..",
      desc: "..",
      icon: "01"
    }
  }
]);


export const menu_interval = writable();
export const menu = writable({
  조식: ["..","..","..","..","..",".."],
  중식: ["..","..","..","..","..",".."],
  석식: ["..","..","..","..","..",".."],
  date: "20240205"
});