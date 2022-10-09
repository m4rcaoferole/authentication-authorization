import { useContext, useEffect } from "react"
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user, signOut, broadcastAuth } = useContext(AuthContext)

  function handleSignOut() {
    broadcastAuth.current.postMessage('signOut');
    signOut();
  }
  
  useEffect(() => {
    api.get('/me')
    .then(response => console.log(response))
  }, [])

  return (
    <>
      <h1>Dashboard: {user?.email ?? ""}</h1>

      <button onClick={handleSignOut}>Sign Out</button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}

// eslint-disable-next-line @next/next/no-typos
export const getServerSidePros = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})