import { CSSProperties, useState } from "react";


function Sidebar() {
    const [ room ] = useState('Living room');
    return (
        <aside style={rootStyle}>
            <h2>ChatALot</h2>
            <h3>Welcome ....</h3>
            <button>New Chat</button>
            <h3>ChatRooms</h3> 
                <button>{room}</button>
        </aside>
    );
}

const rootStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
    boxShadow: '-.3rem 0 .5rem #00000020 inset',
}

export default Sidebar;
