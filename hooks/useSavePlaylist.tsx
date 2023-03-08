import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { videoState, videoValue } from "../atom/video";
import { trpc } from "../utils/trpc";

const useSavePlaylist = () => {
  const utils = trpc.useContext();
  const videoState = useRecoilValue(videoValue);
  console.log(videoState);

  // const { data:playlistDetails } = trpc.playlist.playlistDetails.useQuery({
  //   playlistId:
  // })

  const { mutateAsync:saveVideo } = trpc.playlist.saveToPlaylist.useMutation({
    onSettled: () => {
      utils.playlist.playlistDetails.invalidate();
    },
  });
  const { mutateAsync:createAndSaveToPlaylist } = trpc.playlist.createAndSaveToPlaylist.useMutation({
    onSettled: () => {
      utils.playlist.userPlaylists.invalidate();
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
      saveVideo(data),
      {
        loading: "Saving to playlist",
        error: () => `Oops... something went wrong`,
        success: () => "Saved to playlist",
      }
    );
  };

  const handleCreateandSavetoPlaylist = async(playlistName:string,privacy:string) => {
    const data = {
        ...videoState,
        playlistName,
        privacy
    }
    await toast.promise(
        createAndSaveToPlaylist(data),{
            loading: "Creating playlist",
            error: () => `Oops... something went wrong`,
            success: () => "Saved to playlist",
        }
    )
  }

  return { handleSaveToPlaylist,handleCreateandSavetoPlaylist };
};

export default useSavePlaylist;
