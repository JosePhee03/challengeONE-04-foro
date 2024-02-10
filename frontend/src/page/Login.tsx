import Header from "../components/Header";
import { Input } from "../components/Input";

export default function Login () {

    return (
        <>
            <Header variant="primary"/>
            <main className="main flex-center">
                <div className="flex-col justify-center">
                <h1 className="heading-text">Iniciar Sesión</h1>
                    <form className="flex-col">
                        
                        <div>
                            <Input/>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )

}