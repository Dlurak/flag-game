import { Locale, langs } from "@/constants/countries"
import { useEffect, useState } from "react"

interface CodeObjProps {
	lang: Locale
}

export const useCodeObj = (props: CodeObjProps) => {
	const [obj, setObj] = useState(langs[props.lang])

	useEffect(() => {
		setObj(langs[props.lang])
	}, [props.lang])

	return obj
}
