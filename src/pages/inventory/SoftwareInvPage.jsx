import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function SoftwareInvPage() {
  const { software } = useContext(DataContext);
  return (
    <>
      <h1>Sofware</h1>
      {software.map((el) => {
        return (
          <div key={el.id}>
            <div>Nombre: {el.name}</div>
            <div>Versión: {el.version}</div>
            <div>Categoría: {el.category}</div>
            <div>Descripción: {el.description}</div>
            <div>Estado: {el.status}</div>
            <div>Licencia: {el.licenseId}</div>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export default SoftwareInvPage
