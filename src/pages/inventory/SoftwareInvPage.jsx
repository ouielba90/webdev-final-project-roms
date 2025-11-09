import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import SoftwareCard from "../../components/inventory/SoftwareCard";

function SoftwareInvPage() {
  const { software } = useContext(DataContext);
  return (
    <>
      <h1>Sofware</h1>
      {software.map((el) => {
        return (
          <SoftwareCard
            key={el.id}
            name={el.name}
            version={el.version}
            category={el.category}
            description={el.description}
            status={el.status}
            licenseId={el.licenseId} />
        )
      })}
    </>
  )
}

export default SoftwareInvPage
