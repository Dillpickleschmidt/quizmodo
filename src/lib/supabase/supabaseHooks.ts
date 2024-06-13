import { supabase } from "./supabase"
// Fetch user
export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

// Fetch deck by name and user ID
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

// Fetch all decks for a user
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

// Fetch all entries for a deck with associated answer categories
export async function getEntriesWithCategories(deckId: number) {
  const { data, error } = await supabase
    .from("entries")
    .select(
      `
      entry_id,
      key,
      mnemonic,
      order,
      answer_categories (
        category,
        answers
      )
    `,
    )
    .eq("deck_id", deckId)
    .order("order", { ascending: true })
  if (error) throw new Error(error.message)
  return data
}

// Create new entries
type CreateEntryProps = Database["public"]["Tables"]["entries"]["Insert"]
export async function createEntries(entries: CreateEntryProps[]) {
  const { data, error } = await supabase
    .from("entries")
    .upsert([...entries])
    .select()
  if (error) throw new Error(error.message)
  return data
}

// Insert answer categories for entries
type CreateCategoryProps = Database["public"]["Tables"]["answer_categories"]["Insert"]
export async function createCategories(categories: CreateCategoryProps[]) {
  const { data, error } = await supabase.from("answer_categories").insert(categories)
  if (error) throw new Error(error.message)
  return data
}

// Fetch all entries and answer categories for a deck
export async function fetchDeckEntriesWithCategories(deckName: string, userId: string) {
  try {
    console.log("Fetching deck entries and answer categories", deckName, userId)
    // Step 1: Get the deck using the existing helper function
    const deckData = await getDeck(deckName, userId)
    const { deck_id, deck_name } = deckData

    // Step 2: Get entries with associated answer categories for the deck
    const entriesData = await getEntriesWithCategories(deck_id)

    // Step 3: Transform the results to the desired structure
    const transformedEntries = entriesData.map((entry) => ({
      key: entry.key,
      mnemonic: entry.mnemonic,
      order: entry.order,
      answerCategories: entry.answer_categories.map((ac) => ({
        category: ac.category,
        answers: ac.answers,
      })),
    }))

    const result = {
      deck_id: deck_id.toString(), // Convert to string if needed
      deck_name: deck_name,
      entries: transformedEntries,
    }

    // Output the final result
    console.log("Deck with entries and answer categories:", result)
    return result
  } catch (error) {
    console.error("Error fetching deck entries and categories:", error)
    throw error // Throw the error to be handled by the caller
  }
}
