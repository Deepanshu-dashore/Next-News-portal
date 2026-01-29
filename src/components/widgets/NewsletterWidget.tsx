import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function NewsletterWidget() {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 md:p-6">
      <h3 className="text-base md:text-lg font-bold text-[#111827] mb-2">
        Subscribe to Newsletter
      </h3>
      <p className="text-sm text-[#6B7280] mb-4">
        Get the latest news delivered to your inbox
      </p>
      <form className="space-y-3">
        <Input 
          type="email" 
          placeholder="Your email address" 
          className="h-10"
        />
        <Button className="w-full" size="sm">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
