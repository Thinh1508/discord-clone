import { redirect } from "next/navigation"

import { initialProfile } from "@/lib/initial-profile"
import { db } from "@/lib/db"

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
    return redirect(`server/${server.id}`)
  }

  return <div>Create a Server</div>
}

export default SetupPage
