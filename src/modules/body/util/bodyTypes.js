import Finished from "../../finished/components/Finished";
import Home from "../../home/components/Home";
import LyricGenerator from "../../lyricGenerator/components/LyricGenerator";
import LyricSchema from "../../lyricSchema/components/LyricSchema";
import LyricSource from "../../lyricSource/components/LyricSource";
import Notes from "../../notes/components/Notes";
import Timer from "../../timer/components/Timer";

const BODY_TYPES = {
  HOME: {
    id: "HOME",
    title: "Home",
    component: Home,
  },
  LYRIC_SOURCE: {
    id: "LYRIC_SOURCE",
    title: "Lyric Source",
    component: LyricSource,
  },
  LYRIC_SCHEMA: {
    id: "LYRIC_SCHEMA",
    title: "Lyric Schema",
    component: LyricSchema,
  },
  LYRIC_GENERATOR: {
    id: "LYRIC_GENERATOR",
    title: "Lyric Generator",
    component: LyricGenerator,
  },
  TIMER: {
    id: "TIMER",
    title: "Timer",
    component: Timer,
  },
  NOTES: {
    id: "NOTES",
    title: "Notes",
    component: Notes,
  },
  FINISHED: {
    id: "FINISHED",
    title: "Finished",
    component: Finished,
  },
};

export default BODY_TYPES;
