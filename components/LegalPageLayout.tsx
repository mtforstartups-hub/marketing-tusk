import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LegalPageLayoutProps {
  filename: string;
}

export default function LegalPageLayout({ filename }: LegalPageLayoutProps) {
  const filePath = path.join(process.cwd(), "content", "legal", filename);
  let fileContent = "";
  try {
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error("Error reading file", filePath, e);
    fileContent = "Content not found.";
  }

  return (
    <main className="container mx-auto px-4 py-12 md:py-15 max-w-full mt-4">
      <div className="container mx-auto px-4">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-primary-blue-dark dark:prose-headings:text-primary-blue prose-a:text-primary-blue hover:prose-a:text-primary-blue-dark">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-8">
                  <table
                    className="w-full max-w-fit text-left border-collapse"
                    {...props}
                  />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th
                  className="border-b-2 border-gray-300 dark:border-gray-700 p-3 xs:min-w-[180px] sm:min-w-[300px] md:min-w-[350px] lg:min-w-[300px] font-semibold"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className="border-b border-gray-200 dark:border-gray-800 p-3 xs:min-w-[180px] sm:min-w-[300px] md:min-w-[350px] lg:min-w-[300px]"
                  {...props}
                />
              ),
            }}
          >
            {fileContent}
          </ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
