import { redirect } from "next/navigation"

import { initialProfile } from "@/lib/initial-profile"
import { db } from "@/lib/db"
import { InitialModal } from "@/components/modals/initial-modal"

const SetupPage = async () => {
  const profile = await initialProfile()
  const server = await db.server.findFirst({
    where: {
      member: {
        some: {
          profileId: profile.is,
        },
      },
    },
  })

  if (server) {
    return redirect(`servers/${server.id}`)
  }

  return <InitialModal />
}

export default SetupPage
