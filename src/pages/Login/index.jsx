import { useHistory } from 'react-router-dom';

export function Login() {
    const history = useHistory()
    return (
        <>
            <section className="login">
                <div className="login__container">
                    <div className="login__content">
                        <div className="login__header">
                            <h1 className="login__header-title">
                                Petch
                            </h1>
                        </div>
                        <form className="login__forms">
                            <label htmlFor="user">
                                <input type="text" name="input" placeholder="Usuário" className="login__forms-input" />
                            </label>

                            <label htmlFor="password">
                                <input type="password" name="input" placeholder="Senha" className="login__forms-input" />
                            </label>

                            <a href="#" className="login__forms-link">Esqueceu seu acesso?</a>

                            <button type="button" className="login__forms-btn" onClick={() => history.push("/dashboard")}>Entrar</button>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}