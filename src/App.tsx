import "./App.css";
import Column from "./components/Column/Column";
import { useStore } from "./store/store";

function App() {

  const isCopySelected = useStore((store) => store.isCopySelected);
  const setCopySelected = useStore((store) => store.setCopySelected);

  return (
    <div className="App">
      <div className="AppHeader">
        <div className="AppTitle">Kanban</div>
        <div className="AppOptions">
          <h2>Move</h2>
          <label className="switch">
            <input type="checkbox" onChange={ () => setCopySelected(!isCopySelected) } />
            <span className="slider round"></span>
          </label>
          <h2>Copy</h2>
        </div>
      </div>
      <div className="AppContent">
        <Column state="PLANNED" />
        <Column state="ONGOING" />
        <Column state="DONE" />
      </div>
    </div>
  );
}

export default App;
