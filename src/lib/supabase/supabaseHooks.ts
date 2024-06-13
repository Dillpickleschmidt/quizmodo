import { supabase } from "./supabase"

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getDeck(deckName: string, userId: string) {
  const { data, error } = await supabase
    .from("decks")
    .select()
    .eq("deck_name", deckName)
    .eq("user_id", userId)
    .single()
  if (error) throw new Error(error.message)
  return data
}

type CreateDeckProps = {
  deckName: string
  userId: string
}
export async function createDeck({ deckName, userId }: CreateDeckProps) {
  const { data, error } = await supabase
    .from("decks")
    .insert({ deck_name: deckName, user_id: userId })
    .select()
  if (error) throw new Error(error.message)
  return data
  // wait 1 second then resolve true
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(true)
  //   }, 1000)
  // })
}

// Get all decks matching the user id
export async function getDecks(userId: string) {
  const { data, error } = await supabase.from("decks").select().eq("user_id", userId)
  if (error) throw new Error(error.message)
  return data
}
