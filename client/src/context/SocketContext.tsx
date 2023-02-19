import { createContext, useState, useEffect, useRef, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "simple-peer";

type SocketProviderProps = {
  children: ReactNode;
};

type callType = {
  isReceivedCall: boolean;
  from: any;
  name: any;
  signal: any;
};

const SocketContext = createContext({});

const socket = io("https://localhost:8080");

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [stream, setStream] = useState<any>(null);
  const [currentUserID, setCurrentUserID] = useState("");
  const [name, setName] = useState("");
  const [call, setCall] = useState({} as callType);

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myVidoe = useRef<any>();
  const userVidoe = useRef<any>();
  const connection = useRef<any>();

  const Location = useLocation();

  useEffect(() => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((currentStream) => {
    //     setStream(currentStream);

    //     myVidoe.current.srcObject = currentStream;
    //   });

    socket.on("me", (id) => {
      setCurrentUserID(id);
    });

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({
        isReceivedCall: true,
        from: from,
        name: callerName,
        signal: signal,
      });
    });
  }, []);

  function answerCall() {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVidoe.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connection.current = peer;
  }

  function callUser(id: number) {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    console.log(id);

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: currentUserID,
        name: name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVidoe.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });
    connection.current = peer;
  }

  function leaveCall() {
    setCallEnded(true);

    connection.current.destroy();

    window.location.reload();
  }
  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVidoe,
        userVidoe,
        name,
        setName,
        stream,
        callEnded,
        currentUserID,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
