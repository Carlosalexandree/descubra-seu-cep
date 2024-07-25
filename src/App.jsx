import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [address, setAdress] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ estado, cidade, rua });

    try {
      const result = await axios.get(
        `https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`
      );
      console.log(result.data);
      setAdress(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(address);
  }, [address]);

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card p-4 w-50 shadow-lg">
          <h1 className="text-primary">Descubra o seu CEP</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="estado">
                Estado
              </label>
              <input
                className="form-control"
                type="text"
                id="estado"
                placeholder="Ex: RJ"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cidade">
                Cidade
              </label>
              <input
                className="form-control"
                type="text"
                id="cidade"
                placeholder="Digite sua Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="rua">
                Rua
              </label>
              <input
                className="form-control"
                type="text"
                id="rua"
                placeholder="Digite sua Rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Enviar
            </button>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <div className="w-50">
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Cep</th>
                <th scope="col">Rua</th>
                <th scope="col">Numero da Casa</th>
                <th scope="col">Bairro</th>
              </tr>
            </thead>
            <tbody>
              {address?.map((addr, index) => (
                <tr key={index}>
                  <th scope="row">{addr.cep}</th>
                  <td>{addr.logradouro}</td>
                  <td>{addr.complemento}</td>
                  <td>{addr.bairro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
