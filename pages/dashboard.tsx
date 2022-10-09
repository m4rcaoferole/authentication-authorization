import { destroyCookie } from "nookies";
import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
    .then(response => console.log(response))
  }, [])

  return (
    <h1>Dashboard: {user?.email}</h1>
  )
}

// eslint-disable-next-line @next/next/no-typos
export const getServerSidePros = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  try {
    const response = await apiClient.get('/me')
  } catch (err) {
    destroyCookie(ctx, 'appbasic.token')
    destroyCookie(ctx, 'appbasic.refreshToken')

    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
})