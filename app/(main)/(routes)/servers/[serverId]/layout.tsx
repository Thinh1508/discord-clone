import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { currentProfile } from "@/lib/current-profile"
import { ServerSidebar } from "@/components/server/server-sidebar"

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { serverId: string }
}) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (!server) {
    return redirect("/")
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-64 z-20 flex-col inset-y-0 fixed">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-64">{children}</main>
    </div>
  )
}

export default ServerIdLayout
