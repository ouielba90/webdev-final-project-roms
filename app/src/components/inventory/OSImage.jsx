function OSImage({ osName }) {
  const osIcons = [
    "centos",
    "ubuntu",
    "kali",
    "debian",
    "macos",
    "rocky",
    "windows10",
    "windows11"
  ];
  const iconToUse = osIcons.find(icon => osName.replace(/\s+/g, '').toLowerCase().includes(icon))

  console.log("icon", iconToUse)
  return (
    <>
      <img src={`/public/icons/${iconToUse}.png`} alt={`${iconToUse}`} className="header-os-img" />
    </>
  )
}

export default OSImage
