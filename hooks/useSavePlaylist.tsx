import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { videoState, videoValue } from "../atom/video";
import { trpc } from "../utils/trpc";

const useSavePlaylist = () => {
  const utils = trpc.useContext();
  const videoState = useRecoilValue(videoValue);
  console.log(videoState)
  const { mutateAsync } = trpc.playlist.saveToPlaylist.useMutation({
    onSettled: () => {
      utils.playlist.playlistDetails.invalidate();
    },
  });

  const handleSaveToPlaylist = async (
    playlistId: string,

  ) => {
    const data = {
        ...videoState,
        playlistId,
    }
    await toast.promise(
      mutateAsync(data),
      {
        loading: "Saving to playlist",
        error: () => `Oops... something went wrong`,
        success: () => "Saved to playlist",
      }
    );
  };

  return { handleSaveToPlaylist };
};

export default useSavePlaylist;
