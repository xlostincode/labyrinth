import * as React from "react"
import {
    PATH_FINDING_ALGORITHM_MAP,
    PathFindingAlgorithmId,
} from "~/algorithms/const"

const useLearnAlgorithmContent = (algorithmId: PathFindingAlgorithmId) => {
    const [content, setContent] = React.useState<string | null>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const [isError, setIsError] = React.useState(false)

    React.useEffect(() => {
        const fetchContent = async () => {
            setContent(null)
            setIsLoading(true)
            setIsError(false)

            try {
                const response = await fetch(
                    PATH_FINDING_ALGORITHM_MAP[algorithmId].learnContentUrl
                )
                const responseText = await response.text()

                setContent(responseText)
            } catch (error) {
                console.error(error)
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchContent()
    }, [algorithmId])

    return {
        isLoading,
        isError,
        content,
    }
}

export default useLearnAlgorithmContent
