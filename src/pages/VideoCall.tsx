import { MediaConnection, Peer } from "peerjs";
import { useEffect, useRef, useState } from "react";
import useUserData from "../hooks/user/useUserData";
import Loader from "../ui/Loader";
import { useParams } from "react-router-dom";

export default function VideoCall() {
  const videoRef = useRef<HTMLVideoElement>();
  const { user, isLoading } = useUserData();
  const [streams, setStreams] = useState<MediaStream[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const clientPeer = new Peer(user?.id || "", {
      host: "localhost",
      port: 3000,
      path: "/call",
    });

    // clientPeer.on("connection", (data) => {
    //   console.log("some 1 connected", data);
    // });

    function callId(id: string, stream: MediaStream) {
      const call = clientPeer.call(id, stream);

      if (call) {
        let streamId: string;

        call.on("stream", (userStream) => {
          if (streamId !== userStream.id) {
            streamId = userStream.id;
            setStreams((strs) => [...strs, userStream]);
          }
        });
        call.on("willCloseOnRemote", () => {
          setStreams((strs) => [...strs].filter((str) => str.active === true));
        });
      }
    }

    if (!isLoading) {
      let call: MediaConnection;
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;

            clientPeer.on("call", (call) => {
              let streamId: string;
              console.log("answering call", stream.id);

              call.answer(stream);
              call.on("stream", (str) => {
                console.log("call on stream", str.id);
                if (streamId !== str.id) {
                  streamId = str.id;
                  setStreams((strs) => [...strs, str]);
                }
              });
              call.on("close", () => {
                setStreams((strs) =>
                  [...strs].filter((str) => str.active === true)
                );
              });
              call.on("iceStateChanged", (state) => {
                setStreams((strs) =>
                  [...strs].filter((str) => str.active === true)
                );
              });
            });
            if (
              clientPeer.id &&
              clientPeer.id !== "04cb1051-691a-4b9a-98f5-e1a1ed6ff905"
            ) {
              console.log("connection ....");
              clientPeer.connect("04cb1051-691a-4b9a-98f5-e1a1ed6ff905");
              callId("04cb1051-691a-4b9a-98f5-e1a1ed6ff905", stream);
            }
          }
        });

      return () => {
        if (call) call.close();
        clientPeer.destroy();
      };
    }
  }, [user, isLoading]);

  console.log(streams);
  if (isLoading) return <Loader />;
  return (
    <div className="  grid grid-flow-row items-center justify-center gap-[5%] py-[5%] grid-rows-2">
      {/* <h1 className=" text-4xl text-center">VideoCall</h1> */}
      <video
        playsInline
        autoPlay
        ref={videoRef}
        muted={true}
        disablePictureInPicture={true}
        disableRemotePlayback={true}
        controls={false}
      ></video>
      {streams?.map((str) => (
        <VideoBox connection={str} key={str.id} />
      ))}
    </div>
  );
}

function VideoBox({ connection }: { connection: MediaStream }) {
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = connection;
    }
  }, [connection]);

  return (
    <video
      playsInline
      autoPlay
      muted={true}
      disablePictureInPicture={true}
      disableRemotePlayback={true}
      controls={false}
      ref={videoRef}
    ></video>
  );
}
