import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

// Trick to embed videos as images in markdown
const Media = ({
    src,
    alt,
}: {
    src: string | undefined
    alt: string | undefined
}) => {
    if (src?.endsWith(".mp4")) {
        return (
            <video
                width="600"
                controls
                autoPlay
                muted
                playsInline
                onError={(e) => console.error("Video failed to load:", e)}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        )
    }
    return <img src={src} alt={alt} style={{ maxWidth: "100%" }} />
}

type Props = {
    content: string
}

const Markdown = ({ content }: Props) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                img: ({ src, alt }) => <Media src={src} alt={alt} />,
            }}
            className="prose prose-invert p-4 font-poppins overflow-y-auto custom-scrollbar"
        >
            {content}
        </ReactMarkdown>
    )
}

export default Markdown
