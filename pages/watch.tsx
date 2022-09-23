import { useRouter } from "next/router";
import React from "react";
import Body from "../components/Body";
import useFetch from "../hooks/useFetch";

const VideoPage = () => {
  const router = useRouter();
  const { v } = router.query;

  const { data, loading, error } = useFetch(
    `videos?part=contentDetails,snippet,statistics&id=${v}`
  );
  console.log(data);
  return (
    <Body>
      <div className="flex gap-x-2">
        <div className="w-2/3">
          <iframe
            width="420"
            height="345"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
          ></iframe>
        </div>
      </div>
    </Body>
  );
};

export default VideoPage;
