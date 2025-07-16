

import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import MdEditor from 'react-markdown-editor-lite';



// Markdown Editor with toolbar and live preview
export default function Editor({ value, onChange, placeholder }) {
    // react-markdown-editor-lite expects { text } in onChange
    return (
        <div className="w-full">
            <MdEditor
                value={value}
                style={{ height: 350, background: '#18181b', color: '#f4f4f5', borderRadius: 8 }}
                renderHTML={text => <ReactMarkdown rehypePlugins={[rehypeRaw]}>{text}</ReactMarkdown>}
                onChange={({ text }) => onChange && onChange({ target: { value: text } })}
                placeholder={placeholder || 'Write your blog content here using Markdown. To add images, use ![alt text](image-url)'}
                config={{ view: { menu: true, md: true, html: true }, canView: { menu: true, md: true, html: true, fullScreen: true, hideMenu: true } }}
                className="dark"
            />
            <div className="text-xs text-zinc-400 mt-2">
                <b>Tip:</b> To resize images, use HTML: {'<img src="url" width="300" />'}
            </div>
        </div>
    );
}
