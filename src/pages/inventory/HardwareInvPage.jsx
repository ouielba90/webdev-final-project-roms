import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import HardwareCard from "../../components/inventory/HardwareCard";

function HardwareInvPage() {
  const { hardware } = useContext(DataContext)
  return (
    <>
      <h1>Hardware</h1>
      {hardware.map((el) => {
        return (
          <HardwareCard
            key={el.id}
            type={el.type}
            model={el.model}
            location={el.location}
            status={el.status}
            purchaseDate={el.purchaseDate} />
        )
      })}
    </>
  )
}

export default HardwareInvPage
