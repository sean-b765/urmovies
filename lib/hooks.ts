import { DependencyList, useEffect, useState } from 'react'

/**
 * Minimize the rerenders that a useEffect causes by isolating the state in a custom hook
 */
export function usePromiseEffect<T>(
	effect: () => Promise<T>,
	deps: DependencyList
) {
	const [state, setState] = useState<T>({} as T)

	useEffect(() => {
		effect()
			.then((value) => setState(value))
			.catch((value) => setState(value))
	}, [])

	return state
}
