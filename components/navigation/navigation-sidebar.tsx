import { redirect } from "next/navigation"
import { UserButton } from "@clerk/nextjs"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

import NavigationAction from "@/components/navigation/navigation-action"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NavigationItem } from "@/components/navigation/navigation-item"
import { ModeToggle } from "@/components/mode-toggle"

export const NavigationSidebar = async () => {
  const profile = await currentProfile()

  if (!profile) {
    return redirect("/")
  }

  const servers = await db.server.findMany({
    where: {
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return (
    <div className="bg-[#E3E5E8] space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1f22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[42px] w-[42px]",
              userButtonPopoverFooter: "hidden",
              userButtonPopoverCard: "l-0",
            },
          }}
        />
      </div>
    </div>
  )
}
