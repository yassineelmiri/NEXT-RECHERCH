import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Layout(props) {
    return(
        <div >
            {props.children}
        </div>
    )
}