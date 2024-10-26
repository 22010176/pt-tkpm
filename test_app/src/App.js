import { useRef } from 'react'


function Form({ test }) {

  return (
    <form>

    </form>
  )
}
function App() {
  const a = useRef();
  return (
    <div>
      <Form ref={a} />
    </div>
  );
}

export default App;
