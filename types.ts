import { Member, Profile, Server } from "@prisma/client"

export type ServerWithMembersWithProfiles = Server & {
  member: (Member & { profile: Profile })[]
}
