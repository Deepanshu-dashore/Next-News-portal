import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function NewsletterWidget() {
  return (
    <div className="bg-black px-6 text-white p-8 text-center border border-gray-200 rounded-3xl shadow-sm">
      <div className="w-12 h-12 bg-(--accent-primary) text-white rounded-xl flex items-center justify-center mx-auto mb-5 shadow-md">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      
      <h3 className="text-xl text-white font-black uppercase tracking-tight mb-2">
        Daily Briefing
      </h3>
      
      <p className="text-gray-300 text-xs font-medium leading-relaxed mb-6">
        Get the most important news stories delivered to your inbox every morning.
      </p>
      
      <form className="space-y-3">
        <Input 
          type="email" 
          placeholder="Email address" 
          className="h-11 bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-300 focus:bg-white focus:border-(--accent-primary) focus:ring-2 focus:ring-(--accent-primary)/20 text-sm"
        />
        <Button className="w-full bg-(--accent-primary) text-white hover:bg-(--accent-primary)/90 font-black uppercase tracking-widest text-[10px] shadow-sm" size="sm">
          Subscribe Free
        </Button>
      </form>
      
      <p className="text-[10px] text-gray-300 mt-4">
        By subscribing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
