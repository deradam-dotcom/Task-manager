import Dashboard from './components/Dashboard'
import { useTaskManager } from './context/TaskManagerContext';
import './index.css'

export const App = () => {
  const {  dashboards } = useTaskManager(); // Access context to create dashboards
 

  return (
    <>
      <div>
<Dashboard/>
      </div>
  
    </>
  )
}

export default App
