'use client'

import React from 'react'

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg width="160" height="32" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
        {/* M in yellow */}
        <text x="0" y="34" fontFamily="'Impact', 'Arial Black', sans-serif" fontSize="40" fontWeight="900" fill="#F5C518" letterSpacing="-1">M</text>
        {/* ASSIVE in pink */}
        <text x="30" y="34" fontFamily="'Impact', 'Arial Black', sans-serif" fontSize="40" fontWeight="900" fill="#FF69B4" letterSpacing="-1">ASSIVE</text>
      </svg>
      <span style={{
        fontSize: '14px',
        fontWeight: 600,
        color: '#888',
        letterSpacing: '2px',
        textTransform: 'uppercase' as const,
      }}>
        CMS
      </span>
    </div>
  )
}
