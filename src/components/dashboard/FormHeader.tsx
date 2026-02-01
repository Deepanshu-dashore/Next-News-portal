
interface FormHeaderProps {
  title: string;
  description: string;
  colorScheme?: 'red' | 'green' | 'blue' | 'purple' | 'orange';
}

const colorClasses = {
  red: 'from-red-600 to-red-800 text-red-100',
  green: 'from-green-600 to-green-800 text-green-100',
  blue: 'from-blue-600 to-blue-800 text-blue-100',
  purple: 'from-purple-600 to-purple-800 text-purple-100',
  orange: 'from-orange-600 to-orange-800 text-orange-100',
};

export default function FormHeader({ 
  title, 
  description, 
  colorScheme = 'red' 
}: FormHeaderProps) {
  return (
    <div className={`bg-linear-to-r ${colorClasses[colorScheme].split(' ')[0]} ${colorClasses[colorScheme].split(' ')[1]} p-6`}>
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">
        {title}
      </h2>
      <p className={`${colorClasses[colorScheme].split(' ')[2]} text-sm mt-1`}>
        {description}
      </p>
    </div>
  );
}
