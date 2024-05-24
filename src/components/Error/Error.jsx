import logo from "../../assets/error/error.jpg";

export const Error = () => {
    return (
        <div className={"overflow-x-hidden text-center"}>
            <img style={{height: 'calc(100vh - 85px)', width: '100vw'}} src={logo} alt={logo}/>
            <div style={{ position: "absolute", top: "75%", left: "50%", transform: "translate(-50%, -50%)", color: '#000' }}>
                <p className={"fs-1 fw-bold"}>Error 404</p>
                <p className={"fs-1 fw-bold"}>No encontramos la página solicitada</p>
            </div>
        </div>
    );
}
