import { atom, selector } from "recoil";

export const videoState = atom({
  key: "videoState",
  default: "shit",
});

export const videoValue = selector({
  key: "videoValue", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const video = get(videoState);

    return video;
  },
});
