import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useResponsive() {
  const [screenSize, setScreenSize] = React.useState({
    isMobile: undefined as boolean | undefined,
    isTablet: undefined as boolean | undefined,
    width: undefined as number | undefined
  })

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setScreenSize({
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        width
      })
    }

    // Set initial size
    handleResize()
    
    // Add event listener
    window.addEventListener("resize", handleResize)
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return screenSize
}

// Keep backward compatibility
export function useIsMobile() {
  const { isMobile } = useResponsive()
  return !!isMobile
}
