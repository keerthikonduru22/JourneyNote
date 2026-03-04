import Layout from "./components/layout";
import { WeeksProvider } from "./components/weekscontext";

function App() {
  
  return (
    <div>
      
      
      <WeeksProvider>
        <Layout/>
      </WeeksProvider>
  </div>
  );
}

export default App;
