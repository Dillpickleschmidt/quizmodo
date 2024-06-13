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

// Get all decks matching the user id
export async function getDecks(userId: string) {
  const { data, error } = await supabase.from("decks").select().eq("user_id", userId)
  if (error) throw new Error(error.message)
  return data
}

// Create a new deck
type CreateDeckProps = Database["public"]["Tables"]["decks"]["Insert"]
export async function createDeck({ deck_name, user_id }: CreateDeckProps) {
  const { data, error } = await supabase
    .from("decks")
    .insert({ deck_name: deck_name, user_id: user_id })
    .select()
  if (error) throw new Error(error.message)
  return data
}

// Get all entries matching the deck id
export async function getEntries(deckId: string) {
  const { data, error } = await supabase.from("entries").select().eq("deck_id", deckId)
  if (error) throw new Error(error.message)
  return data
}

// Create a new entry
type CreateEntryProps = Database["public"]["Tables"]["entries"]["Insert"]
export async function createEntries(entries: CreateEntryProps[]) {
  const { data, error } = await supabase
    .from("entries")
    .upsert([...entries])
    .select()
  if (error) throw new Error(error.message)
  return data
}
