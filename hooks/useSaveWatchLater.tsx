import { toast } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { videoState, videoValue } from "../atom/video";
import { trpc } from "../utils/trpc";

const useSaveWatchLater = () => {
  const utils = trpc.useContext();
  const videoState = useRecoilValue(videoValue);
  console.log(videoState);

  const { mutateAsync: saveToWatchLater } = trpc.watchLater.saveToWatchLater.useMutation({
    onSettled:()=>{
        utils.watchLater.userWatchLater.invalidate();
    }
  });

  const handleSaveToWatchLater = async() => {
    await toast.promise(saveToWatchLater({...videoState}),{
        loading:"Saving to watch later",
        success:() => "Saved succesffuly",
        error:(err)=>`Oops something went wrong ${err}`
    })
  }

  return { handleSaveToWatchLater };
};

export default useSaveWatchLater;
