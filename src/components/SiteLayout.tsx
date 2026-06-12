import type { ReactNode } from 'react'
import { PageShell } from './PageShell'
import { AnnouncementBar } from './AnnouncementBar'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

type SiteLayoutProps = {
  children: ReactNode
  showAnnouncement?: boolean
}

export function SiteLayout({ children, showAnnouncement = false }: SiteLayoutProps) {
  return (
    <PageShell>
      {showAnnouncement && <AnnouncementBar />}
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </PageShell>
  )
}
