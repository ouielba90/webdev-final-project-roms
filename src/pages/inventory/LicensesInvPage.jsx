import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import LicenseCard from "../../components/inventory/LicenseCard";

function LicensesInvPage() {
  const { licenses } = useContext(DataContext)
  return (
    <>
      <h1>Licences</h1>
      {licenses.map((el) => {
        return (
          <LicenseCard
            key={el.id}
            softwareIds={el.softwareIds}
            seats={el.seats}
            purchaseDate={el.purchaseDate}
            expiryDate={el.expiryDate}
            status={el.status}
            ownerId={el.ownerId}
          />
        )
      })}
    </>
  )
}

export default LicensesInvPage
