"use client"

import react, {useEffect} from 'react';
import { Metadata } from 'next'
import Link from 'next/link';
 
export default function Page() {
  useEffect(() => {
    document.title = "Lisker";
  })

  return (
    <Link href='/auth/login'>Go to login</Link>
  )
}