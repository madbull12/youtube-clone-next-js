import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isMenuOpen, menuNavState } from "../atom/menuNav";
import { isPlaylistDialogOpen } from "../atom/playlist";
import Backdrop from "./Backdrop";
import Header from "./Header";
import SaveToPlaylist from "./SaveToPlaylist";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [openMenuNav, setMenuNav] = useRecoilState(menuNavState);

  const isPlaylistOpen = useRecoilValue(isPlaylistDialogOpen);

  // const openDialog = useRecoilValue(isPlaylistDialogOpen);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    if (!isPlaylistOpen) {
      document.body.style.overflowY = "visible";
    }
  }, [isPlaylistOpen]);

  return (
    <>
      {isPlaylistOpen && (
        <Backdrop>
          <SaveToPlaylist />
        </Backdrop>
      )}
      {openMenuNav ? (
        <Backdrop>
          <Sidebar />
        </Backdrop>
      ) : null}
      <Header />
      {children}
    </>
  );
};

export default Layout;
