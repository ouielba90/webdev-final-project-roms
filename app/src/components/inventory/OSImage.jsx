function OSImage({ osName }) {
  let icon;

  const name = osName?.toLowerCase() || "";

  if (name.includes("windows")) {
    icon = "windows";
  } else if (name.includes("mac") || name.includes("osx") || name.includes("macos")) {
    icon = "mac";
  } else {
    icon = "linux";
  }

  return (
    <>
      <img src={`/public/icons/${icon}.png`} alt={`${icon}`} className="header-os-img" />
    </>
  )
}

export default OSImage