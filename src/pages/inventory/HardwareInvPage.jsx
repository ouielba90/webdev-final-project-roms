import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function HardwareInvPage() {
  const { hardware } = useContext(DataContext)
  return (
    <>
      <h1>Hardware</h1>
      {hardware.map((el) => {
        return (
          <div key={el.id}>
            <div>Tipo: {el.type}</div>
            <div>Modelo: {el.model}</div>
            <div>Ubicación: {el.location}</div>
            <div>Estado: {el.status}</div>
            <div>Fecha de compra:: {el.purchaseDate}</div>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export default HardwareInvPage
