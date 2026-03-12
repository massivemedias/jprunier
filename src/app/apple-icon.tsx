import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: '#102136',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 36,
          fontWeight: 800,
          color: '#7456f1',
          letterSpacing: '-2px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        JP
      </div>
    ),
    { ...size }
  )
}
