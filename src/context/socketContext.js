import { useEffect, createContext, useRef } from "react";
//CONFIG
import config from "../utils/constants";
//LIBS
import socketIOClient from "socket.io-client";

const ENDPOINT = config.serverUrl;
const SocketContext = createContext();

const SocketProvider = (props) => {
    const IO = useRef(null);

    useEffect(() => {
        //get user location

        if (!isConnect()) {

            connect();
            // IO.current = socketIOClient(ENDPOINT);

            // IO.current.on('connect', () => {
            //     const engine = IO.current.io.engine;
            //     console.log(engine.transport.name);

            //     engine.once("upgrade", () => {
            //         // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
            //         console.log("upgrade", engine.transport.name); // in most cases, prints "websocket"
            //     });
            // });

            // IO.current.on('disconnect', (reason) => {
            //     console.log(reason);
            // });
        }

        return () => IO.current.disconnect();
    }, []);

    function send(key, data) {
        if (!isConnect()) connect();
        IO.current.send(key, data);
    }

    function on(key, cb) {
        if (!isConnect()) connect();
        // console.log(key, IO.current);

        IO.current.on(key, (data, msg) => {
            return cb(data, msg, IO.current);
        });
    }

    function off(key) {
        IO.current.off(key);
    }

    function isConnect() {
        return IO.current !== null ? true : false;
    }

    function connect() {
        IO.current = socketIOClient(ENDPOINT, { transports: ["polling", "websocket"] });
    }

    function disconnect() {
        IO.current.disconnect();
    }

    function get() {
        return IO.current;
    }

    const methods = { send, on, off, isConnect, connect, disconnect, get };

    return <SocketContext.Provider value={methods}>{props.children}</SocketContext.Provider>;
};
export { SocketContext, SocketProvider };
