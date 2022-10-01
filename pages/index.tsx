import type { NextPage } from "next";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [email,setEmail] = useState('');
  const [password,setPassord] = useState('');

  const { signIn, isAuthenticated } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
      password,
    }

    await signIn(data)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className={styles.input} type="password" value={password} onChange={e => setPassord(e.target.value)}/>
      <button className={styles.button} type="submit">
        Entrar
      </button>
    </form>
  );
};

export default Home;
