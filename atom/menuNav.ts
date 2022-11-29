import { atom,selector } from "recoil";

export const menuNavState = atom({
    key:"menuNavState",
    default:false
});

export const isMenuOpen = selector({
    key: 'isMenuOpen', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const isOpen = get(menuNavState);
  
      return isOpen;
    },
  });