import Layout from "./layout";
import SocketProvider from "../contexts/socketProvider";

function App() {
  return (
    <SocketProvider>
      <Layout />
    </SocketProvider>
  );
};
export default App;