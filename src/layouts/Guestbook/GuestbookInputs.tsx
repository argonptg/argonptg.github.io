export default function GuestbookInputs({ onChange, onSubmit }: any) {
    return (
        <div className="input">
            <div className="fields">
                <div className="info" style={{
                    display: "flex",
                    gap: 8
                }}>
                    <input type="text" style={{
                        flexGrow: 1
                    }}
                    placeholder="Nome" onChange={(e) => onChange("username", e.target.value)} />
                    <input type="text" placeholder="Site (opcional)" onChange={(e) => onChange("website", e.target.value)} />
                </div>
                <textarea name="" id="" placeholder="Mensagem" onChange={(e) => onChange("message", e.target.value)}></textarea>
            </div>
            <button onClick={onSubmit}>Enviar</button>
        </div>
    )
}