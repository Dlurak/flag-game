import englishCountries from "@/constants/english"

export const langs = {
	en: englishCountries
} as const

export type Locale = keyof typeof langs

export type CountryName = keyof typeof langs[Locale]
