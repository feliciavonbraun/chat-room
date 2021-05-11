import { CSSProperties } from "react";
import { useContext } from "react";
import { SocketContext } from "../contexts/socketProvider";

interface Props {
    room: {roomName: string, password?: string | null}
}

function Rooms(props: Props, index: number) {
    const { joinRoom } = useContext(SocketContext);
    return(
        <button
            key={index}
            style={{ ...roomButton, ...activeRoomButton }}
            onClick={() => joinRoom(props.room.roomName)}
        >
            {props.room.roomName}
        </button>
    );
}

const roomButton: CSSProperties = {
    width: '100%',
    maxWidth: '12rem',
    textAlign: 'center',
    padding: '.5rem 0',
    marginBottom: '.5rem',
    borderRadius: '.3rem',
    backgroundColor: 'white',
    boxShadow: '-.3rem 0 .3rem #00000020 inset',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
};

// Ska aktiveras på hover och click.
const activeRoomButton: CSSProperties = {
    backgroundColor: '#00ADEF',
};

export default Rooms;