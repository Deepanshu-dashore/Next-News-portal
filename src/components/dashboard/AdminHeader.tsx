import { useRouter } from "next/navigation";
import { JSX } from "react"


interface AdminHeaderProps {
    title?:string,
    description?:string,
    add?:JSX.Element
    back?: string
    goBackTo?: string
}


export default function AdminHeader({ title, description, add, back, goBackTo }: AdminHeaderProps) {
  const router = useRouter();
  return (
    <div className="mb-8 pl-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                {title || 'Dashboard'}
              </h1>
              <p className="text-gray-600 text-sm mt-1.5">{description || 'Manage all your content'}</p>
            </div>
            <div className="flex items-center gap-3">
            {back && <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2 pl-4 border-2 text-sm border-gray-200 hover:border-gray-300/80 text-gray-600 font-semibold hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 12 24">
                <path fill="currentColor" fillRule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z" strokeWidth={0.5} stroke="currentColor"></path>
              </svg>
              {back? back : "Back"}
            </button>}
            {add && <div>{add}</div>}
            </div>
          </div>
        </div>
  )
}
