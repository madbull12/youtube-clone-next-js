import { toast } from "react-hot-toast";

const saveToWatchLater = async (
  thumbnail: string,
  title: string,
  authorTitle: string,
  publishedAt: Date,
  videoId: string
) => {
  try {
    const data = {
      thumbnail,
      title,
      authorTitle,
      publishedAt,
      videoId,
    };

    await toast.promise(
      fetch("/api/watch-later", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
      {
        loading: "Loading...",
        success: "Saved to watch later",
        error: "Oops something went wrong",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export default saveToWatchLater;
