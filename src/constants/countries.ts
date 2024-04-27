import englishCountries from "@/constants/english"
import germanCountry from "@/constants/german"

export const langs = {
	en: englishCountries,
	de: germanCountry
} as const

export type Locale = keyof typeof langs

export type CountryName = keyof typeof langs[Locale]
